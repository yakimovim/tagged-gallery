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

    getImagePreviewsWithImageWithNoTags(limit = 10, offset = 0) {
        limit = _.toInteger(limit);
        offset = _.toInteger(offset);
        const that = this;
        return this.getImagePreviewsWithAnyTags(limit, offset)
            .then(function(data) {
                if(_.some(data.items, i => i.tags.length === 0)) {
                    return data;
                } else {
                    if(offset + limit >= data.total) {
                        return data;
                    } else {
                        return that.getImagePreviewsWithImageWithNoTags(limit, offset + limit);
                    }
                }
            });
    }

    getImagePreviewsWithAnyTags(limit = 10, offset = 0) {
        const that = this;
        const api = new YandexDiskApi(that._oAuthToken);
        return api.getImagePreviews(limit, offset)
            .then(function (data) {
                const fileNames = _.map(data.items, i => i.name);
                return that._mongoApi.getTagsOfFiles(fileNames)
                    .then(function (tags) {
                        _.forEach(data.items, i => {
                            const tagsItem = _.find(tags, t => t.name === i.name);
                            if (tagsItem) {
                                i.tags = tagsItem.tags;
                            } else {
                                i.tags = '';
                            }
                        });
                        return data;
                    })
            });
    }

    getImagePreviewsWithGivenTags(tagsArray, limit = 10, offset = 0) {
        const that = this;
        return this._mongoApi.getFilesWithTags(tagsArray, _.toNumber(limit), _.toNumber(offset))
            .then(function (data) {
                const api = new YandexDiskApi(that._oAuthToken);
                return Promise.all(_(data.items).map(i => api.getImagePreview(i.name)).value())
                    .then(function (previews) {
                        data.items = _(data.items).map(mi => {
                            const preview = _.find(previews, p => p.name === mi.name);
                            preview.tags = mi.tags;
                            return preview;
                        })
                            .filter(i => !!i)
                            .value();
                        return data;
                    });
            });
    }

    saveTags(name, tags) {
        const that = this;
        return new Promise(function (resolve, reject) {
            if (!!name) {
                const tagsArray = _((tags || '').split(',')).map(t => t.trim()).filter(t => !!t).value();
                that._mongoApi.saveTags(name, tagsArray)
                    .then(function () {
                        resolve();
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            } else {
                resolve();
            }
        });
    }
}