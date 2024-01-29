import { useState } from "react";
import { useAppDispatch } from '../../../context/AppContext.jsx';
import * as config from '../../../helpers/config.js';
import { axiosInstance } from "../../../axios.js";

export { SignUp };

function SignUp({ opener }) {
    const dispatch = useAppDispatch();
    const [signUpStatus, setSignUpStatus] = useState({ ok: true });

    return (
        <form className={`login-form ${signUpStatus.ok ? '' : 'error'}`} onSubmit={handleSignUp}>
            <input name='email' type='email' placeholder='email' className='input email' required/>
            <input name='username' type='text' placeholder="username" className='input login' required/>
            <input name='password' type='password' placeholder="password" className='input password' required/>
            <button className='button'>Sign Up</button>
            {signUpStatus.ok || <div className="error-message">{signUpStatus.message}</div>}
        </form>
    );

    function handleSignUp(event) {
        const form = event.target;
        const formData = new FormData(form);

        event.preventDefault();
        axiosInstance.post(config.url.signUp, formData).then(processSignUp, processSignUpFail);
    }

    function processSignUp() {
        dispatch({ type: 'APP_MESSAGE', payload: config.message.signupSuccess });
        opener(false);
    }

    function processSignUpFail(summary) {
        const message = summary.response.data.detail;
        setSignUpStatus({ ok: false, message });
    }
}