import { MODAL_OPEN, MODAL_CLOSE } from '../constants/Modal'

export function setModalState(bool) {
    return (dispatch) => {
        if (bool == true) {
            dispatch({
                type: MODAL_OPEN
            });
        } else if (bool == false) {
            dispatch({
                type: MODAL_CLOSE
            });
        }
    };
}