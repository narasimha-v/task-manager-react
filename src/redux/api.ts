import axios from 'axios';
import { API_BASE_URL } from './getEnv';

const defaultRequestHeaders = {
	'Content-Type': 'application/json',
	'Device-Type': 'desktop'
};

export { defaultRequestHeaders };

const api = axios.create({
	baseURL: API_BASE_URL,
	headers: defaultRequestHeaders,
	withCredentials: true
});

export default api;
