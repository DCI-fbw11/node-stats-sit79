const fs = require("fs");
const PATH = require("path");

let result = [];

const calc = nm_folders => {
  for (let entry of nm_folders) {
    let sum = 0;
    calcFilesAndSubfolders(entry.path);
    for (let entry of result) {
      sum += entry.totalFileSize;
    }
    entry.size = sum;
    result = [];
  }
  return nm_folders;
};

const calcFilesAndSubfolders = path => {
  const filesAndFolders = fs.readdirSync(path, { withFileTypes: true });
  const files = [];
  let allFiles = 0;
  const folders = [];
  if (filesAndFolders.length !== 0) {
    for (let item of filesAndFolders) {
      // Visibility of files/folders disregarded (".DS_Store" problem)
      if (item.isDirectory()) {
        folders.push(item);
      } else if (item.isFile()) {
        files.push(item);
      }
    }
    if (files.length !== 0) {
      for (let file of files) {
        let newPath = PATH.join(path, file.name);
        let stats = fs.statSync(newPath);
        allFiles += stats.size;
      }
    }
    let tempRes = { path, totalFileSize: allFiles, subFolders: folders.length };
    result.push(tempRes);
    if (folders.length !== 0) {
      for (let folder of folders) {
        let newPath = PATH.join(path, folder.name);
        calcFilesAndSubfolders(newPath);
      }
    } else {
      return;
    }
  }
};

module.exports = calc;
