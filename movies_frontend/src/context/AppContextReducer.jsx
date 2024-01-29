export { AppContextReducer };

const AppContextReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isLogin: action.payload };
        case 'USER_INFO':
            return { ...state, userInfo: action.payload };
        case 'APP_MESSAGE':
            return { ...state, globalMessage: action.payload };
        default:
            return state;
    }
}