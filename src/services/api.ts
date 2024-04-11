import axios from 'axios';
import { parseCookies } from 'nookies';

const { 'nextauth.token': token } = parseCookies();

const api = axios.create({
    baseURL: 'http://localhost:8000/',
});
if(token){
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export default api;