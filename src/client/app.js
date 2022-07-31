import "./css.js";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import { getCookie } from "./cookie.js";
import { getClientId } from "./data.js";

import store from "./store.js";
import Application from "./components/application.jsx";
import SlideShow from "./components/slideshow.jsx";

var token = getCookie("access_token");
if (!token) {
  getClientId().then(function(clientId) {
    location.href =
      "https://oauth.yandex.ru/authorize?response_type=token&client_id=" +
      clientId;
  });
} else {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/slideshow" element={<SlideShow/>} />
          <Route exact path="/:searchText/:pageId" element={<Application/>} />
          <Route exact path="/:pageId" element={<Application/>} />
          <Route exact path="/" element={<Application/>} />
          <Route element={<Application/>} />
        </Routes>
      </BrowserRouter>
    </Provider>,
    document.getElementById("app")
  );
}
