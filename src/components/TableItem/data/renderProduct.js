import { APP_API_IMAGE } from '../../../configs';
import { convertPrice } from '../../../utils/string';

function RenderProduct({ listProduct }) {
  return (
    <>
      {listProduct.map((itemProduct, indexProduct) => {
        return (
          <tr key={indexProduct}>
            <td>{indexProduct + 1}</td>
            <td>{itemProduct.name}</td>
            <td>
              {convertPrice(itemProduct.price, itemProduct.currency, true)}
            </td>
            <td>{itemProduct.discount}</td>
            <td>{itemProduct.historical_sold}</td>
            <td>{itemProduct.stock}</td>
            <td>{itemProduct.sold}</td>
            <td>{itemProduct.showFirstPost}</td>
            <td>
              {convertPrice(itemProduct.showRevenue, itemProduct.currency)}
            </td>
            <td>{itemProduct.cmt_count}</td>
            <td>{itemProduct.liked_count}</td>
            <td>{parseFloat(itemProduct.rating_star).toFixed(2)}</td>
            <td>
              <img
                src={`${APP_API_IMAGE}/${itemProduct.image}`}
                style={{ width: '50px', height: '50px' }}
              />
            </td>
            <td>
              <a
                href={`https://shopee.vn/item-i.${itemProduct.shopid}.${itemProduct.itemid}`}
                target="_blank"
                rel="noreferrer"
              >
                Xem
              </a>
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default RenderProduct;
