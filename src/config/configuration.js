import dotenv from 'dotenv';
dotenv.config();

function normalizeYandexDiskFolder(folder) {
    if (!folder.startsWith('/')) {
        folder = '/' + folder;
    }
    if (!folder.endsWith('/')) {
        folder = folder + '/';
    }

    return folder;
}

export default {
    "yandexClientId": process.env.YANDEX_CLIENT_ID,

    "yandexDiskApiUrl": 'https://cloud-api.yandex.net:443/v1/disk/resources',
    "yandexDiskFolder": normalizeYandexDiskFolder(process.env.YANDEX_DISK_FOLDER), // like: /Folder1/Folder2/Folder3/

    "mongoDbUrl": process.env.MONGO_DB_URL,
    "mongoDbCollection": process.env.MONGO_DB_COLLECTION
};
