import React from 'react';

function RenderTableToTal({ totalTable }) {
  return (
    <>
      <tr style={{ textAlign: 'center' }}>
        <th>Tổng </th>
        <th>Trong tháng: {totalTable.sold ? totalTable.sold : 0}</th>
        <th>
          Đã bán: {totalTable.historical_sold ? totalTable.historical_sold : 0}
        </th>
        <th>Trong kho: {totalTable.stock ? totalTable.stock : 0}</th>
        <th>Like: {totalTable.liked_count ? totalTable.liked_count : 0}</th>
        <th>Comment: {totalTable.cmt_count ? totalTable.cmt_count : 0}</th>
        <th>
          Rating:{' '}
          {totalTable.rating_star ? totalTable?.rating_star.toFixed(2) : 0}
        </th>
      </tr>
    </>
  );
}

export default RenderTableToTal;
