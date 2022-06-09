/* eslint-disable array-callback-return */
export function filterIconSort(sortedIcon, field) {
  const sort = {};
  Object.keys(sortedIcon).filter((key) => {
    if (key === field && sortedIcon[key] !== 0) {
      sort[key] = sortedIcon[key]
    }
  });
  return sort;
}
