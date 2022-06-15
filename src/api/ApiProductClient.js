import axiosClient from './ApiAxiosClient';
import queryString from 'query-string';
import { toast } from 'react-toastify';

const productsApi = {
  searchItem: (params, id) => {
    const resource = `/shopee-tracking/${id}`;
    const query = queryString.stringify(params);
    return axiosClient
      .post(resource, { query })
      .then((res) => {
        if (res) {
          return res && res.data;
        }
      })
      .catch((error) => {
        if (error) {
          toast.error('Get Data Failed!', {
            position: toast.POSITION.TOP_RIGHT,
          });
          localStorage.removeItem('USER');
          localStorage.removeItem('ACCESSTOKEN');
          localStorage.removeItem('REFRESHTOKEN');
        }
      });
  },

  cmtSearchItem: (value) => {
    const resource = '/shopee-tracking-cmt';
    const filter = {
      filter: 0,
      flag: 0,
      type: 0,
      limit: 59,
      itemid: value.itemid,
      shopid: value.shopid,
    };
    const query = queryString.stringify(filter);
    return axiosClient.post(resource, { query }).then((res) => {
      const newValue = {
        ...res.data,
        itemid: value.itemid,
        shopid: value.shopid,
      };
      return newValue;
    });
  },
};

export default productsApi;
