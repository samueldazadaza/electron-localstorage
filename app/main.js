const { app, BrowserWindow } = require('electron');

app.on('ready', () => {
    mainWindow = new BrowserWindow();
    mainWindow.loadFile(__dirname + '/index.html')
});