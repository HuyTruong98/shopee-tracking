/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { forwardRef } from 'react';
import { APP_API_IMAGE } from '../../configs';
import { convertPrice } from '../../utils/string';
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
    onSorting,
    iconSort,
  },
  ref
) {
  function handleChangeLimit(e) {
    const number = Number(e.target.value);
    onSetLimitProducts(number);
  }

  function handleChangeList(e) {
    onChangeListSearch(e.target.value);
  }

  function RenderTableHeads() {
    return tableHeads.map((tableHead, tableHeadKey) => {
      return (
        <th
          key={tableHeadKey}
          onClick={() => (tableHead.isSorting ? onSorting(tableHead.type) : {})}
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
  }

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
                    <td>{itemProduct.name}</td>
                    <td>
                      {convertPrice(
                        itemProduct.price,
                        itemProduct.currency,
                        true
                      )}
                    </td>
                    <td>{itemProduct.discount}</td>
                    <td>{itemProduct.sold}</td>
                    <td>{itemProduct.stock}</td>
                    <td>{itemProduct.showInMonth}</td>
                    <td>{itemProduct.showFirstPost}</td>
                    <td>
                      {convertPrice(
                        itemProduct.showRevenue,
                        itemProduct.currency,
                      )}
                    </td>
                    <td>{itemProduct.cmt_count}</td>
                    <td>{itemProduct.liked_count}</td>
                    <td>{Math.ceil(itemProduct.rating_star)}</td>
                    <td>
                      <img
                        src={`${APP_API_IMAGE}/${itemProduct.image}`}
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
