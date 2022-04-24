import React, { useState } from 'react';
import SearchBox from '../../components/SearchBox';
import TableItem from '../../components/TableItem';

function HomePage(props) {
  const [listSearchItem, setListSearchItem] = useState([]);
  console.log(listSearchItem);
  return (
    <>
      <SearchBox setListSearchItem={setListSearchItem} />
      <TableItem listSearchItem={listSearchItem} />
    </>
  );
}

export default HomePage;
