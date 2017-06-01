import fetch from 'node-fetch';
import _ from 'lodash'; 

import config from '../config/configuration';

export default class YandexDiskApi {
    constructor(oAuthToken) {
        if (!oAuthToken) {
            throw new Error('There is no OAuth token for Yandex');
        }
        this._oAuthToken = oAuthToken;
        this._getHeaders = () => {
            return {
                "Authorization": `OAuth ${this._oAuthToken}`
            }
        };
        this._get = (url) => {
            return fetch(url, {
                "headers": this._getHeaders()
            })
        }
    }

    async getImagePreviews(limit = 12, offset = 0, sortBy = 'name') {
        try {
            const data = await this._get(`${config.yandexDiskApiUrl}?path=${encodeURI(config.yandexDiskFolder)}&sort=${sortBy}&limit=${limit}&offset=${offset}&preview_size=x190`);

            const jsonData = await data.json();

            const embedded = jsonData._embedded;

            return {
                "items": _(embedded.items || []).filter(i => i.type === 'file').value(),
                "limit": embedded.limit,
                "offset": embedded.offset,
                "total": embedded.total
            };
        } catch(err) {
            console.log("Can't get preview data: " + err);
        }
    }

    async getImagePreview(fileName) {
        try {
            const data = await this._get(`${config.yandexDiskApiUrl}?path=${encodeURI(config.yandexDiskFolder + fileName)}&preview_size=x190`);

            return await data.json();
        } catch (err) {
            console.error("Can't get preview data: " + err);
        }
    }

    async getFullImage(name) {
        try {
            const data = await this._get(`${config.yandexDiskApiUrl}/download?path=${encodeURI(config.yandexDiskFolder + name)}`);

            const jsonData = await data.json();

            return {
                    "href": jsonData.href
                };
        } catch (err) {
            console.error("Can't get image data: " + err);
        }
    }
}

