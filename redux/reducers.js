import {combineReducers} from 'redux';
import auth from './reducers/auth'

const createRootReducer = combineReducers({
    auth
})


export default createRootReducer