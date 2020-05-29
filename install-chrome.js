/**
 * @name InstallChrome
 * @description Install Chrome example using RunSpace Runtime Function, works on Ubuntu, macOS, Windows.
 * @author Mikail Marynenko <0x77dev@protonmail.com>
 */

const os = require("os");
const { exec } = require("child_process");
const { existsSync } = require("fs");
const path = require("path");

const waitUntilPathWillExist = (path) =>
  new Promise((resolve) => {
    let Path = path;
    setInterval(() => {
      if (existsSync(Path)) resolve();
    }, 1000);
  });

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
  const platform = os.platform();
  if (platform === "linux") {
    const download = await asyncexec(
      "wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -O /tmp/chrome.deb"
    );
    const install = await asyncexec("pkexec apt install -y /tmp/chrome.deb");
    console.log(download, install);
    callback(true);
  } else if (platform === "win32") {
    console.log(
      await asyncexec(`
        powershell -Command $LocalTempDir = $env:TEMP; $ChromeInstaller = "ChromeInstaller.exe"; (new-object    System.Net.WebClient).DownloadFile('http://dl.google.com/chrome/install/375.126/chrome_installer.exe', "$LocalTempDir\$ChromeInstaller"); & "$LocalTempDir\$ChromeInstaller" /silent /install; $Process2Monitor =  "ChromeInstaller"; Do { $ProcessesFound = Get-Process | ?{$Process2Monitor -contains $_.Name} | Select-Object -ExpandProperty Name; If ($ProcessesFound) { "Still running: $($ProcessesFound -join ', ')" | Write-Host; Start-Sleep -Seconds 2 } else { rm "$LocalTempDir\$ChromeInstaller" -ErrorAction SilentlyContinue -Verbose } } Until (!$ProcessesFound)
      `)
    );
    callback(true);
  } else if (platform === "darwin") {
    const download = await asyncexec(
      "curl https://dl.google.com/chrome/mac/stable/GGRO/googlechrome.dmg -o /tmp/chrome.dmg"
    );
    await waitUntilPathWillExist("/Volumes/Google Chrome/");
    const open = await asyncexec("open /tmp/chrome.dmg");
    const install = await asyncexec(
      'cp -Rfv "/Volumes/Google Chrome/Google Chrome.app" ' +
        path.join(os.userInfo().homedir, "Applications")
    );
    console.log(download, open, install);
    callback(true);
  } else {
    console.error("Unsupported platform");
    callback(false);
  }
};
