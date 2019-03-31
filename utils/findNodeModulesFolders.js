const fs = require("fs");
const PATH = require("path");

let nm_folders = [];

const findNodeModulesFolders = path => {
  const files = fs.readdirSync(path, { withFileTypes: true });
  const dirs = files
    .filter(file => {
      if (file.isDirectory() && file.name[0] !== ".") return file;
    })
    .map(file => {
      let tempPath = PATH.join(path, file.name);
      return { name: file.name, path: tempPath };
    });
  if (dirs.length !== 0) {
    for (let folder of dirs) {
      if (folder.name === "node_modules") {
        nm_folders.push(folder);
      } else {
        let newPath = PATH.join(path, folder.name);
        findNodeModulesFolders(newPath);
      }
    }
  }
  return nm_folders;
};

module.exports = findNodeModulesFolders;
