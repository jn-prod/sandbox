import axios from 'axios'
import Auth from './auth'
const instance = axios.create({
    timeout: 5 * 1000,
    headers: {
        'Content-Type': 'application/json'
    }
})
instance.defaults.baseURL = process.env.VUE_APP_API_BASE

instance.interceptors.request.use((config) => {
    const auth = new Auth();
    const jwt = auth.getJwt();
    if (jwt) {
        config.headers['Authorization'] = jwt;
    }
    
    return config
})

export default instance;