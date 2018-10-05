let { createReadStream } = require('fs'),
  parse = require('csv-parse');

module.exports = (path) => {
  return new Promise((resolve, reject) => {
    let keys = [], result = [];
    createReadStream(path)
    .pipe(parse({delimiter: ','}))
    .on('data', async (row) => {
      if (keys.length === 0) {
        for (let key of row) keys.push(key.toLowerCase());
      } else {
        let object = {};
        for (let [index, key] of keys.entries()) object[key] = row[index];
        result.push(object);
      };
    })
    .on('end', async () => {
      resolve(result);
    });
  });
};
