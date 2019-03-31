const menus = {
  main: `
    node-stats [command] <options>

    scan ............... scan a folder and all its subfolders for node_modules
    help ............... show help menu for a command\n`,

  scan: `
    node-stats scan <options>

    path ............. scan a specific folder\n
    If no path is specified, the current directory will be scanned.\n`
};

module.exports = args => {
  const subCmd = args._[0] === "help" ? args._[1] : args._[0];

  console.log(menus[subCmd] || menus.main);
};
