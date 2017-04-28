import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ 
    "path": path.join(process.cwd(), '.env')
});

export default {
    "yandexClientId": process.env.YANDEX_CLIENT_ID,

    "yandexDiskApiUrl": 'https://cloud-api.yandex.net:443/v1/disk/resources',
    "yandexDiskFolder": process.env.YANDEX_DISK_FOLDER,

    "mongoDbUrl": process.env.MONGO_DB_URL,
    "mongoDbCollection": process.env.MONGO_DB_COLLECTION
};
