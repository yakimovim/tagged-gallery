import _ from 'lodash'
import store from './store.js';
import ActionTypes from './actionTypes.js';
import * as Data from './data.js'
import history from './history.js'

function getThumbnails(searchText, offset, pageSize, sortBy) {
    store.dispatch({ type: ActionTypes.GET_THUMBNAILS_PAGE.GETTINGS });
    Data.getThumbnails(searchText, offset, pageSize, sortBy)
        .then(function (data) {
            store.dispatch({
                type: ActionTypes.GET_THUMBNAILS_PAGE.SUCCESS,
                pageIndex: _.toInteger(data.offset / pageSize) + 1,
                total: data.total,
                thumbnails: data.items
            });
        })
        .catch(function () {
            store.dispatch({ type: ActionTypes.GET_THUMBNAILS_PAGE.FAILURE });
        });
}

export function getThumbnailsPage(searchText, pageIndex, pageSize) {
    const state = store.getState();
    if(searchText != state.searchText
    || pageIndex != state.pageIndex
    || pageSize != state.pageSize) {
        store.dispatch({ type: ActionTypes.SET_SEARCH_TEXT, searchText: decodeURI(searchText) });
        getThumbnails(searchText, (pageIndex - 1) * pageSize, pageSize, state.sortBy);
    }
}

export function getFullImage(name) {
    store.dispatch({ type: ActionTypes.GET_FULL_IMAGE.GETTINGS });
    Data.getFullImage(name)
        .then(function (data) {
            store.dispatch({
                type: ActionTypes.GET_FULL_IMAGE.SUCCESS,
                href: data.href
            });
        })
        .catch(function () {
            store.dispatch({ type: ActionTypes.GET_FULL_IMAGE.FAILURE });
        });
}

export function getNextPage() {
    const state = store.getState();
    if (state.pageIndex * state.pageSize <= state.total) {
        if(state.searchText != "") {
            history.replace(`/${encodeURI(state.searchText)}/${state.pageIndex + 1}`);
        } else {
            history.replace(`/${state.pageIndex + 1}`);
        }
        getThumbnails(state.searchText, state.pageIndex * state.pageSize, state.pageSize, state.sortBy);
    }
}

export function getPrevPage() {
    const state = store.getState();
    if (state.pageIndex > 1) {
        if(state.searchText != "") {
            history.replace(`/${encodeURI(state.searchText)}/${state.pageIndex - 1}`);
        } else {
            history.replace(`/${state.pageIndex - 1}`);
        }
        let offset = (state.pageIndex - 2) * state.pageSize;
        getThumbnails(state.searchText, offset, state.pageSize, state.sortBy);
    }
}

export function getRandomThumbnails() {
    const state = store.getState();
    store.dispatch({ type: ActionTypes.GET_THUMBNAILS_PAGE.GETTINGS });
    Data.getRandomThumbnails(state.searchText, state.pageSize)
        .then(function (data) {
            store.dispatch({
                type: ActionTypes.GET_THUMBNAILS_PAGE.SUCCESS,
                pageIndex: 1,
                total: state.pageSize,
                thumbnails: data.items
            });
        })
        .catch(function () {
            store.dispatch({ type: ActionTypes.GET_THUMBNAILS_PAGE.FAILURE });
        });
}

export function search(searchText) {
    store.dispatch({ type: ActionTypes.SET_SEARCH_TEXT, searchText: searchText });
    const state = store.getState();
    if(searchText != "") {
        history.replace(`/${encodeURI(searchText)}/1`);
    } else {
        history.replace(`/1`);
    }
    getThumbnails(searchText, 0, state.pageSize, state.sortBy);
}

export function changeSorting(sortBy) {
    store.dispatch({ type: ActionTypes.SET_SORT_BY, sortBy: sortBy });
    const state = store.getState();
    if(state.searchText != "") {
        history.replace(`/${encodeURI(state.searchText)}/${state.pageIndex}`);
    } else {
        history.replace(`/${state.pageIndex}`);
    }
    getThumbnails(state.searchText, (state.pageIndex - 1) * state.pageSize, state.pageSize, state.sortBy);
}

export function findFirstPageWithUntaggedImage() {
    store.dispatch({ type: ActionTypes.SET_SEARCH_TEXT, searchText: '' });
    store.dispatch({ type: ActionTypes.GET_THUMBNAILS_PAGE.GETTINGS });
    const state = store.getState();
    Data.getThumbnailsDataWithUntagged(state.pageSize, 0, state.sortBy)
        .then(function (data) {
            store.dispatch({
                type: ActionTypes.GET_THUMBNAILS_PAGE.SUCCESS,
                pageIndex: _.toInteger(data.offset / data.limit) + 1,
                total: data.total,
                thumbnails: data.items
            });
            history.replace(`/${_.toInteger(data.offset / data.limit) + 1}`);
        })
        .catch(function () {
            store.dispatch({ type: ActionTypes.GET_THUMBNAILS_PAGE.FAILURE });
        });
}