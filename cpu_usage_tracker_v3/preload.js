const { ipcRenderer, contextBridge } = require("electron");
let os = require("os");

contextBridge.exposeInMainWorld("api", {
    cpuCount: os.cpus().length,
    cpuModel: os.cpus()[0].model,
    getCPUusage: (args) => ipcRenderer.invoke("get-cpu-used", args),
    getMEMusage: (args) => ipcRenderer.invoke("get-mem-used", args),
    getMEMfree: (args) => ipcRenderer.invoke("get-mem-free", args),
});