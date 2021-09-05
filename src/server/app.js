import path from 'path';
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import YandexDiskApi from './yandexDiskApi';
import TaggedGalleryApi from './api';

import config from '../config/configuration';

const app = express();
app.use(cookieParser());
app.use(express.json());

const clientPath = path.resolve(process.cwd(), './dist/client');

app.use(compression());

app.use(express.static(clientPath));

app.get('/api/clientId', function (req, res) {
    res.send(config.yandexClientId);
});

app.get('/api/preview', function (req, res) {
    const api = new TaggedGalleryApi(req.cookies.access_token);
    api.getImagePreviews(req.query.search, req.query.limit, req.query.offset, decodeURI(req.query.sortBy))
        .then(function (data) {
            res.json(data);
        });
});

app.get('/api/untagged', function (req, res) {
    const api = new TaggedGalleryApi(req.cookies.access_token);
    api.getImagePreviewsWithImageWithNoTags(req.query.limit, req.query.offset, decodeURI(req.query.sortBy))
        .then(function (data) {
            res.json(data);
        });
});

app.get('/api/image', function (req, res) {
    const api = new YandexDiskApi(req.cookies.access_token);
    api.getFullImage(req.query.fileName)
        .then(function (data) {
            res.json(data);
        });
});

app.get('/api/random', function (req, res) {
    const api = new TaggedGalleryApi(req.cookies.access_token);
    api.getRandomImages(req.query.search, req.query.limit)
        .then(function (data) {
            res.json(data);
        });
});

app.post('/api/saveTags', function (req, res) {
    const api = new TaggedGalleryApi(req.cookies.access_token);
    api.saveTags(req.body.name, req.body.tags)
        .then(function () {
            res.send();
        });
});

app.get('/api/slide', function (req, res) {
    const api = new TaggedGalleryApi(req.cookies.access_token);
    api.getSlideImage(req.query.search)
        .then(function (data) {
            res.json(data);
        });
});

app.get('*', function (req, res) {
    res.sendFile(clientPath + '/index.html');
});

const port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log(`Listening on port ${port}...`);
});