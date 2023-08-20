import Cookies from 'js-cookie';
import * as crypt from './crypto';

export default function getUser() {
  // Cookies.remove('user');
  const user = crypt.decrypt(Cookies.get('user'));

  return JSON.parse(user);
}
