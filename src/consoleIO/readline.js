let { createInterface } = require('readline'),
  readline = createInterface({
    input: process.stdin,
    output: process.stdout
  });

module.exports = readline;
