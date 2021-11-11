const { app, BrowserWindow } = require('electron');

let mainWindow = null //para que app siga funcionando

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences : {
            nodeIntegration: false //obtener api de node en ventana
            // nodeIntegrationInWorker: true,
            // contextIsolation: false,
            // enableRemoteModule: true
        }
    });
    mainWindow.loadFile(__dirname + '/index.html')
});