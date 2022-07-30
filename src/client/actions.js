import store from "./store.js";
import ActionTypes from "./actionTypes.js";
import * as Data from "./data.js";
import toInteger from "./utils.js";

function retrieveThumbnails(searchText, offset, pageSize, sortBy) {
  store.dispatch({ type: ActionTypes.GET_THUMBNAILS_PAGE.GETTINGS });
  Data.getThumbnails(searchText, offset, pageSize, sortBy)
    .then(function (data) {
      store.dispatch({
        type: ActionTypes.GET_THUMBNAILS_PAGE.SUCCESS,
        pageIndex: toInteger(data.offset / pageSize) + 1,
        total: data.total,
        thumbnails: data.items,
      });
    })
    .catch(function () {
      store.dispatch({ type: ActionTypes.GET_THUMBNAILS_PAGE.FAILURE });
    });
}

export function getThumbnailsPage(searchText, pageIndex, pageSize, randomMode) {
  const state = store.getState();

  if (
    searchText != state.searchText ||
    (!randomMode && pageIndex != state.pageIndex) ||
    pageSize != state.pageSize ||
    randomMode != state.randomMode
  ) {
    store.dispatch({
      type: ActionTypes.SET_RANDOM_MODE,
      randomMode: randomMode,
    });
    store.dispatch({
      type: ActionTypes.SET_SEARCH_TEXT,
      searchText: decodeURI(searchText),
    });

    // Do not load anything while some loading is in progress.
    if (state.loading) {
      return;
    }

    if (randomMode) {
      retrieveRandomThumbnails();
    } else {
      retrieveThumbnails(
        searchText,
        (pageIndex - 1) * pageSize,
        pageSize,
        state.sortBy
      );
    }
  }
}

export function getFullImage(name) {
  store.dispatch({ type: ActionTypes.GET_FULL_IMAGE.GETTINGS });
  Data.getFullImage(name)
    .then(function (data) {
      store.dispatch({
        type: ActionTypes.GET_FULL_IMAGE.SUCCESS,
        href: data.href,
      });
    })
    .catch(function () {
      store.dispatch({ type: ActionTypes.GET_FULL_IMAGE.FAILURE });
    });
}

export function getNextPage(history) {
  const state = store.getState();
  if (state.pageIndex * state.pageSize <= state.total) {
    if (state.searchText != "") {
      history.replace(`/${encodeURI(state.searchText)}/${state.pageIndex + 1}`);
    } else {
      history.replace(`/${state.pageIndex + 1}`);
    }
    retrieveThumbnails(
      state.searchText,
      state.pageIndex * state.pageSize,
      state.pageSize,
      state.sortBy
    );
  }
}

export function getPrevPage(history) {
  const state = store.getState();
  if (state.pageIndex > 1) {
    if (state.searchText != "") {
      history.replace(`/${encodeURI(state.searchText)}/${state.pageIndex - 1}`);
    } else {
      history.replace(`/${state.pageIndex - 1}`);
    }
    retrieveThumbnails(
      state.searchText,
      (state.pageIndex - 2) * state.pageSize,
      state.pageSize,
      state.sortBy
    );
  }
}

function retrieveRandomThumbnails() {
  store.dispatch({ type: ActionTypes.SET_RANDOM_MODE, randomMode: true });
  store.dispatch({ type: ActionTypes.GET_THUMBNAILS_PAGE.GETTINGS });
  const state = store.getState();
  Data.getRandomThumbnails(state.searchText, state.pageSize)
    .then(function (data) {
      store.dispatch({
        type: ActionTypes.GET_THUMBNAILS_PAGE.SUCCESS,
        pageIndex: 1,
        total: state.pageSize,
        thumbnails: data.items,
      });
    })
    .catch(function () {
      store.dispatch({ type: ActionTypes.GET_THUMBNAILS_PAGE.FAILURE });
    });
}

export function getRandomThumbnails(history) {
  const state = store.getState();

  if (!state.randomMode) {
    if (state.searchText != "") {
      history.replace(`/${encodeURI(state.searchText)}/random`);
    } else {
      history.replace(`/random`);
    }
  }

  retrieveRandomThumbnails();
}

export function search(searchText, history) {
  store.dispatch({ type: ActionTypes.SET_RANDOM_MODE, randomMode: false });
  store.dispatch({ type: ActionTypes.SET_SEARCH_TEXT, searchText: searchText });
  const state = store.getState();
  if (searchText != "") {
    history.replace(`/${encodeURI(searchText)}/1`);
  } else {
    history.replace(`/1`);
  }
  retrieveThumbnails(searchText, 0, state.pageSize, state.sortBy);
}

export function changeSorting(sortBy, history) {
  store.dispatch({ type: ActionTypes.SET_SORT_BY, sortBy: sortBy });
  const state = store.getState();
  if (state.searchText != "") {
    history.replace(`/${encodeURI(state.searchText)}/${state.pageIndex}`);
  } else {
    history.replace(`/${state.pageIndex}`);
  }
  retrieveThumbnails(
    state.searchText,
    (state.pageIndex - 1) * state.pageSize,
    state.pageSize,
    state.sortBy
  );
}

export function findFirstPageWithUntaggedImage(history) {
  store.dispatch({ type: ActionTypes.SET_SEARCH_TEXT, searchText: "" });
  store.dispatch({ type: ActionTypes.GET_THUMBNAILS_PAGE.GETTINGS });
  const state = store.getState();
  Data.getThumbnailsDataWithUntagged(state.pageSize, 0, state.sortBy)
    .then(function (data) {
      store.dispatch({
        type: ActionTypes.GET_THUMBNAILS_PAGE.SUCCESS,
        pageIndex: toInteger(data.offset / data.limit) + 1,
        total: data.total,
        thumbnails: data.items,
      });
      history.replace(`/${toInteger(data.offset / data.limit) + 1}`);
    })
    .catch(function () {
      store.dispatch({ type: ActionTypes.GET_THUMBNAILS_PAGE.FAILURE });
    });
}

export function showSlide() {
  store.dispatch({ type: ActionTypes.GET_SLIDE_IMAGE.GETTINGS });
  const state = store.getState();
  Data.getSlideImage(state.searchText)
    .then(function (data) {
      store.dispatch({
        type: ActionTypes.GET_SLIDE_IMAGE.SUCCESS,
        href: data.href,
      });
    })
    .catch(function () {
      store.dispatch({ type: ActionTypes.GET_SLIDE_IMAGE.FAILURE });
    });
}
