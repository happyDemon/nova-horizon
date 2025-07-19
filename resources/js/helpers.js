import axios from 'axios';

export function prepareHorizonRequest(horizonConfig, endpoint, options = {}) {
    if (typeof horizonConfig.auth === 'object') {
        options.auth = horizonConfig.auth;
    }
    if (typeof horizonConfig.headers === 'object') {
        options.headers = options.headers || {};
        options.headers = {...options.headers, ...horizonConfig.headers};
    }

    return axios.get(horizonConfig.url + '/' + endpoint, options);
}

export function prepareHorizonPostRequest(horizonConfig, endpoint, options = {}) {
    if (typeof horizonConfig.auth === 'object') {
        options.auth = horizonConfig.auth;
    }

    if (typeof horizonConfig.headers === 'object') {
        options.headers = options.headers || {};
        options.headers = {...options.headers, ...horizonConfig.headers};
    }
    return axios.post(horizonConfig.url + '/' + endpoint, options);
}
