/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import getUser from '../../api/ApiUserClient';
import SearchBox from '../../components/SearchBox';
import TableItem from '../../components/TableItem';
import { useStore, actions } from '../../store';

function HomePage(props) {
  const [listSearchItem, setListSearchItem] = useState([]);
  const [state, dispatch] = useStore();
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('USER')) && JSON.parse(localStorage.getItem('USER')).id) {
      const account_current = JSON.parse(localStorage.getItem('USER'))
        ? JSON.parse(localStorage.getItem('USER')).id
        : {};
      const getUserById = async () => {
        const response = await getUser.get(account_current);
        const newResponse = {
          ...response,
          status: true,
        };
        dispatch(actions.setUserLogin(newResponse));
      };
      getUserById();
    }
  }, []);
  return (
    <>
      <SearchBox setListSearchItem={setListSearchItem} />
      <TableItem listSearchItem={listSearchItem} />
    </>
  );
}

export default HomePage;
