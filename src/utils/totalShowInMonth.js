export function totalMonth(newList, object) {
  let total = 0;
  newList.map((item) => {
    if (item) {
      total += item.showInMonth;
    }
  });
  const newObject = {
    ...object,
    totalShowInMonth: total,
  };
  return newObject;
}
