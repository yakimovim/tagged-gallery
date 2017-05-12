import { createStore } from 'redux'
import reducer from './reducers.js'

const initialState = {
    searchText: '',
    pageSize: 12,
    offset: 0,
    total: 0,
    thumbnails: [],
    fullImage: ''
}

const store = createStore(reducer, initialState);

export default store;