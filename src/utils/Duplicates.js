export function duplicatesId(arr) {
  const duplicateId = new Set();
  const filterArr = arr.filter((item) => {
    const itemId = item.itemid;
    const duplicate = duplicateId.has(itemId);
    duplicateId.add(itemId);
    return !duplicate;
  });
  return filterArr;
}
