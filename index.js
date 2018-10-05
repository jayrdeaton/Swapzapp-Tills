let cosmetic = require('cosmetic'),
  { existsSync, statSync } = require('fs'),
  { basename, extname, join } = require('path'),
  { consoleIO, helpers } = require('./src'),
  { printError, prompt, readline } = consoleIO,
  { aggregateAmounts, readDir, readFile } = helpers;

let run = async(args) => {
  console.log(`Welcome to ${cosmetic.cyan('Swapzapp-Tills')}`);
  let dir = await prompt('Directory: ');
  // let dir = "/Users/jaydeaton/Downloads/Tills"
  let paths = await readDir(dir);
  for (let path of paths) {
    if (extname(path) !== '.csv') {
      printError(new Error(`${path} has incorrect extension`));
      continue;
    };
    console.log(basename(path, '.csv'));
    let data = await readFile(join(dir, path))
    let amounts = aggregateAmounts(data);
    console.log(amounts);
  };
  process.exit();
};

process.on('exit', () => {
  readline.close();
  process.stdin.destroy();
});

run().catch((err) => {
  printError(err);
});
