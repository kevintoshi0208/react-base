import {
    fetchJson
} from './request';
import {apiUrl} from '../config/config';

export function login(LoginMessage,loginUrl) {
    return fetch(apiUrl+loginUrl,  {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(LoginMessage),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function checkStatus(response) {
        if (response.status >= 200 && response.status < 400) {
            return response;
        }
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    })
    .then(response => {
        return response.text().then(function(text) {
            let json = '';

            try {
                json = JSON.parse(text);
                return json;
            } catch (e) {
                return text;
            }
        });
    });
}

export function getCurrentLoginUser() {
    return fetchJson('/api/me', {
        method: 'GET',
    });
}

export function logout() {
    return fetch(apiUrl + '/logout', Object.assign({
        credentials: 'include',
    }));
}

export function resetPasswordByToken(requestData,token){
    return fetchJson('/api/reset_password/' + token, {
        method: 'PUT',
        body: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/ld+json'
        }
    });
}