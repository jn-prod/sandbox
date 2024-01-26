import domain from '@/config/domain.json'
import BaseService from '@/services/base.service'

export default class UserService extends BaseService{
    baseUrl
    constructor() {
        super()
        this.baseUrl = `${domain.baseUrl}/user`;
    }
}