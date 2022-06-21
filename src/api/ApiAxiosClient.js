import axios from 'axios';
import { APP_API } from '../configs';

const axiosClient = axios.create({
  baseURL: APP_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ACCESSTOKEN')
      ? localStorage.getItem('ACCESSTOKEN')
      : null;
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosClient;
