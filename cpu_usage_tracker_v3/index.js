require("electron-reload")(__dirname);
const { app, BrowserWindow, ipcMain } = require('electron');
app.on("ready", createWindow);
const si = require("systeminformation");

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences:{
      preload: __dirname + "/preload.js"
    }
  });
  mainWindow.webContents.openDevTools();
  mainWindow.loadFile(__dirname + '/renderer/index.html');
  mainWindow.on("ready-to-show", () => mainWindow.show());
}

ipcMain.handle("get-cpu-used", async (event,args)=>{
  let CPUusage = await si.currentLoad();
  return CPUusage;
})

ipcMain.handle("get-mem-used", async (event,args)=>{
  let MEMusage = await si.mem();
  return MEMusage;
})

ipcMain.handle("get-mem-free", async (event,args)=>{
  let MEMfree = await si.wifiNetworks();
  return MEMfree;
})