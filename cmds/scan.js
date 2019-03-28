const fs = require("fs");

const scan = args => {
  let path = args.path || process.cwd();
  console.log(`Scanning ${path}`);
  fs.readdir(path, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    // console.log(files);
    for (let entry of files) {
      if (entry.isDirectory() && entry.name === "node_modules") {
        console.log(entry.isDirectory(), entry.name);
      }
    }
  });
};

module.exports = scan;
