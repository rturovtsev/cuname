import { SET_LOGINED } from '../constants/User'

const initialState = {
    name: cunameUser.username,
    logined: (cunameUser.username && cunameUser.username != 'Гость') ? true : false
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case SET_LOGINED:
            return Object.assign({}, state, {logined: action.payload });

        default:
            return state;
    }
}