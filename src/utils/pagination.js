export const pagination = (
  listSearchItem,
  listSearchProduct,
  currentPage,
  limitProducts
) => {
  const tempArr =
    listSearchProduct.length > 0 ? listSearchProduct : listSearchItem;
  const offset = (currentPage - 1) * limitProducts;
  const amountProducts = limitProducts * currentPage;
  const newArr = tempArr.slice(
    offset,
    amountProducts === 0 ? limitProducts : amountProducts
  );
  const page = tempArr.length / limitProducts;
  return { newArr: newArr, page: page };
};
