import { useApp, useAppDispatch } from "../context/AppContext";
import Alert from '@mui/material/Alert';
import { useEffect } from "react";
import * as config from '../helpers/config.js';

export { GlobalMessage };

function GlobalMessage() {
    const appData = useApp();
    const dispatch = useAppDispatch();
    const appMessage = appData.globalMessage;
    
    useEffect(messageTimeout, [appMessage]);
    
    if (!appMessage) return null;
    
    return (
        <div className="global-message">
            <Alert severity={appMessage.type} onClose={closeMessage}>{appMessage.text}</Alert>
        </div>
    );

    function closeMessage() {
        dispatch({ type: 'APP_MESSAGE', payload: null });
    };

    function messageTimeout() {
        setTimeout(closeMessage, config.popupTimeout);
    }
}