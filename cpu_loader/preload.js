const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("api", {
    getMEMusage: (args) => ipcRenderer.invoke("get-mem-used", args),
});