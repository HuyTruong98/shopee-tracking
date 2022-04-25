import axiosClient from './ApiAxiosClient';

const getUser = {
  get: (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url).then((res) => {
      return res;
    });
  },
};

export default getUser;
