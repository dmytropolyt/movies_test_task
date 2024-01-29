export { AccountMenu };

function AccountMenu({ opener }) {
    const actions = [
        { action: 'login', label: 'Log In' },
        { action: 'signup', label: 'Sign Up' }
    ];
    const buttonsRenderer = ({ action, label }) => (
        <button className='account_menu_button' onClick={() => opener(action)} key={action}>{label}</button>
    );
    const accountButtons = actions.map(buttonsRenderer);

    return <div className={`account_menu`}>{accountButtons}</div>;
}