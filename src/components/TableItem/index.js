/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { APP_API_IMAGE } from '../../configs';
import Pagination from '../Pagination';

function TableItem({ listSearchItem, onFilter, paginate,onChangeCurrentPage }) {
  function handleChangePrice(value) {
    const number = value.toString();
    return number.slice(0, 7).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  function handleChangeLimit(e) {
    const number = Number(e.target.value);
    onFilter({limit: number, newest: 0});
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
          />
        </div>
      </div>
      <div style={{ width: '100%', display: 'flex' }}>
        <div style={{ width: '1%' }} />
        <div style={{ width: '98%' }}>
          <table
            id="example"
            className="table table-striped table-bordered"
            style={{ width: '100%', marginTop: '30px' }}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Giảm</th>
                <th>Đã bán</th>
                <th>Trong tháng</th>
                <th>Tồn</th>
                <th>Số ngày đăng</th>
                <th>Doanh thu</th>
                <th>Comment</th>
                <th>Liked</th>
                <th>Rating</th>
                <th>Hình ảnh</th>
                <th>Link Shopee</th>
                <th>Buff</th>
              </tr>
            </thead>
            <tbody>
              {listSearchItem.map((itemProduct, indexProduct) => {
                return (
                  <tr key={indexProduct}>
                    <td>{indexProduct + 1}</td>
                    <td>{itemProduct.item_basic.name}</td>
                    <td>{handleChangePrice(itemProduct.item_basic.price)}</td>
                    <td></td>
                    <td>25</td>
                    <td>1</td>
                    <td>1</td>
                    <td>11314 </td>
                    <td>36,502,675 </td>
                    <td>14</td>
                    <td>16</td>
                    <td>0.9</td>
                    <td>
                      <img
                        src={`${APP_API_IMAGE}/${itemProduct.item_basic.image}`}
                        style={{ width: '50px', height: '50px' }}
                      />
                    </td>
                    <td>
                      <a
                        href="https://shopee.vn/item-i.85907828.5549563273"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Xem
                      </a>
                    </td>
                    <td>buff</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination paginate={paginate} onChangeCurrentPage={onChangeCurrentPage}/>
        </div>
        <div style={{ width: '1%' }} />
      </div>
    </>
  );
}

export default TableItem;
