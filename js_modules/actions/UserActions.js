import { SET_LOGINED_REQUEST, SET_LOGINED_SUCCESS, SET_LOGINED_FAILED } from '../constants/User'
import { SET_NAME } from '../constants/User'


export function setLogined(bool) {
    return (dispatch) => {
        if (bool) {
            dispatch({
                type: SET_LOGINED_REQUEST,
                payload: {
                    logined: true
                }
            });
        } else {
            let xhr = new XMLHttpRequest(),
                url = '/logout';

            xhr.open('POST', url, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState != 4) return;
                if (xhr.status !=200 ) {

                    dispatch({
                        type: SET_LOGINED_FAILED
                    });

                    console.log("Error! Not logout!");
                } else {

                    dispatch({
                        type: SET_LOGINED_SUCCESS,
                        payload: {
                            logined: false
                        }
                    });

                    console.log("GoodBy!");
                }
            };
            xhr.send();
        }
    };
}


export function setName(name) {
    return (dispatch) => {
        dispatch({
            type: SET_NAME,
            payload: {
                name: name
            }
        });
    }
}