import './css.js'

import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import { Provider } from 'react-redux'
import history from './history.js'

import { getCookie } from './cookie.js'
import { getClientId } from './data.js'

import store from './store.js'
import Application from './components/application.jsx'

var token = getCookie("access_token");
if (!token) {
    getClientId().then(function (clientId) {
        location.href = "https://oauth.yandex.ru/authorize?response_type=token&client_id=" + clientId;
    });
} else {
    ReactDOM.render(<Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route exact path="/:searchText/:pageId" component={Application} />
                <Route exact path="/:pageId" component={Application} />
                <Route exact path="/" component={Application} />
                <Route component={Application} />
            </Switch>
        </Router>
    </Provider>,
        document.getElementById('app'));
}

