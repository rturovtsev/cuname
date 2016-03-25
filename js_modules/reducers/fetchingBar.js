import { SET_FETCHING_START, SET_FETCHING_END, SET_FETCHING_HIDE } from '../constants/FetchingBar'

const initialState = {
    fetching: false
};


export default function fetchingBar(state = initialState, action) {
    switch (action.type) {
        case SET_FETCHING_START:
            return Object.assign({}, state, {fetching: action.payload});

        case SET_FETCHING_END:
            return Object.assign({}, state, {fetching: action.payload});

        case SET_FETCHING_HIDE:
            return Object.assign({}, state, {fetching: false});

        default:
            return state;
    }
}