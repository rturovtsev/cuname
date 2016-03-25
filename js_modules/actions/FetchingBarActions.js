import { SET_FETCHING_START, SET_FETCHING_END, SET_FETCHING_HIDE } from '../constants/FetchingBar'


export function setFetchingBarState(barState) {
    return (dispatch) => {
        switch (barState) {
            case 'start':
                dispatch({
                    type: SET_FETCHING_START,
                    payload: 'start'
                });
                break;

            case 'end':
                dispatch({
                    type: SET_FETCHING_END,
                    payload: 'end'
                });
                break;

            case 'hide':
                dispatch({
                    type: SET_FETCHING_HIDE,
                    payload: false
                });
                break;

            default:
                dispatch({
                    type: SET_FETCHING_HIDE,
                    payload: false
                });

        }
    };
}