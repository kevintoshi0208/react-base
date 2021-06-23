import {apiUrl} from '../config/config';
import 'redux';
import {userLogout} from '../redux/actions/actions';
import {refreshTime} from "../components/Layout/Timer";
import 'core-js/features/url-search-params';

if (typeof window !=="undefined"){
    require('whatwg-fetch');
}

export async function fetchJson(url, options={}) {

    refreshTime();

    let functionName = null;
    if(typeof window !==  "undefined"){
        functionName = window.location.pathname;
        functionName = functionName.substr(1,functionName.length)
    }

    return fetch(apiUrl+url,  {
        ...options,
        credentials: 'include',
        headers: {
            ...options.headers,
            'x-customer': functionName
        }
    })
    .then(checkStatus)
    .then(function(response){
        return response
            .text()
            .then(function(text) {
                if (text){
                    let json = '';
                    try {

                        json = JSON.parse(text);
                        return json;
                    } catch (e) {
                        return Promise.reject("json parse error");
                    }
                }
            })
            ;
    })

    ;
}

async function checkStatus(response) {
    if (response.status >= 200 && response.status < 400) {
        return response;
    }

    if (
        response.status === 401
    ) {
        window.store.dispatch(userLogout());
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

export function stringifyUrl(param) {

    const url = param.url??"";
    const query = param.query??{};

    let stringQuery = {};
    let arrayQuery = {};
    if(param.query){
        for(let [key,value] of Object.entries(param.query) ){
            //判斷query是否為array
            if (!Array.isArray(value)){
                if(value !== undefined){
                    stringQuery[key] = value ;
                }
            }else {
                arrayQuery[key] = value ;
            }
        }
    }

    const urlParams = new URLSearchParams(Object.entries(stringQuery))
    for (let [key,queries] of Object.entries(arrayQuery)){
        for (let query of queries){
            if (query !== undefined){
                urlParams.append(key, query);
            }
        }
    }

    return url + "?" + urlParams.toString()
}

export async function fetchDownload(url, options,fileName) {

    refreshTime();

    return fetch(apiUrl+url,  {
        ...options,
        credentials: 'include',
        headers: {
            ...options.headers,
        }
    })
        .then(checkStatus)
        .then(function (response) {
            return response.blob();
        })
        .then(function (blob) {
            if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
                window.navigator.msSaveOrOpenBlob(blob , fileName);
            }
            else {
                var url = window.URL.createObjectURL(blob);

                var a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                a.remove();
            }

        });
}

export async function fetchPdf(url, options,fileName) {

    refreshTime();
    return fetch(apiUrl+url,  {
        ...options,
        credentials: 'include',
        headers: {
            ...options.headers,
        }
    })
        .then(checkStatus)
        .then( function (response) {
            return response.blob();
        }).then(function (blob){

        });
}

export function fetchHtml(url, options) {
    return fetch(apiUrl+url, Object.assign({
        credentials: 'include',
    }, options))
        .then(checkStatus)
        .then(function(response)  {
            return response.text();
        });
}
