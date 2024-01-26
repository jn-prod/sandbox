import axios from '@/services/utils/axios';
import domain from '@/config/domain.json'
import BaseService from '@/services/base.service'

export default class LoginService extends BaseService{
    baseUrl
    authService
    constructor(authService) {
        super()
        this.baseUrl = `${domain.baseUrl}/login`;
        this.authService = authService;
    }

    async postToken(code) {
        if (!code) return;

        const url = `${this.baseUrl}/`
        const payload = {
            code: code,
        }
        
        const { data, status } = await axios.post(url, payload)

        if(status === 200 && data) {
            const { jwt, user } = data;
            this.authService.setToken({jwt: `Bearer ${jwt}`, user});
        } else {
            this.authService.removeToken();
            throw new Error({data, status})
        }
    }
}