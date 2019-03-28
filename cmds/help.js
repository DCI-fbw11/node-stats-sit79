const menus = {
  main: `
    node-stats [command] <options>

    scan ............... scan a folder and its subfolders for node_modules
    help ............... show help menu for a command\n`,

  scan: `
    node-stats scan <options>

    path ............. path to folder (if no folder is given, the current folder will be the default)\n`
};

module.exports = args => {
  const subCmd = args._[0] === "help" ? args._[1] : args._[0];

  console.log(menus[subCmd] || menus.main);
};
