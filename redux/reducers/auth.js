import {
    USER_IS_LOADING,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_SET_LOADING,
    USER_SET_USER,
    CLEAR_ERROR
} from '../actions/constants';

let initialState;

initialState = {
    user: {},
    userIsLoading: true,
    loginSite:"Account",
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                user: action.user,
                userIsLoading: false,
                loginSite: action.loginSite
            };
        case USER_LOGOUT:
            return {
                ...state,
                user: {},
                userIsLoading: false,
            };
        case USER_IS_LOADING:
            return {
                ...state,
                userIsLoading: true
            };
        case USER_LOGIN_FAIL:
            return {
                ...state,
                user: {},
                loginError: action.loginError,
                userIsLoading: false
            };
        case USER_SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case USER_SET_LOADING:
            return {
                ...state,
                userIsLoading: action.userLoading
            };
        case CLEAR_ERROR:
            return {
                ...state,
                loginError: '',
            }
        default:
            return state;
    }
}

export default authReducer;