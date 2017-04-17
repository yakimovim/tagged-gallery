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

    getImagePreviews(limit = 10, offset = 0) {
        return this._get(`${config.yandexDiskApiUrl}?path=${encodeURI(config.yandexDiskFolder)}&limit=${limit}&offset=${offset}`)
            .then(function (data) {
                return data.json();
            })
            .then(function (data) {
                var embedded = data._embedded;
                return {
                    "items": _(embedded.items || []).filter(i => i.type === 'file').value(),
                    "limit": embedded.limit,
                    "offset": embedded.offset,
                    "total": embedded.total
                };
            })
            .catch(function (error) {
                console.error("Can't get preview data");
            });
    }

    getImagePreview(fileName) {
        return this._get(`${config.yandexDiskApiUrl}?path=${encodeURI(config.yandexDiskFolder + fileName)}`)
            .then(function (data) {
                return data.json();
            })
            .catch(function (error) {
                console.error("Can't get preview data");
            });
    }

    getFullImage(name) {
        return this._get(`${config.yandexDiskApiUrl}/download?path=${encodeURI(config.yandexDiskFolder + name)}`)
            .then(function (data) {
                return data.json();
            })
            .then(function (data) {
                return {
                    "href": data.href
                };
            })
            .catch(function (error) {
                console.error("Can't get image data");
            });

    }
}

