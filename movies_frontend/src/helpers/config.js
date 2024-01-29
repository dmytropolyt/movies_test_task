export {
    url,
    requestTimeout,
    popupTimeout,
    contentType,
    rootDir,
    title,
    message,
    defaultRating
};

const url = {
    base: document.location.origin,
    api: import.meta.env.VITE_REACT_APP_API_URL,
    jwtAuth: 'auth/jwt/create/',
    signUp: 'auth/users/',
    moviesList: 'movie/',
    review: 'review/',
    discussion: 'discussion/',
    comment: 'comment/',
    userInfo: 'auth/users/me/',
};
const requestTimeout = 5000;
const popupTimeout = 5000;
const contentType = 'application/json';
const rootDir = `${url.base}/src`;
const title = {
    site: 'Movies App',
    logo: 'Movies'
};
const message = {
    loginSuccess: { type: 'success', text: 'Login success' },
    logoutSuccess: { type: 'success', text: 'You\'ve logged out' },
    signupSuccess: { type: 'success', text: 'You\'ve successfully signed up. Now, Log In, please.' }
};
const defaultRating = 5;
