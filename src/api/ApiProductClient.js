import axiosClient from './ApiAxiosClient';
import queryString from 'query-string';

const productsApi = {
  searchItem: (params) => {
    const resource = '/shopee-tracking';
    const query = queryString.stringify(params);
    return axiosClient.post(resource, { query }).then((res) => {
      return res;
    });
  },
};

export default productsApi;
