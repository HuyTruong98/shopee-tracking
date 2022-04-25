import axiosClient from './ApiAxiosClient';

const login = {
  loginUser: (params) => {
    const resource = '/auth/login';
    return axiosClient.post(resource, params).then((res) => {
      if (res) {
        localStorage.setItem('USER', JSON.stringify(res.user));
        localStorage.setItem('ACCESSTOKEN', res.tokens.access.token);
        localStorage.setItem('REFRESHTOKEN', res.tokens.refresh.token);
        return res && res.user;
      }
    });
  },
  logoutUser: (params) => {
    const resource = '/auth/logout';
    const Token = { refreshToken: params };
    return axiosClient.post(resource, Token).then((res) => {
      if (res) {
        localStorage.removeItem('USER');
        localStorage.removeItem('ACCESSTOKEN');
        localStorage.removeItem('REFRESHTOKEN');
      }
    })
  },
};

export default login;
