global.$ = require('jquery');

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-theme.min.css'

import { getCookie } from './cookie.js';
import { getThumbnailsData } from './data.js';
import { init, drawPreviews } from './dom.js';

var token = getCookie("access_token");
if (!token) {
    $.get('/api/clientId').then(function (clientId) {
        location.href = "https://oauth.yandex.ru/authorize?response_type=token&client_id=" + clientId;
    });
} else {
    init();

    getThumbnailsData('', 12, 0)
        .then(function(data){
            drawPreviews(data);
        });
}

