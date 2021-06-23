import {
    CLEAR_ERROR,
    USER_IS_LOADING,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT, USER_SET_LOADING,
    USER_SET_USER,
} from './constants';
import {login, logout} from '../../api/login';
import Router from 'next/router';

export const userLoginSuccess = (response) => {
    return {
        type: USER_LOGIN_SUCCESS,
        user : response,
        loginSite : response["@type"],
    }
}

export const userLogoutSuccess = () => {
    return {
        type: USER_LOGOUT
    }
}

export const userLogInFail = (error) => {
    return {
        type: USER_LOGIN_FAIL,
        loginError:error,
    }
}

export const userIsLoading = () => {
    return {
        type: USER_IS_LOADING,
    }
}

export const setUser = (user)=>{
    return {
        type: USER_SET_USER,
        user: user
    }
}

export const clearError = ()=>{
    return {
        type: CLEAR_ERROR
    }
}

export const setUserLoading = (userLoading) => {
    return {
        type: USER_SET_LOADING,
        userLoading: userLoading
    }
}

export const userLogout = (callBack) => {
    return (dispatch) => {
        logout().then(function() {
            dispatch(userLogoutSuccess());
            if (callBack){
                callBack();
            }
        })
    }
}

export const userLoginAttempt = (loginMessage,loginUrl= '/api/login',captcha=false) => {
    return (dispatch) => {
        dispatch(clearError());
        return login(loginMessage,loginUrl)
        .then(response => {
            dispatch(userLoginSuccess(response));
            return response;
        })
        .then(function(user) {
            Router.push("/MM01", "/MM01");
        })
        .catch((error) => {
            if (captcha){
                captcha.reloadImage();
            }

            if(error.response){
                return error.response.json().then(arr => {
                    if (arr.error) {
                        dispatch(userLogInFail(arr.error));
                    } else {
                        dispatch(userLogInFail('Unknown error'));
                    }
                });
            }
            throw error;
        });
    }
};

