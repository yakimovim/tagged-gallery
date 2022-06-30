import { MongoClient } from "mongodb";
import _, { find } from "lodash";

import config from "../config/configuration";

export default class MongoDbApi {
  _getMongoClient() {
    return MongoClient.connect(config.mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  async getTagsOfFiles(fileNamesArray) {
    const client = await this._getMongoClient();

    const db = client.db();

    const imageTags = db.collection(config.mongoDbCollection);

    const tags = await imageTags
      .find({ name: { $in: fileNamesArray } })
      .toArray();

    await client.close();

    return tags;
  }

  getTagsSearchMongoObject(tagsArray)
  {
    if (!tagsArray || tagsArray.length == 0) {
      return  null;
    }

    const positiveTags = _(tagsArray)
      .filter(t => t[0] !== "-")
      .toArray();
    const negativeTags = _(tagsArray)
      .filter(t => t[0] === "-")
      .map(t => t.substring(1))
      .toArray();

    const positiveRegularExpressions = positiveTags
      .map(t => new RegExp("^" + t, "i"))
      .value();
    const negativeRegularExpressions = negativeTags
      .map(t => new RegExp("^" + t, "i"))
      .value();

    const positiveObject = positiveRegularExpressions.length == 0
      ? null
      : { tags: { $all: positiveRegularExpressions } };
    const negativeObject = negativeRegularExpressions.length == 0
      ? null
      : { tags: { $not: {$elemMatch: { $in: negativeRegularExpressions } } } };

    if(positiveObject === null) return negativeObject;
    if(negativeObject === null) return positiveObject;

    return { $and: [ positiveObject, negativeObject ] };

  }

  async getFilesWithTags(tagsArray, limit, offset, sortBy = "name") {
    const client = await this._getMongoClient();

    const db = client.db();

    const imageTags = db.collection(config.mongoDbCollection);

    const findObject = this.getTagsSearchMongoObject(tagsArray);

    const sortByName = sortBy !== "name" ? -1 : 1;

    const items = await imageTags
      .find(findObject)
      .sort({ name: sortByName })
      .skip(offset)
      .limit(limit)
      .toArray();

    const total = await imageTags.countDocuments(findObject);

    await client.close();

    return {
      items: items,
      limit: limit,
      offset: offset,
      total: total
    };
  }

  async getRandomFiles(tagsArray, limit) {
    const client = await this._getMongoClient();

    const db = client.db();

    const imageTags = db.collection(config.mongoDbCollection);

    const pipelineSteps = [];

    const findObject = this.getTagsSearchMongoObject(tagsArray);

    if (findObject !== null) {
      pipelineSteps.push({ $match: findObject });
    }

    pipelineSteps.push({ $sample: { size: limit } });

    const items = await imageTags.aggregate(pipelineSteps).toArray();

    await client.close();

    return {
      items: items,
      limit: limit,
      offset: 0,
      total: limit
    };
  }

  async saveTags(name, tags) {
    const client = await this._getMongoClient();

    const db = client.db();

    const imageTags = db.collection(config.mongoDbCollection);

    await imageTags.updateOne(
      { name: name },
      {
        $set: {
          name: name,
          tags: tags
        }
      },
      { upsert: true }
    );

    await client.close();
  }
}
