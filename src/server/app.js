import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import YandexDiskApi from './yandexDiskApi';
import TaggedGalleryApi from './api';

import config from '../config/configuration';

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./src/client'));

app.get('/api/clientId', function(req, res){
    res.send(config.yandexClientId);
});

app.get('/api/preview', function (req, res) {
    const api = new TaggedGalleryApi(req.cookies.access_token);
    api.getImagePreviews(req.query.search, req.query.limit, req.query.offset)
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

app.post('/api/saveTags', function (req, res) {
    const api = new TaggedGalleryApi(req.cookies.access_token);
    api.saveTags(req.body.name, req.body.tags)
       .then(function() {
           res.send();
       });
});

app.listen(process.env.PORT || 8080, function () {
    console.log('Listening on port 8080...');
});