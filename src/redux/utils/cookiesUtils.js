import Cookies from "js-cookie";
import * as crypt from './crypto';

export default function getUser() {
    const user = crypt.decrypt(Cookies.get('user'));

    return JSON.parse(user);
}