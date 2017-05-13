import ActionTypes from './actionTypes.js'

const reducer = (state, action) => {
    switch(action.type) {
        case ActionTypes.GET_THUMBNAILS_PAGE.SUCCESS:
        {
            const newState = Object.assign({}, state, {
                offset: action.offset,
                total: action.total,
                thumbnails: action.thumbnails
            });
            return newState;
        }
        case ActionTypes.SET_SEARCH_TEXT:
        {
            const newState = Object.assign({}, state, {
                searchText: action.searchText
            });
            return newState;
        }
        case ActionTypes.GET_FULL_IMAGE.SUCCESS:
        {
            const newState = Object.assign({}, state, {
                fullImage: action.href
            });
            return newState;
        }
        case ActionTypes.REMOVE_FULL_IMAGE:
        {
            const newState = Object.assign({}, state, {
                fullImage: ''
            });
            return newState;
        }
        default:
            return state;
    }
};

export default reducer;