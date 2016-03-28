import { combineReducers } from 'redux'
import page from './page'
import user from './user'
import fetchingBar from './fetchingBar'
import modal from './modal'

export default combineReducers({
    page,
    user,
    fetchingBar,
    modal
});