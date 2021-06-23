import {fetchJson,stringifyUrl} from './request';
import {terminateAndCreateSignal} from '../components/Public/Table/termial';

export function createUser(requestData) {
    return fetchJson('/api/users', {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function updateUser(requestData, id) {
    return fetchJson('/api/users/' + id, {
        method: 'PATCH',
        body: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/merge-patch+json'
        }
    });
}

export function updateUser2(requestData, id) {
    return fetchJson('/api/users/changePassword/' + id, {
        method: 'PUT',
        body: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/ld+json'
        }
    });
}

export function deleteUser(requestData, id) {
    return fetchJson('/api/users/' + id, {
        method: 'DELETE',
        body: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/merge-patch+json'
        }
    });
}

export function getUsers(conditions, terminal) {

    const signal = terminateAndCreateSignal(terminal);

    const url = stringifyUrl({
        url: '/api/users',
        query: conditions
    });

    return fetchJson(url, {
        signal: signal,
        method: 'GET',
        headers: {
            'Content-Type': 'application/ld+json'
        }
    })
}

export function getUser(id, terminal) {

    const signal = terminateAndCreateSignal(terminal);

    const url = stringifyUrl({
        url: '/api/users/' + id,
    });

    return fetchJson(url, {
        signal: signal,
        method: 'GET',
        headers: {
            'Content-Type': 'application/ld+json'
        }
    })
}