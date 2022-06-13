import { toast } from 'react-toastify';
import axiosClient from './ApiAxiosClient';

const login = {
  loginUser: (params) => {
    const resource = '/auth/login';
    return axiosClient.post(resource, params).then((res) => {
      if (res)
        toast.success('Login Sucessfully !', {
          position: toast.POSITION.TOP_RIGHT,
        });
      localStorage.setItem('USER', JSON.stringify(res.data.user));
      localStorage.setItem('ACCESSTOKEN', res.data.tokens.access.token);
      localStorage.setItem('REFRESHTOKEN', res.data.tokens.refresh.token);
      return res?.data && res?.data?.user;
    });
  },
  logoutUser: (params) => {
    const resource = '/auth/logout';
    const Token = { refreshToken: params };
    return axiosClient.post(resource, Token).then((res) => {
      if (res)
        toast.success('Log Out Sucessfully !', {
          position: toast.POSITION.TOP_RIGHT,
        });
      localStorage.removeItem('USER');
      localStorage.removeItem('ACCESSTOKEN');
      localStorage.removeItem('REFRESHTOKEN');
    });
  },
};

export default login;
