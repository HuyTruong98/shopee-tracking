/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import productsApi from '../../api/ApiProductClient';
import SearchBox from '../../components/SearchBox';
import TableItem from '../../components/TableItem';
import useLoading from '../../hooks/userLoading';

function HomePage() {
  const [term, setTerm] = useState('');
  const [filteredTerms, setFilteredTerms] = useState([]); //state cua search
  const timeOut = useRef(0);
  const isFirst = useRef(true);
  const [showLoading, hideLoading] = useLoading();
  const [listSearchItem, setListSearchItem] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(10);
  const [resetCurrentPage, setResetCurrentPage] = useState(false);
  const [pageCount, setPageCount] = useState(1); //hiển thị bao nhiêu trang paginate
  const [filter, setFilter] = useState({
    by: 'relevancy',
    limit: 100,
    newest: 100,
    order: 'desc',
    page_type: 'search',
    scenario: 'PAGE_GLOBAL_SEARCH',
    version: 2,
    keyword: '',
  });

  //thay đổi page
  function onChangeCurrentPage(tempPage) {
    setResetCurrentPage(false);
    const offSet = tempPage.selected * currentPage;
    const perPage = (tempPage.selected + 1) * currentPage;
    const newArr = listSearchItem.slice(offSet, perPage);
    setListProduct([...newArr]);
  }

  // tìm kiếm
  function onFilter(data) {
    setFilter((prevFilter) => ({ ...prevFilter, ...data }));
  }

  //hiển thị bao nhiêu trang paginate
  function showPageCount(number) {
    if (filter.keyword !== '') {
      const page = filter.limit / number;
      setPageCount(page);
      setResetCurrentPage(true);
    }
  }

  function onChangeListSearch(value) {
    setTerm(value);
  }

  useEffect(() => {
    if (filter.keyword !== '') {
      const getProductSearch = async () => {
        try {
          showLoading();
          const response = await productsApi.searchItem(filter);
          setListSearchItem(response.items);
          setPageCount(filter.limit / currentPage);
          setResetCurrentPage(true);
          hideLoading();
        } catch (error) {
          showLoading();
          console.log('Failed to Fetch Product', error);
        }
      };
      getProductSearch();
    }
  }, [filter]);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
    } else {
      clearTimeout(timeOut.current);
      timeOut.current = setTimeout(() => {
        const filteredItems = listProduct.filter((item) => {
          return item.item_basic.name
            .trim()
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .toString()
            .toLowerCase()
            .includes(
              term
                .trim()
                .normalize('NFD')
                .replace(/\p{Diacritic}/gu, '')
                .toString()
                .toLowerCase()
            );
        });
        setFilteredTerms(filteredItems);
      }, 300);
    }
  }, [term]);

  useEffect(() => {
    const offSet = (pageCount - 1) * currentPage;
    const perPage = pageCount * currentPage;
    const newArr = listSearchItem.slice(offSet, perPage);
    setListProduct(newArr);
  }, [currentPage, listSearchItem]);
  return (
    <>
      <SearchBox onFilter={onFilter} />
      <TableItem
        listProduct={listProduct}
        onChangeCurrentPage={onChangeCurrentPage}
        onChangeListSearch={onChangeListSearch}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
        showPageCount={showPageCount}
        resetCurrentPage={resetCurrentPage}
        term={term}
        filteredTerms={filteredTerms}
      />
    </>
  );
}

export default HomePage;
