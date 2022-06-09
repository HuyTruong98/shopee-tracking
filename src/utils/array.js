/* eslint-disable array-callback-return */
import _ from 'lodash';

export const arraySort = (items, iconSort, fieldSort) => {
  console.log(fieldSort);
  switch (fieldSort) {
    case 'name':
      if (iconSort[fieldSort] === 1) {
        return _.orderBy(
          items,
          [
            (a) =>
              a.item_basic.name
                .toLowerCase()
                .replaceAll('[\\-\\+\\.\\^:,]', ''),
            'name',
          ],
          ['asc']
        );
      } else {
        return _.orderBy(
          items,
          [
            (a) =>
              a.item_basic.name
                .toLowerCase()
                .replaceAll('[\\-\\+\\.\\^:,]', ''),
            'name',
          ],
          ['desc']
        );
      }
    case 'price':
      if (iconSort[fieldSort] === 1) {
        return items.sort((a, b) => {
          const numberA = Number(a.item_basic.price.toString().slice(0, 7));
          const numberB = Number(b.item_basic.price.toString().slice(0, 7));

          return parseInt(numberA, 10) - parseInt(numberB, 10);
        });
      } else {
        return items.sort((a, b) => {
          const numberA = Number(a.item_basic.price.toString().slice(0, 7));
          const numberB = Number(b.item_basic.price.toString().slice(0, 7));

          return parseFloat(numberB) - parseFloat(numberA);
        });
      }
    case 'discount':
      if (iconSort[fieldSort] === 1) {
        return items.sort((a, b) => {
          const percent = '%';
          const indexA =
            a.item_basic.discount !== null
              ? a.item_basic.discount.indexOf(percent)
              : 0;
          const indexB =
            b.item_basic.discount !== null
              ? b.item_basic.discount.indexOf(percent)
              : 0;
          const numberA = Number(
            a.item_basic.discount !== null
              ? a.item_basic.discount.slice(0, indexA)
              : 0
          );
          const numberB = Number(
            b.item_basic.discount !== null
              ? b.item_basic.discount.slice(0, indexB)
              : 0
          );
          return parseFloat(numberA) - parseFloat(numberB);
        });
      } else {
        return items.sort((a, b) => {
          const percent = '%';
          const indexA =
            a.item_basic.discount !== null
              ? a.item_basic.discount.indexOf(percent)
              : 0;
          const indexB =
            b.item_basic.discount !== null
              ? b.item_basic.discount.indexOf(percent)
              : 0;
          const numberA = Number(
            a.item_basic.discount !== null
              ? a.item_basic.discount.slice(0, indexA)
              : 0
          );
          const numberB = Number(
            b.item_basic.discount !== null
              ? b.item_basic.discount.slice(0, indexB)
              : 0
          );
          return parseFloat(numberB) - parseFloat(numberA);
        });
      }
    case 'sold':
      if (iconSort[fieldSort] === 1) {
        return items.sort((a, b) => {
          const soldA = a.item_basic.sold;
          const soldB = b.item_basic.sold;
          return parseFloat(soldA) - parseFloat(soldB);
        });
      } else {
        return items.sort((a, b) => {
          const soldA = a.item_basic.sold;
          const soldB = b.item_basic.sold;
          return parseFloat(soldB) - parseFloat(soldA);
        });
      }
    case 'stock':
      if (iconSort[fieldSort] === 1) {
        return items.sort((a, b) => {
          const stockA = a.item_basic.stock;
          const stockB = b.item_basic.stock;
          return parseFloat(stockA) - parseFloat(stockB);
        });
      } else {
        return items.sort((a, b) => {
          const stockA = a.item_basic.stock;
          const stockB = b.item_basic.stock;
          return parseFloat(stockB) - parseFloat(stockA);
        });
      }
    case 'showInMonth':
      if (iconSort[fieldSort] === 1) {
        return items.sort(
          (a, b) => parseFloat(a.showInMonth) - parseFloat(b.showInMonth)
        );
      } else {
        return items.sort(
          (a, b) => parseFloat(b.showInMonth) - parseFloat(a.showInMonth)
        );
      }
    case 'showFirstPost':
      if (iconSort[fieldSort] === 1) {
        return items.sort(
          (a, b) => parseFloat(a.showFirstPost) - parseFloat(b.showFirstPost)
        );
      } else {
        return items.sort(
          (a, b) => parseFloat(b.showFirstPost) - parseFloat(a.showFirstPost)
        );
      }
    case 'priceRevenue':
      if (iconSort[fieldSort] === 1) {
        return items.sort(
          (a, b) => parseFloat(a.showRevenue) - parseFloat(b.showRevenue)
        );
      } else {
        return items.sort(
          (a, b) => parseFloat(b.showRevenue) - parseFloat(a.showRevenue)
        );
      }
    case 'comment':
      if (iconSort[fieldSort] === 1) {
        return items.sort(
          (a, b) =>
            parseFloat(a.item_basic.cmt_count) -
            parseFloat(b.item_basic.cmt_count)
        );
      } else {
        return items.sort(
          (a, b) =>
            parseFloat(b.item_basic.cmt_count) -
            parseFloat(a.item_basic.cmt_count)
        );
      }
    case 'liked':
      if (iconSort[fieldSort] === 1) {
        return items.sort(
          (a, b) =>
            parseFloat(a.item_basic.liked_count) -
            parseFloat(b.item_basic.liked_count)
        );
      } else {
        return items.sort(
          (a, b) =>
            parseFloat(b.item_basic.liked_count) -
            parseFloat(a.item_basic.liked_count)
        );
      }
    case 'rating':
      if (iconSort[fieldSort] === 1) {
        return items.sort(
          (a, b) =>
            parseFloat(Math.ceil(a.item_basic.item_rating.rating_star)) -
            parseFloat(Math.ceil(b.item_basic.item_rating.rating_star))
        );
      } else {
        return items.sort(
          (a, b) =>
            parseFloat(Math.ceil(b.item_basic.item_rating.rating_star)) -
            parseFloat(Math.ceil(a.item_basic.item_rating.rating_star))
        );
      }
    default:
      break;
  }
};
