import axios from 'axios'
import configs from '../configs'

export const api = axios.create({
    baseURL: configs.CONTRACT_KIT_URI,
    headers: {
        'Content-Type': 'application/json'
    },
})