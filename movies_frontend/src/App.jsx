import { useEffect } from "react";
import { useAppDispatch } from "./context/AppContext";
import { Header } from "./components/Header/Header";
import { Content } from "./components/Content/Content";
import { GlobalMessage } from "./components/GlobalMessage";
import * as auth from './helpers/authorization.js';

export default App;

function App() {
    const dispatch = useAppDispatch();

    useEffect(onLoad, []);

    return (
        <>
            <Header />
            <GlobalMessage />
            <div className="content">
                <Content />
            </div>
        </>
    );

    function onLoad() {
        checkoutSavedLogin() && auth.checkoutUserInfo(dispatch);
    }

    function checkoutSavedLogin() {
        const savedLogin = auth.readAuthToken();

        savedLogin && dispatch({ type: 'LOGIN', payload: true });
        return savedLogin;
    }
}