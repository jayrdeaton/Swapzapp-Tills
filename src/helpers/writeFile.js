let { promisify } = require('util'),
  fs = require('fs'),
  writeFile = promisify(fs.writeFile);

module.exports = async(path, data) => {
  return await writeFile(path, data, 'utf8');
};
