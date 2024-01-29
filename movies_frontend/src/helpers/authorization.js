import * as config from './config.js';
import * as auth from './authorization.js';
import { axiosInstance } from "../axios.js";

export { 
    clearAuthTokens, 
    writeAuthTokens,
    readAuthToken,
    checkoutUserInfo
};

function writeAuthTokens(data) {
    Object.entries(data).forEach(([key, value]) => localStorage.setItem(`${key}_token`, value));
}

function clearAuthTokens() {
    ['access', 'refresh'].forEach(key => localStorage.removeItem(`${key}_token`));
}

function readAuthToken() {
    const storageKey = 'access_token';
    const accessToken = localStorage.getItem(storageKey);
    const authToken = accessToken
        ? 'Bearer ' + accessToken
        : null;

    return authToken;
}

function checkoutUserInfo(dispatch) {
    const userInfoUrl = `${config.url.api}${config.url.userInfo}`;
    const headers = {
        Authorization: auth.readAuthToken(),
        'Content-Type': config.contentType,
        accept: config.contentType
    };
    const onSuccess = userData => updateUserInfo(userData, dispatch);
    const onReject = () => updateUserInfo(null, dispatch);

    fetch(userInfoUrl, { headers })
        .then(response => response.ok && response.json())
        .then(onSuccess, onReject);
}

function updateUserInfo(userData, dispatch) {
    dispatch({ type: 'USER_INFO', payload: userData });
}