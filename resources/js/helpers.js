export function prepareHorizonRequest(horizonConfig, endpoint, options = {}) {
    if (typeof horizonConfig.auth === 'object') {
        options.auth = horizonConfig.auth;
    }
    if (typeof horizonConfig.headers === 'object') {
        options.headers = options.headers || {};
        options.headers = {...options.headers, ...horizonConfig.headers};
    }

    return Nova.request()
        .get(horizonConfig.url + '/' + endpoint, options);
}

export function prepareHorizonPostRequest(horizonConfig, endpoint, options = {}) {
    if (typeof horizonConfig.auth === 'object') {
        options.auth = horizonConfig.auth;
    }

    if (typeof horizonConfig.headers === 'object') {
        options.headers = options.headers || {};
        options.headers = {...options.headers, ...horizonConfig.headers};
    }
    return Nova.request()
        .post(horizonConfig.url + '/' + endpoint, options);
}
