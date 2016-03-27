import { SET_LOGINED_REQUEST, SET_LOGINED_SUCCESS, SET_LOGINED_FAILED } from '../constants/User'


export function setLogined(bool) {
    return (dispatch) => {
        dispatch({
            type: SET_LOGINED_REQUEST,
            payload: bool
        });

        let xhr = new XMLHttpRequest(),
            url = '/logout';

        xhr.open('POST', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;
            if (xhr.status !=200 ) {

                dispatch({
                    type: SET_LOGINED_FAILED
                });
                window.ee.emit('changeFetchState', 'hide');
                console.log("Error! Not logout!");
            } else {

                dispatch({
                    type: SET_LOGINED_SUCCESS,
                    payload: false
                });
                window.ee.emit('changeFetchState', 'end');
                console.log("GoodBy!");
            }
        };
        xhr.send();
    };
}