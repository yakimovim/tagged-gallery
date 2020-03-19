import { MongoClient } from "mongodb";
import _ from "lodash";

import config from "../config/configuration";

export default class MongoDbApi {
  _getMongoClient() {
    return MongoClient.connect(config.mongoDbUrl, {
      useNewUrlParser: true
    });
  }

  getTagsOfFiles(fileNamesArray) {
    return this._getMongoClient().then(function(client) {
      return new Promise(function(resolve, reject) {
        const db = client.db();

        const imageTags = db.collection(config.mongoDbCollection);

        imageTags
          .find({ name: { $in: fileNamesArray } })
          .toArray(function(err, data) {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }

            client.close();
          });
      });
    });
  }

  getFilesWithTags(tagsArray, limit, offset, sortBy = "name") {
    return this._getMongoClient().then(function(client) {
      return new Promise(function(resolve, reject) {
        const db = client.db();

        const imageTags = db.collection(config.mongoDbCollection);

        const tagsRegexes = _(tagsArray)
          .map(t => new RegExp("^" + t, "i"))
          .value();

        const sortByName = sortBy !== "name" ? -1 : 1;

        imageTags
          .find({ tags: { $all: tagsRegexes } })
          .sort({ name: sortByName })
          .skip(offset)
          .limit(limit)
          .toArray(function(err, data) {
            if (err) {
              reject(err);
            } else {
              imageTags
                .countDocuments({ tags: { $all: tagsRegexes } })
                .then(function(total) {
                  resolve({
                    items: data,
                    limit: limit,
                    offset: offset,
                    total: total
                  });
                })
                .catch(function(err) {
                  reject(err);
                });
            }

            client.close();
          });
      });
    });
  }

  getRandomFiles(tagsArray, limit) {
    return this._getMongoClient().then(function(client) {
      return new Promise(function(resolve, reject) {
        const db = client.db();

        const imageTags = db.collection(config.mongoDbCollection);

        const pipelineSteps = [];

        if (!!tagsArray && tagsArray.length > 0) {
          const tagsRegexes = _(tagsArray)
            .map(t => new RegExp("^" + t, "i"))
            .value();
          pipelineSteps.push({ $match: { tags: { $all: tagsRegexes } } });
        }

        pipelineSteps.push({ $sample: { size: limit } });

        imageTags.aggregate(pipelineSteps).toArray(function(err, data) {
          if (err) {
            reject(err);
          } else {
            resolve({
              items: data,
              limit: limit,
              offset: 0,
              total: limit
            });
          }

          client.close();
        });
      });
    });
  }

  saveTags(name, tags) {
    return this._getMongoClient().then(function(client) {
      const db = client.db();

      const imageTags = db.collection(config.mongoDbCollection);

      return imageTags
        .update(
          { name: name },
          {
            name: name,
            tags: tags
          },
          { upsert: true }
        )
        .then(() => {
          client.close();
        });
    });
  }
}
