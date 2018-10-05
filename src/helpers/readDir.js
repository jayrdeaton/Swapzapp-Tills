let { readdir } = require('fs');

module.exports = (path) => {
  return new Promise((resolve, reject) => {
    readdir(path, (err, data) => {
      if (err) return reject(err);
      data = data.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
      resolve(data);
    });
  });
};
