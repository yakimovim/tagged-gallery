import { MongoClient } from 'mongodb';
import _ from 'lodash';

import config from '../config/configuration';

export default class MongoDbApi {

    _connect() {
        return new Promise(function (resolve, reject) {
            MongoClient.connect(config.mongoDbUrl, function (err, db) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(db);
                }
            });
        });
    }

    getTagsOfFiles(fileNamesArray) {
        return this._connect()
            .then(function (db) {
                return new Promise(function (resolve, reject) {
                    const imageTags = db.collection(config.mongoDbCollection);

                    imageTags.find({ "name": { "$in": fileNamesArray } }).toArray(function (err, data) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(data);
                        }

                        db.close();
                    });
                });
            });
    }

    getFilesWithTags(tagsArray, limit, offset, sortBy = 'name') {
        return this._connect()
            .then(function (db) {
                return new Promise(function (resolve, reject) {
                    const imageTags = db.collection(config.mongoDbCollection);

                    const tagsRegexes = _(tagsArray).map(t => new RegExp('^' + t, 'i')).value();

                    const sortByName = sortBy !== "name" ? -1 : 1;

                    imageTags.find({ "tags": { "$all": tagsRegexes } }).sort({ "name": sortByName }).skip(offset).limit(limit).toArray(function (err, data) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            imageTags.count({ "tags": { "$all": tagsRegexes } })
                                .then(function (total) {
                                    resolve({
                                        "items": data,
                                        "limit": limit,
                                        "offset": offset,
                                        "total": total
                                    });
                                })
                                .catch(function (err) {
                                    reject(err);
                                });
                        }
                    });
                });
            });
    }

    getRandomFiles(tagsArray, limit) {
        return this._connect()
            .then(function (db) {
                return new Promise(function (resolve, reject) {
                    const imageTags = db.collection(config.mongoDbCollection);

                    const pipelineSteps = [];

                    if (!!tagsArray && tagsArray.length > 0) {
                        const tagsRegexes = _(tagsArray).map(t => new RegExp('^' + t, 'i')).value();
                        pipelineSteps.push({ "$match": { "tags": { "$all": tagsRegexes } } });
                    }

                    pipelineSteps.push({ "$sample": { "size": limit } });

                    imageTags.aggregate(pipelineSteps).toArray(function (err, data) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve({
                                "items": data,
                                "limit": limit,
                                "offset": 0,
                                "total": limit
                            });
                        }
                    });
                });
            });
    }

    saveTags(name, tags) {
        return this._connect()
            .then(function (db) {
                const imageTags = db.collection(config.mongoDbCollection);

                return imageTags.update(
                    { "name": name },
                    {
                        "name": name,
                        "tags": tags
                    },
                    { upsert: true }
                );
            });
    }
}