/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState,useRef } from 'react';
import productsApi from '../../api/ApiProductClient';
import SearchBox from '../../components/SearchBox';
import TableItem from '../../components/TableItem';
import useLoading from '../../hooks/userLoading';

function HomePage() {
  const isFirst = useRef(true);
  const [showLoading, hideLoading] = useLoading();
  const [listItems, setListItems] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage,setCurrentPage] = useState(1);
  const [params, setParams] = useState({
    by: 'relevancy',
    limit: 10,
    newest: 0,
    order: 'desc',
    page_type: 'search',
    scenario: 'PAGE_GLOBAL_SEARCH',
    version: 2,
    keyword: '',
  });

  const onSetParams = (data) => {
    setParams((prevState)=>(
      {
        ...prevState,
        ...data
      }
    ))
  }

  const onChangeCurrentPage = (tempPage) => {
    const page = tempPage.selected + 1;
    console.log(page)
    const newest = page === 1 ? 0 : page * 60;

    onSetParams({newest});
    setCurrentPage(page+1)
  }

  const onSearchProducts = async({keyword}) => {
    const newParams = keyword !== null ? {
      ...params,
      keyword
    }:params
    
    setParams(newParams)

    try {
      showLoading();
      const response = await productsApi.searchItem(newParams);
      setListItems(response.items);
      setPageCount(response.total_count/newParams.limit);
      hideLoading();
    } catch (error) {
      showLoading();
      console.log('Failed to Fetch Product', error);
    }
  }

  useEffect(()=>{
    if(isFirst.current){
      isFirst.current = false;
    }else{
      onSearchProducts({keyword:null})
    }
  },[currentPage])


  return (
    <>
      <SearchBox onSearchProducts={onSearchProducts} />
      <TableItem
        listItems={listItems}
        onSetParams={onSetParams}
        pageCount={pageCount}
        onChangeCurrentPage={onChangeCurrentPage}
      />
    </>
  );
}

export default HomePage;
