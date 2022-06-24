import React from 'react';

function SearchTable({ handleChangeList, ref }) {
  return (
    <>
      <input
        type="search"
        placeholder="Search"
        aria-label="Search"
        className="form-control"
        onChange={handleChangeList}
        ref={ref}
      />
    </>
  );
}

export default SearchTable;
