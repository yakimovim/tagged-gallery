import { MongoClient } from "mongodb";
import _ from "lodash";

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

  async getFilesWithTags(tagsArray, limit, offset, sortBy = "name") {
    const client = await this._getMongoClient();

    const db = client.db();

    const imageTags = db.collection(config.mongoDbCollection);

    const tagsRegexes = _(tagsArray)
      .map(t => new RegExp("^" + t, "i"))
      .value();

    const sortByName = sortBy !== "name" ? -1 : 1;

    const items = await imageTags
      .find({ tags: { $all: tagsRegexes } })
      .sort({ name: sortByName })
      .skip(offset)
      .limit(limit)
      .toArray();

    const total = await imageTags.countDocuments({
      tags: { $all: tagsRegexes }
    });

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

    if (!!tagsArray && tagsArray.length > 0) {
      const tagsRegexes = _(tagsArray)
        .map(t => new RegExp("^" + t, "i"))
        .value();
      pipelineSteps.push({ $match: { tags: { $all: tagsRegexes } } });
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
