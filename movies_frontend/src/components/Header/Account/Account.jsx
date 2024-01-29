import { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { AccountMenu } from './AccountMenu';
import { Login } from "./Login";
import { SignUp } from './SignUp';
import { UserMenu } from './UserMenu';

export { Account };

function Account() {
    const appData = useApp();
    const isLoggedIn = appData.isLogin;
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [formOpened, setFormOpened] = useState(null);
    const backButton = <span className='account_back-button fas fa-arrow-left' onClick={() => setFormOpened(false)}></span>;
    const display = {
        accountMenu: !(isLoggedIn || formOpened),
        userMenu: isLoggedIn,
        backButton: !isLoggedIn && formOpened,
        form: {
            login: !isLoggedIn && formOpened === 'login',
            signup: !isLoggedIn && formOpened === 'signup',
        }
    };

    return (
        <div className='account'>
            <span className="account_button fas fa-user" onClick={toggleDropdown}></span>
            <div className={`account_dropdown ${isDropdownOpen ? 'open' : ''}`}>
                {display.accountMenu && <AccountMenu opener={setFormOpened} />}
                {display.userMenu && <UserMenu opener={openDropdown} />}
                {display.backButton && backButton}
                {display.form?.login && <Login opener={openDropdown} />}
                {display.form?.signup && <SignUp opener={openDropdown} />}
            </div>            
        </div>
    );

    function toggleDropdown() {
        openDropdown(!isDropdownOpen);
    }

    function openDropdown(open = true) {
        if (!open) {
            setFormOpened(null);
        }

        setDropdownOpen(open);
    }

}