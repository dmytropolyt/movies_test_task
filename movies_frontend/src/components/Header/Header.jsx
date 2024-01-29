import { Account } from "./Account/Account";
import { Logo } from "./Logo";

export { Header };

function Header() {
    return (
        <div className='header-wrapper'>
            <div className='header'>
                <Logo />
                <Account />
            </div>
        </div>
    );
}