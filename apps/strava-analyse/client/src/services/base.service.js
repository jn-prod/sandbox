import axios from '@/services/utils/axios';
import domain from '@/config/domain.json';
import { isEmpty } from 'lodash';
import { compare } from 'fast-json-patch'

export default class BaseService {
    baseUrl

    constructor() {
        this.baseUrl = `${domain.baseUrl}`;
    }

    /**
     * Get entity
     * @param {string} reference 
     */
    async get(reference) {
        if (!reference) return;

        const url = `${this.baseUrl}/${reference}`

        const { data, status } = await axios.get(url)

        if(status === 200 && data) {
            return data;
        } else {
            throw new Error({data, status})
        }
    }

    /**
     * List entities
     * @param {object} params 
     */
    async list(params = {}) {
        const url = `${this.baseUrl}`

        const { data, status } = await axios.get(url, params)

        if(status === 200 && data) {
            return data;
        } else {
            throw new Error({data, status})
        }
    }

    /**
     * Create entity
     * @param {object} entity 
     */
    async create(entity) {
        if (!entity) return;

        const url = `${this.baseUrl}`

        const { data, status } = await axios.post(url, entity, { json: true })

        if(status === 200 && data) {
            return data;
        } else {
            throw new Error({data, status})
        }
    }

    /**
     * Update entity
     * @param {object} oldEntity 
     * @param {object} newEntity 
     */
    async update(oldEntity, newEntity) {
        if (!oldEntity || !newEntity) return;

        const patches = compare(oldEntity, newEntity);
        if(isEmpty(patches)) return newEntity;

        const url = `${this.baseUrl}/${oldEntity.reference}`

        const { data, status } = await axios.patch(url, patches)

        if(status === 200 && data) {
            return data;
        } else {
            throw new Error({data, status})
        }
    }
}