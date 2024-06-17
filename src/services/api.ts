import axios from 'axios';
import { parseCookies } from 'nookies';

const { 'nextauth.token': token } = parseCookies();

const baseURL = `http://${process.env.NEXT_PUBLIC_BACK_HOST || 'localhost'}:8000`;

console.log(`Using backend host: ${baseURL}`);

const api = axios.create({
    baseURL: baseURL,
});
if(token){
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export default api;
