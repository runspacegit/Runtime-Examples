/**
 * @name SimpleInfo
 * @description Get Machine Info
 * @author Mikail Marynenko <0x77dev@protonmail.com>
 */

const os = require("os");

module.exports = (_, callback) => {
  callback(os.platform(), os.userInfo().username, os.uptime(), os.hostname());
};
