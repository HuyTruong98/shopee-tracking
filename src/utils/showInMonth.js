import moment from 'moment';

export function showInMonth(dataCmt, response) {
  const newList = [];
  dataCmt.map((itemCmt) => {
    response.items.map((itemList) => {
      if (
        itemList?.shopid === itemCmt?.shopid &&
        itemList?.itemid === itemCmt?.itemid
      ) {
        const currentMonth = moment().format('MM/YYYY');
        const arrList =
          Array.isArray(itemCmt.data.ratings) &&
          itemCmt.data.ratings &&
          itemCmt.data.ratings.length > 0 &&
          itemCmt.data.ratings.filter(
            (x) =>
              moment(+x.ctime.toString().concat('000')).format('MM/YYYY') ===
              currentMonth
          );
        const date = itemList.item_basic.ctime.toString().concat('000');
        const pastDay = moment(+date).format('DD');
        const pastMonth = moment(+date).format('MM');
        const pastYear = moment(+date).format('YYYY');

        const presentDay = moment(new Date()).format('DD');
        const presentMonth = moment(new Date()).format('MM');
        const presentYear = moment(new Date()).format('YYYY');
        const a = moment([presentYear, presentMonth - 1, presentDay]);
        const b = moment([pastYear, pastMonth - 1, pastDay]);

        const strPrice = Number(
          itemList.item_basic.price.toString().slice(0, 7)
        );
        const revenue = strPrice * itemList.item_basic.sold;

        const newValue = {
          ...itemList,
          showInMonth: arrList
            ? Math.ceil(
                (itemList.item_basic.sold / itemList.item_basic.cmt_count) *
                  arrList.length
              )
            : 0,
          showFirstPost: a.diff(b, 'days'),
          showRevenue: revenue,
        };
        newList.push(newValue);
      }
    });
  });
  return newList;
}
