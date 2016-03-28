import { MODAL_OPEN, MODAL_CLOSE } from '../constants/Modal'

const initialState = {
    modalIsOpen: false
};


export default function modal(state = initialState, action) {
    switch (action.type) {
        case MODAL_OPEN:
            return Object.assign({}, state, {modalIsOpen: true});

        case MODAL_CLOSE:
            return Object.assign({}, state, {modalIsOpen: false});

        default:
            return state;
    }
}