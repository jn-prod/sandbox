import moment from 'moment';

class Auth {
    static jwtKey;

    constructor() {
        if (!Auth.jwtKey) {
            Auth.jwtKey = window.localStorage.getItem('feezifyToken');
        }
    }

    getToken() {
        if (!Auth.jwtKey) {
            Auth.jwtKey = window.localStorage.getItem('feezifyToken');
        }

        if (Auth.jwtKey && Auth.jwtKey !== 'null' && !this.isExpiredToken()) {
            return Auth.jwtKey
        }

        return null;
    }

    setToken(token) {
        token.expire = moment().utc().add(2, 'hour').toString()
        window.localStorage.setItem('feezifyToken', JSON.stringify(token))
    }

    removeToken() {
        Auth.jwtKey = null;
        window.localStorage.removeItem('feezifyToken')
    }

    getJwt() {
        const token = this.getToken();
        if (!token) return null;

        const {jwt} = JSON.parse(token)
        return jwt;
    }

    isExpiredToken() {
        const { expire }  = JSON.parse(Auth.jwtKey) || false;

        if (!expire) return true;

        return Date.now() > Date.parse(expire);
    }

    getUser() {
        const token = this.getToken();
        if (!token) return null;

        const { user = {} }  = JSON.parse(Auth.jwtKey);
        return user;
    }
}

export default Auth