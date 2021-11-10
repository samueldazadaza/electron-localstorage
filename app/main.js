const { app, BrowserWindow } = require('electron');

let mainWindow = null //para que app siga funcionando

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences : {
            nodeIntegration: true //obtener api de node en ventana
        }
    });
    mainWindow.loadFile(__dirname + '/index.html')
});