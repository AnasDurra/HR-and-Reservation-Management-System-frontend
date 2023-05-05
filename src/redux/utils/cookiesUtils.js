import Cookies from "js-cookie";

export default function checkUser() {
    const user = Cookies.get('user');

    return user;
}