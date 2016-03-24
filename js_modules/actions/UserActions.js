import { SET_LOGINED } from '../constants/User'


export function setLogined(bool) {
    return {
        type: SET_LOGINED,
        payload: bool
    }
}