import { SET_IMGS_REQUEST, SET_IMGS_SUCCESS, SET_IMGS_FAILED, SET_IMGS_CLEAR } from '../constants/Page'

export function getImgs(imgsState) {
    return (dispatch) => {
        if (imgsState == 'get') {
            dispatch({
                type: SET_IMGS_REQUEST
            });

            let xhr = new XMLHttpRequest(),
                url = '/imgs';

            xhr.open('POST', url, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState != 4) return;
                if (xhr.status != 200) {

                    dispatch({
                        type: SET_IMGS_FAILED
                    });

                    console.log("Error! Imgs are not loaded");
                } else {
                    let imgsArr = JSON.parse(xhr.responseText);

                    dispatch({
                        type: SET_IMGS_SUCCESS,
                        payload: imgsArr
                    });

                    console.log("Imgs loaded!");
                }
            };
            xhr.send();
        }
    }
}


export function clearImgs() {
    return (dispatch) => {
        dispatch({
            type: SET_IMGS_CLEAR
        });
    }
}