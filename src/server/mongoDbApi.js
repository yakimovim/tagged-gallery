import { MongoClient } from 'mongodb';

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

    getFilesWithTags(tagsArray, limit, offset) {
        return this._connect()
            .then(function (db) {
                return new Promise(function (resolve, reject) {
                    const imageTags = db.collection(config.mongoDbCollection);

                    imageTags.find({ "tags": { "$all": tagsArray } }).skip(offset).limit(limit).toArray(function (err, data) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            imageTags.count({ "tags": { "$all": tagsArray } })
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