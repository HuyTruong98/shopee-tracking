export function searchInTable(arr, value) {
  const newArr = arr.filter(
    (item) =>
      item.name.trim().toLowerCase().indexOf(value.trim().toLowerCase()) !== -1
  );
  return newArr;
}
