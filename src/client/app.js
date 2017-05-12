import './css.js'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { getCookie } from './cookie.js'
import { getClientId } from './data.js'

import store from './store.js'
import { getThumbnails } from './actions.js'
import Application from './components/application.jsx'

var token = getCookie("access_token");
if (!token) {
    getClientId().then(function (clientId) {
        location.href = "https://oauth.yandex.ru/authorize?response_type=token&client_id=" + clientId;
    });
} else {
    ReactDOM.render(<Provider store={store}>
        <Application />
    </Provider>,
        document.getElementById('app'));

    getThumbnails('', 0, 12);
}

