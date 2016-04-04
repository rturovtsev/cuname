import { SET_IMGS_REQUEST, SET_IMGS_SUCCESS, SET_IMGS_FAILED } from '../constants/Page'


const initialState = {
    images: (cunameUser.username && cunameUser.username != 'Гость') ? cunameUser.images : []
};

export default function page(state = initialState, action) {
    switch (action.type) {
        case SET_IMGS_REQUEST:
            return Object.assign({}, state);

        case SET_IMGS_FAILED:
            return Object.assign({}, state);

        case SET_IMGS_SUCCESS:
            return Object.assign({}, state, {images: action.payload});


        default:
            return state;
    }
}