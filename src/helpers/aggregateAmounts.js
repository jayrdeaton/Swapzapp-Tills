module.exports = (objects) => {
  let result = {
    start_at: undefined,
    end_at: undefined,
    users: [],
    audit: 0,
    purchase: 0,
    sale: 0,
    transfer: 0,
    adjustment: 0
  };

  result.start_at = new Date(objects[0]['created at']).toLocaleDateString();
  result.end_at = new Date(objects[objects.length - 1]['created at']).toLocaleDateString();

  for (let object of objects) {
    if (!result.users.includes(object['user name'])) result.users.push(object['user name'])
    if (object.title.startsWith('Audit')) {
      result.audit += parseInt(object.amount);
    } else if (object.title.startsWith('Purchase')) {
      result.purchase += parseInt(object.amount);
    } else if (object.title.startsWith('Sale')) {
      result.sale += parseInt(object.amount);
    } else if (object.title.startsWith('Purge')) {
      // result.purge += parseInt(object.amount);
    } else if (object.title.startsWith('Transfer')) {
      result.transfer += parseInt(object.amount);
    } else {
      result.adjustment += parseInt(object.amount);
    };
  };

  result.audit = (result.audit / 100).toFixed(2);
  result.purchase = (result.purchase / 100).toFixed(2);
  result.sale = (result.sale / 100).toFixed(2);
  result.transfer = (result.transfer / 100).toFixed(2);
  result.adjustment = (result.adjustment / 100).toFixed(2);

  return result;
};
