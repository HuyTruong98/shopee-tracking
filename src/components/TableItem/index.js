/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-duplicate-props */
import moment from 'moment';
import React, { forwardRef } from 'react';
import { APP_API_IMAGE } from '../../configs';
import Pagination from '../Pagination';
import tableHeads from './data/tableHeads';

function TableItem(
  {
    listProduct,
    onChangeCurrentPage,
    onChangeListSearch,
    pageCount,
    currentPage,
    onSetLimitProducts,
    sorting,
    iconSort,
  },
  ref
) {
  function showPrice(value) {
    const number = value.price.toString();
    return number
      .slice(0, 7)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      .concat(value.currency);
  }

  function showRevenue(value) {
    const revenue = value.showRevenue
    return revenue
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      .concat(value.item_basic.currency);
  }

  function handleChangeLimit(e) {
    const number = Number(e.target.value);
    onSetLimitProducts(number);
  }

  function handleChangeList(e) {
    onChangeListSearch(e.target.value);
  }

  const RenderTableHeads = () => {
    return tableHeads.map((tableHead, tableHeadKey) => {
      return (
        <th
          key={tableHeadKey}
          onClick={() => (tableHead.isSorting ? sorting(tableHead.type) : {})}
          className={
            tableHead.isSorting
              ? iconSort[tableHead.type] !== 0
                ? iconSort[tableHead.type] === 1
                  ? 'ascending'
                  : 'descending'
                : ''
              : ''
          }
        >
          {tableHead.title}
        </th>
      );
    });
  };
  return (
    <>
      <div className="title-page">Shopee Tracking</div>
      <div className="entries-search">
        <div className="entries">
          <div className="mr-2 mt-2">Show</div>
          <select
            name="example_length"
            aria-controls="example"
            class="form-control input-sm"
            onChange={handleChangeLimit}
            defaultValue="10"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <div className="ml-2 mt-2">entries</div>
        </div>
        <div className="search-item-show">
          <input
            type="search"
            placeholder="Search"
            aria-label="Search"
            className="form-control"
            onChange={handleChangeList}
            ref={ref}
          />
        </div>
      </div>
      <div style={{ width: '100%', display: 'flex' }}>
        <div style={{ width: '1%' }} />
        <div style={{ width: '98%' }}>
          <table
            id="dtOrderExample"
            class="table table-striped table-bordered table-sm"
            cellspacing="0"
            width="100%"
            style={{ width: '100%', marginTop: '30px' }}
          >
            <thead>
              <tr>
                <RenderTableHeads />
              </tr>
            </thead>
            <tbody>
              {listProduct.map((itemProduct, indexProduct) => {
                return (
                  <tr key={indexProduct}>
                    <td>{indexProduct + 1}</td>
                    <td>{itemProduct.item_basic.name}</td>
                    <td>{showPrice(itemProduct.item_basic)}</td>
                    <td>{itemProduct.item_basic.discount}</td>
                    <td>{itemProduct.item_basic.sold}</td>
                    <td>{itemProduct.item_basic.stock}</td>
                    <td>{itemProduct.showInMonth}</td>
                    <td>{itemProduct.showFirstPost}</td>
                    <td>{showRevenue(itemProduct)}</td>
                    <td>{itemProduct.item_basic.cmt_count}</td>
                    <td>{itemProduct.item_basic.liked_count}</td>
                    <td>
                      {Math.ceil(
                        itemProduct.item_basic.item_rating.rating_star
                      )}
                    </td>
                    <td>
                      <img
                        src={`${APP_API_IMAGE}/${itemProduct.item_basic.image}`}
                        style={{ width: '50px', height: '50px' }}
                      />
                    </td>
                    <td>
                      <a
                        href={`https://shopee.vn/item-i.${itemProduct.shopid}.${itemProduct.itemid}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Xem
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            pageCount={pageCount}
            onChangeCurrentPage={onChangeCurrentPage}
            currentPage={currentPage}
          />
        </div>
        <div style={{ width: '1%' }} />
      </div>
    </>
  );
}

export default forwardRef(TableItem);
