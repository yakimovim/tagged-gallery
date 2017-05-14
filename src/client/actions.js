import store from './store.js';
import ActionTypes from './actionTypes.js';
import * as Data from './data.js'

export function getThumbnails(searchText, offset, pageSize) {
    store.dispatch({ type: ActionTypes.GET_THUMBNAILS_PAGE.GETTINGS });
    Data.getThumbnails(searchText, offset, pageSize)
        .then(function (data) {
            store.dispatch({
                type: ActionTypes.GET_THUMBNAILS_PAGE.SUCCESS,
                offset: data.offset,
                total: data.total,
                thumbnails: data.items
            });
        })
        .catch(function () {
            store.dispatch({ type: ActionTypes.GET_THUMBNAILS_PAGE.FAILURE });
        });
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
    if (state.offset + state.pageSize <= state.total) {
        getThumbnails(state.searchText, state.offset + state.pageSize, state.pageSize);
    }
}

export function getPrevPage() {
    const state = store.getState();
    if (state.offset > 0) {
        let offset = state.offset - state.pageSize;
        if (offset < 0) {
            offset = 0;
        }
        getThumbnails(state.searchText, offset, state.pageSize);
    }
}

export function search(searchText) {
    store.dispatch({ type: ActionTypes.SET_SEARCH_TEXT, searchText: searchText });
    const state = store.getState();
    getThumbnails(searchText, 0, state.pageSize);
}

export function findFirstPageWithUntaggedImage() {
    store.dispatch({ type: ActionTypes.SET_SEARCH_TEXT, searchText: '' });
    store.dispatch({ type: ActionTypes.GET_THUMBNAILS_PAGE.GETTINGS });
    const state = store.getState();
    Data.getThumbnailsDataWithUntagged(state.pageSize, 0)
        .then(function (data) {
            store.dispatch({
                type: ActionTypes.GET_THUMBNAILS_PAGE.SUCCESS,
                offset: data.offset,
                total: data.total,
                thumbnails: data.items
            });
        })
        .catch(function () {
            store.dispatch({ type: ActionTypes.GET_THUMBNAILS_PAGE.FAILURE });
        });
}