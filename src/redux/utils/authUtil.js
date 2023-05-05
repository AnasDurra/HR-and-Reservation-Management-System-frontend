import Cookies from "js-cookie";
import * as crypt from './crypto';

export default function authUtil() {
    const user = crypt.decrypt(Cookies.get('user'));

    return (
        user ?
        'Bearer ' +
        (user.length !== 0
            ? JSON.parse(user).access_token
            : '') : ''
    );
}