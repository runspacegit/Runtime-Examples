const { exec } = require("child_process");
const { platform } = require("os");

const asyncexec = (cmd) => {
  const exec = require("child_process").exec;
  return new Promise((resolve) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
};

module.exports = async (_, callback) => {
  let p = platform();
  if (p === "darwin") {
    callback(await asyncexec("open https://0x77.page"), p);
  }
  if (p === "win32") {
    callback(await asyncexec("start https://0x77.page"), p);
  }
  if (p === "linux") {
    callback(await asyncexec("xdg-open https://0x77.page"), p);
  }
};
