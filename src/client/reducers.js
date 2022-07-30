import { createReducer } from '@reduxjs/toolkit'
import ActionTypes from './actionTypes.js'
import { initialState } from './initial-state.js';

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(ActionTypes.GET_THUMBNAILS_PAGE.GETTINGS, (state, action) => {
            state.loading = true;
        })
        .addCase(ActionTypes.GET_THUMBNAILS_PAGE.FAILURE, (state, action) => {
            state.loading = false;
        })
        .addCase(ActionTypes.GET_THUMBNAILS_PAGE.SUCCESS, (state, action) => {
            state.pageIndex = action.pageIndex;
            state.total = action.total;
            state.thumbnails = action.thumbnails;
            state.loading = false;
        })
        .addCase(ActionTypes.SET_SEARCH_TEXT, (state, action) => {
            let sortBy = state.sortBy;
            if(!!action.searchText && !sortBy.endsWith("name")) {
                sortBy = "name";
            }
            state.searchText = action.searchText;
            state.sortBy = sortBy;
        })
        .addCase(ActionTypes.SET_SORT_BY, (state, action) => {
            state.sortBy = action.sortBy;
        })
        .addCase(ActionTypes.GET_FULL_IMAGE.SUCCESS, (state, action) => {
            state.fullImage = action.href;
        })
        .addCase(ActionTypes.REMOVE_FULL_IMAGE, (state, action) => {
            state.fullImage = '';
        })
        .addCase(ActionTypes.SET_RANDOM_MODE, (state, action) => {
            state.randomMode = action.randomMode;
        })
        .addCase(ActionTypes.GET_SLIDE_IMAGE.SUCCESS, (state, action) => {
            state.slideImage = action.href;
        })
        .addCase(ActionTypes.REMOVE_SLIDE_IMAGE, (state, action) => {
            state.slideImage = '';
        });
});

export default reducer;