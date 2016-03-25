import { combineReducers } from 'redux'
import page from './page'
import user from './user'
import fetchingBar from './fetchingBar'

export default combineReducers({
    page,
    user,
    fetchingBar
});