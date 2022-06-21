/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productsApi from '../../api/ApiProductClient';
import SearchBox from '../../components/SearchBox';
import TableItem from '../../components/TableItem';
import { LOGIN_PAGE } from '../../configs';
import useLoading from '../../hooks/userLoading';
import { arraySort } from '../../utils/array';
import { DuplicatesId } from '../../utils/Duplicates';
import { filterIconSort } from '../../utils/fiterIconSort';
import { pagination } from '../../utils/pagination';
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
  const [filter, setFilter] = useState({
    by: 'relevancy',
    limit: 100,
    newest: 0,
    order: 'desc',
    page_type: 'search',
    scenario: 'PAGE_GLOBAL_SEARCH',
    version: 2,
    keyword: '',
  });
  const [iconSort, setIconSort] = useState({
    name: 0,
    price: 0,
    discount: 0,
    sold: 0,
    stock: 0,
    showRevenue: 0,
    comment: 0,
    liked: 0,
    rating: 0,
    priceRevenue: 0,
    showFirstPost: 0,
    showInMonth: 0,
  });

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
      const searchProduct = listSearchItem.filter(
        (item) =>
          item.name.trim().toLowerCase().indexOf(value.trim().toLowerCase()) !==
          -1
      );
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
          const arrRemoveDuplicate = DuplicatesId(newList);
          setListSearchItem(arrRemoveDuplicate);
          setTotalTable(response.total);
          hideLoading();
        } catch (error) {
          showLoading();
          console.log('Failed to Fetch Product', error);
          navigate(LOGIN_PAGE);
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
