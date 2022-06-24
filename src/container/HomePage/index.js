/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productsApi from '../../api/ApiProductClient';
import SearchBox from '../../components/SearchBox';
import TableItem from '../../components/TableItem';
import { ICON_SORT, QUERY_PARAMS } from '../../configs';
import useLoading from '../../hooks/userLoading';
import r from '../../routes/routes';
import { arraySort } from '../../utils/array';
import { duplicatesId } from '../../utils/duplicates';
import { filterIconSort } from '../../utils/fiterIconSort';
import { pagination } from '../../utils/pagination';
import { searchInTable } from '../../utils/searchInTable';
import { showListProduct } from '../../utils/showListProduct';
import { iconSortObject } from '../../utils/sortIcon';

function HomePage() {
  const isFirst = useRef(true);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [showLoading, hideLoading] = useLoading();
  const [listProduct, setLisProduct] = useState([]);
  const [listSearchItem, setListSearchItem] = useState([]);
  const [listSearchProduct, setListSearchProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitProducts, setLimitProducts] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [totalTable, setTotalTable] = useState({});
  const [filter, setFilter] = useState(QUERY_PARAMS);
  const [iconSort, setIconSort] = useState(ICON_SORT);

  function onChangeCurrentPage(tempPage) {
    setCurrentPage(tempPage.selected + 1);
  }

  function onSetLimitProducts(value) {
    setLimitProducts(value);
  }

  function onFilter(data) {
    setFilter((prevFilter) => ({ ...prevFilter, ...data }));
    inputRef.current.value = '';
    setListSearchProduct([]);
  }

  function onChangeListSearch(value) {
    if (value !== '') {
      const searchProduct = searchInTable(listSearchItem, value);
      setListSearchProduct([...searchProduct]);
    } else {
      setListSearchProduct([]);
    }
  }

  const onSorting = (value) => {
    const newIconSorts = iconSortObject(iconSort, value);
    setIconSort(newIconSorts);
    const newIconSort = filterIconSort(newIconSorts, value);
    const sorted = arraySort(listSearchItem, newIconSort, value);
    setListSearchItem([...sorted]);
  };

  //reset page về 0
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
    } else {
      setCurrentPage(1);
    }
  }, [limitProducts]);

  useEffect(() => {
    if (filter.keyword !== '') {
      const idBear = JSON.parse(localStorage.getItem('USER'));
      const getProductSearch = async () => {
        try {
          showLoading();
          const response = await productsApi.searchItem(filter, idBear.id);
          const newList = showListProduct(response.data);
          const arrRemoveDuplicate = duplicatesId(newList);
          setListSearchItem(arrRemoveDuplicate);
          setTotalTable(response.total);
          hideLoading();
        } catch (error) {
          showLoading();
          console.log('Failed to Fetch Product', error);
          navigate(r.LOGIN_PAGE);
          hideLoading();
        }
      };
      getProductSearch();
    }
  }, [filter]);

  useEffect(() => {
    if (listSearchItem.length > 0) {
      const newPagination = pagination(
        listSearchItem,
        listSearchProduct,
        currentPage,
        limitProducts
      );
      setPageCount(newPagination.page);
      setLisProduct(newPagination.newArr);
    }
  }, [currentPage, listSearchItem, limitProducts, listSearchProduct]);
  return (
    <>
      <SearchBox onFilter={onFilter} />
      <TableItem
        listProduct={listProduct}
        onChangeCurrentPage={onChangeCurrentPage}
        onChangeListSearch={onChangeListSearch}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
        currentPage={currentPage}
        onSetLimitProducts={onSetLimitProducts}
        ref={inputRef}
        onSorting={onSorting}
        iconSort={iconSort}
        totalTable={totalTable}
      />
    </>
  );
}

export default HomePage;
