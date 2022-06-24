import React from 'react';

function ChangeEntries({ handleChangeLimit }) {
  return (
    <>
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
    </>
  );
}

export default ChangeEntries;
