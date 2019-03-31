const calc = require("../utils/calc");
const findNodeModulesFolders = require("../utils/findNodeModulesFolders");

const scan = args => {
  // main part
  let path = args.path || process.cwd();
  const nm_folders = findNodeModulesFolders(path);
  const result = calc(nm_folders);

  // preparing process.stdout.write
  const numberOfProjects = result.length;
  let totalSize = 0;
  for (let entry of result) {
    totalSize += entry.size;
  }
  let displaySize =
    totalSize > 1000000
      ? `${(totalSize / 1000000).toFixed(2)} MB`
      : `${(totalSize / 1000).toFixed(2)} kB`;
  const positiveReply = `You have ${numberOfProjects} ${
    numberOfProjects === 1 ? "project" : "projects"
  } with node_modules with a total size of ${displaySize}.`;
  const negativeReply = "There are no node_modules folders here.";
  process.stdout.write(numberOfProjects ? positiveReply : negativeReply);
  process.stdout.write("\n");
};

module.exports = scan;
