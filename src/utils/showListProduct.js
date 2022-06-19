import moment from 'moment';

export function showListProduct(response) {
  const newList = [];

  response.map((itemList) => {
    if (itemList) {
      const date = itemList.ctime.toString().concat('000');
      const pastDay = moment(+date).format('DD');
      const pastMonth = moment(+date).format('MM');
      const pastYear = moment(+date).format('YYYY');

      const presentDay = moment(new Date()).format('DD');
      const presentMonth = moment(new Date()).format('MM');
      const presentYear = moment(new Date()).format('YYYY');
      const a = moment([presentYear, presentMonth - 1, presentDay]);
      const b = moment([pastYear, pastMonth - 1, pastDay]);

      const revenue = itemList.price * itemList.sold;

      const newValue = {
        ...itemList,
        showFirstPost: a.diff(b, 'days'),
        showRevenue: revenue,
      };

      newList.push(newValue);
    }
  });
  return newList;
}
