/* eslint-disable array-callback-return */
import _ from 'lodash';

export const arraySort = (items, iconSort, fieldSort) => {
  switch (fieldSort) {
    case 'name':
      if (iconSort[fieldSort] === 1) {
        return _.orderBy(
          items,
          [
            (a) => a.name.toLowerCase().replaceAll('[\\-\\+\\.\\^:,]', ''),
            'name',
          ],
          ['asc']
        );
      } else {
        return _.orderBy(
          items,
          [
            (a) => a.name.toLowerCase().replaceAll('[\\-\\+\\.\\^:,]', ''),
            'name',
          ],
          ['desc']
        );
      }
    case 'price':
      if (iconSort[fieldSort] === 1) {
        return items.sort((a, b) => {
          return parseFloat(a.price) - parseFloat(b.price);
        });
      } else {
        return items.sort((a, b) => {
          return parseFloat(b.price) - parseFloat(a.price);
        });
      }
    case 'discount':
      if (iconSort[fieldSort] === 1) {
        return items.sort((a, b) => {
          const percent = '%';
          const indexA = a.discount !== null ? a.discount.indexOf(percent) : 0;
          const indexB = b.discount !== null ? b.discount.indexOf(percent) : 0;
          const numberA = Number(
            a.discount !== null ? a.discount.slice(0, indexA) : 0
          );
          const numberB = Number(
            b.discount !== null ? b.discount.slice(0, indexB) : 0
          );
          return parseFloat(numberA) - parseFloat(numberB);
        });
      } else {
        return items.sort((a, b) => {
          const percent = '%';
          const indexA = a.discount !== null ? a.discount.indexOf(percent) : 0;
          const indexB = b.discount !== null ? b.discount.indexOf(percent) : 0;
          const numberA = Number(
            a.discount !== null ? a.discount.slice(0, indexA) : 0
          );
          const numberB = Number(
            b.discount !== null ? b.discount.slice(0, indexB) : 0
          );
          return parseFloat(numberB) - parseFloat(numberA);
        });
      }
    case 'sold':
      if (iconSort[fieldSort] === 1) {
        return items.sort((a, b) => {
          const soldA = a.historical_sold;
          const soldB = b.historical_sold;
          return parseFloat(soldA) - parseFloat(soldB);
        });
      } else {
        return items.sort((a, b) => {
          const soldA = a.historical_sold;
          const soldB = b.historical_sold;
          return parseFloat(soldB) - parseFloat(soldA);
        });
      }
    case 'stock':
      if (iconSort[fieldSort] === 1) {
        return items.sort((a, b) => {
          const stockA = a.stock;
          const stockB = b.stock;
          return parseFloat(stockA) - parseFloat(stockB);
        });
      } else {
        return items.sort((a, b) => {
          const stockA = a.stock;
          const stockB = b.stock;
          return parseFloat(stockB) - parseFloat(stockA);
        });
      }
    case 'showInMonth':
      if (iconSort[fieldSort] === 1) {
        return items.sort((a, b) => parseFloat(a.sold) - parseFloat(b.sold));
      } else {
        return items.sort((a, b) => parseFloat(b.sold) - parseFloat(a.sold));
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
          (a, b) => parseFloat(a.cmt_count) - parseFloat(b.cmt_count)
        );
      } else {
        return items.sort(
          (a, b) => parseFloat(b.cmt_count) - parseFloat(a.cmt_count)
        );
      }
    case 'liked':
      if (iconSort[fieldSort] === 1) {
        return items.sort(
          (a, b) => parseFloat(a.liked_count) - parseFloat(b.liked_count)
        );
      } else {
        return items.sort(
          (a, b) => parseFloat(b.liked_count) - parseFloat(a.liked_count)
        );
      }
    case 'rating':
      if (iconSort[fieldSort] === 1) {
        return items.sort(
          (a, b) =>
            parseFloat(a.rating_star).toFixed(2) -
            parseFloat(b.rating_star).toFixed(2)
        );
      } else {
        return items.sort(
          (a, b) =>
            parseFloat(b.rating_star).toFixed(2) -
            parseFloat(a.rating_star).toFixed(2)
        );
      }
    default:
      break;
  }
};
