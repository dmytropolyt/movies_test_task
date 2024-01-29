import { useAppDispatch } from '../../../context/AppContext';
import { axiosInstance } from '../../../axios';
import * as config from '../../../helpers/config.js';
import * as auth from '../../../helpers/authorization.js';

export { UserMenu };

function UserMenu({ opener }) {
    const dispatch = useAppDispatch();

    return <button className='account_menu_button logout' onClick={handleLogOut}>Log Out</button>;

    function handleLogOut() {
        auth.clearAuthTokens();
        auth.checkoutUserInfo(dispatch);
        axiosInstance.defaults.headers['Authorization'] = null;
        dispatch({ type: 'LOGIN', payload: false });
        dispatch({ type: 'APP_MESSAGE', payload: config.message.logoutSuccess });
        opener(false);
    }
}