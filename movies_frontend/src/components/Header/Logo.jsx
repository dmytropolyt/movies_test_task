import * as config from '../../helpers/config.js';
export { Logo };

function Logo() {
    return <a className="logo" href={config.url.base}>{config.title.logo}</a>
}
