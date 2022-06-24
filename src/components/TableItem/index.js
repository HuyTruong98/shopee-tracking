import { forwardRef } from 'react';
import Pagination from '../Pagination';
import ChangeEntries from './changeEntries/changeEntries';
import RenderProduct from './data/renderProduct';
import RenderTableToTal from './data/renderTableTotal';
import tableHeads from './data/tableHeads';
import SearchTable from './searchTable/searchTable';

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
    totalTable,
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
          <ChangeEntries handleChangeLimit={handleChangeLimit} />
          <div className="ml-2 mt-2">entries</div>
        </div>
        <div className="search-item-show">
          <SearchTable handleChangeList={handleChangeList} ref={ref} />
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
              <RenderTableToTal totalTable={totalTable} />
            </thead>
          </table>
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
              <RenderProduct listProduct={listProduct} />
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
