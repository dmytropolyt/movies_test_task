import { axiosInstance } from '../../../axios.js';
import { useAppDispatch } from '../../../context/AppContext.jsx';
import { useState } from 'react';
import * as config from '../../../helpers/config.js';
import * as auth from '../../../helpers/authorization.js';

export { Login };

function Login({ opener }) {
    const dispatch = useAppDispatch();
    const [loginStatus, setLoginStatus] = useState({ ok: true });

    return (
        <form className={`login-form ${loginStatus.ok ? '' : 'error'}`} onSubmit={handleLogin}>
            <input name='username' type='text' className='input login' required/>
            <input name='password' type='password' className='input password' required/>
            <button className='button'>Log In</button>
            {loginStatus.ok || <div className="error-message">{loginStatus.message}</div>}
        </form>
    );

    function handleLogin(event) {
        const form = event.target;
        const formData = new FormData(form);

        event.preventDefault();
        axiosInstance.post(config.url.jwtAuth, formData).then(processLogin, processLoginFail);
    }

    function processLogin(response) {      
        auth.writeAuthTokens(response.data);
        auth.checkoutUserInfo(dispatch);
        axiosInstance.defaults.headers['Authorization'] = auth.readAuthToken();
        dispatch({ type: 'LOGIN', payload: true });
        dispatch({ type: 'APP_MESSAGE', payload: config.message.loginSuccess });
        setLoginStatus({ ok: true });
        opener(false);
    }

    function processLoginFail(summary) {
        const message = summary.response.data.detail;
        setLoginStatus({ ok: false, message });
    }
}