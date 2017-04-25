import YandexDiskApi from './yandexDiskApi';
import MongoDbApi from './mongoDbApi';
import _ from 'lodash';

import config from '../config/configuration';

export default class TaggedGalleryApi {
    constructor(oAuthToken) {
        if (!oAuthToken) {
            throw new Error('There is no OAuth token for Yandex');
        }
        this._oAuthToken = oAuthToken;
        this._mongoApi = new MongoDbApi();
    }

    getImagePreviews(search = '', limit = 10, offset = 0) {
        if (!!search) {
            const tagsArray = _((search || '').split(',')).map(t => t.trim()).filter(t => !!t).value();
            if (tagsArray.length === 0) {
                return this.getImagePreviewsWithAnyTags(limit, offset)
            } else {
                return this.getImagePreviewsWithGivenTags(tagsArray, limit, offset)
            }
        } else {
            return this.getImagePreviewsWithAnyTags(limit, offset)
        }
    }

    async getImagePreviewsWithImageWithNoTags(limit = 10, offset = 0) {
        limit = _.toInteger(limit);
        offset = _.toInteger(offset);

        const imagesWithTags = await this.getImagePreviewsWithAnyTags(limit, offset);

        if (_.some(imagesWithTags.items, i => i.tags.length === 0)) {
            return imagesWithTags;
        } else {
            return {
                "readNext": true
            };
        }
    }

    async getImagePreviewsWithAnyTags(limit = 10, offset = 0) {
        const api = new YandexDiskApi(this._oAuthToken);

        const imageData = await api.getImagePreviews(limit, offset);

        const fileNames = _.map(imageData.items, i => i.name);

        const tags = await this._mongoApi.getTagsOfFiles(fileNames);

        _.forEach(imageData.items, i => {
            const tagsItem = _.find(tags, t => t.name === i.name);
            if (tagsItem) {
                i.tags = tagsItem.tags;
            } else {
                i.tags = '';
            }
        });

        return imageData;
    }

    async getImagePreviewsWithGivenTags(tagsArray, limit = 10, offset = 0) {
        const tagsData = await this._mongoApi.getFilesWithTags(tagsArray, _.toNumber(limit), _.toNumber(offset));

        const api = new YandexDiskApi(this._oAuthToken);
        const imageData = await Promise.all(_(tagsData.items).map(i => api.getImagePreview(i.name)).value());

        tagsData.items = _(tagsData.items).map(mi => {
            const preview = _.find(imageData, p => p.name === mi.name);
            preview.tags = mi.tags;
            return preview;
        })
            .filter(i => !!i)
            .value();
        return tagsData;
    }

    async saveTags(name, tags) {
        if (!!name) {
            const tagsArray = _((tags || '').split(',')).map(t => t.trim()).filter(t => !!t).value();
            await this._mongoApi.saveTags(name, tagsArray);
        }
    }
}