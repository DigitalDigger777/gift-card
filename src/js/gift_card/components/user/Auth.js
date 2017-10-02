/**
 * Created by korman on 02.10.17.
 */

export default class Auth
{
    checkAuth(){
        const token = window.localStorage.getItem('token');

        if (token) {
            return true;
        } else {
            return false;
        }
    }
}