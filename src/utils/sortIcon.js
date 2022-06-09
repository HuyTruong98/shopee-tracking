/* eslint-disable array-callback-return */
export function iconSortObject(icons, field) {
  const newIcons = { ...icons };
  Object.keys(newIcons).map((key) => {
    if (key === field) {
      newIcons[key] = newIcons[key] === 0 ? 1 : (newIcons[key] === 1 ? 2 : 1);
    } else {
      newIcons[key] = 0;
    }
  });
  return newIcons;
}
