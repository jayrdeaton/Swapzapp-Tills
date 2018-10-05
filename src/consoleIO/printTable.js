let util = require('util'),
  exec = util.promisify(require('child_process').exec);

module.exports = async (proto, objects) => {
  // proto has column overrides
  // var { stdout, stderr } = await exec('tput rmam');
  // cell max height
  // cell max width

  let width = 20;
  // Header
  for (let key of Object.keys(proto)) {
    while (key.length < width) key += ' ';
    process.stdout.write(key);
  };
  process.stdout.write('\n');
  // Margin
  for (let key of Object.keys(proto)) {
    let line = '';
    while (line.length < key.length) line += '-';
    while (line.length < width) line += ' ';
    process.stdout.write(line);
  };
  process.stdout.write('\n');
  // Body
  for (let object of objects) {
    for (let key of Object.keys(proto)) {
      let value = String(object[key]);
      if (value.length > width) {
        while (value.length > width - 3) value = value.slice(0, -1);
        value += '...';
      };
      while (value.length < width) value += ' ';
      process.stdout.write(value);
    };
    process.stdout.write('\n');
  };

  // var { stdout, stderr } = await exec('tput smam');

};
