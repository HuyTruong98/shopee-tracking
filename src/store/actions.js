import { SET_USER_LOGIN, SET_USER_LOGOUT } from './constants';

export const setUserLogin = payload => ({
  type: SET_USER_LOGIN,
  payload,
});

export const setUserLogout = payload => ({
  type: SET_USER_LOGOUT,
  payload,
});
