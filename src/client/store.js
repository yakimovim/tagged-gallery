import { createStore } from 'redux'
import reducer from './reducers.js'

const initialState = {
    searchText: '',
    sortBy: 'name',
    pageSize: 12,
    pageIndex: 0,
    total: 0,
    thumbnails: [],
    fullImage: '',
    loading: false,
    randomMode: false
}

const store = createStore(reducer, initialState);

export default store;