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

// axiosClient.interceptors.response.use(
//   (response) => {
//     if (response && response.data) {
//       return response.data;
//     }
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       console.log(error);
//       <Navigate to="/" replace />;
//       // store.dispatch();
//       // dispatch logout
//     }
//     // Handle errors
//     throw error;
//   }
// );

export default axiosClient;
