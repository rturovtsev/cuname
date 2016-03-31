import { combineReducers } from 'redux'
import page from './page'
import user from './user'
import modal from './modal'

export default combineReducers({
    page,
    user,
    modal
});