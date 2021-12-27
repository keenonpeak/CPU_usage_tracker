require("electron-reload")(__dirname);
const { app, BrowserWindow, ipcMain } = require('electron');
app.on("ready", createWindow);
const si = require("systeminformation");

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 250,
    height: 80,
    webPreferences:{
      preload: __dirname + "/preload.js"
    }
  });
  //mainWindow.webContents.openDevTools();
  mainWindow.loadFile(__dirname + '/renderer/index.html');
  mainWindow.on("ready-to-show", () => mainWindow.show());
}

ipcMain.handle("get-mem-used", async (event,args)=>{
  let MEMusage = await si.mem();
  return MEMusage;
})