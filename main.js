const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addWindow;
let zoekWindow;

// listen for app to be ready
app.on('ready', function(){
    //nieuw venster maken
    mainWindow = new BrowserWindow ({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true
        }
    });
    // html file laden
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol:'file:',
        slashes: true
    }));
    //app sluiten als er op kruisje wordt gedrukt
    mainWindow.on('closed', function(){
        app.quit();
    });

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    Menu.setApplicationMenu(mainMenu);
});//go to discord

ipcMain.on("zoekWin", (e, item) => {
    zoekWindow = new BrowserWindow ({
        width: 500,
        height: 400,
        title: 'Zoeken in dossiers',
        webPreferences: {
            nodeIntegration: true
        }
    });
    // html file laden
    zoekWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'zoekWindow.html'),
        protocol:'file:',
        slashes: true
    }));
    
});

function createAddWindow(){
    addWindow = new BrowserWindow ({
        width: 500,
        height: 400,
        title: 'Nieuw dossier aanmaken',
        webPreferences: {
            nodeIntegration: true
        }
    });
    // html file laden
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol:'file:',
        slashes: true
    }));
}

const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Nieuw Dossier',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'test'
            },
            {
                label: 'Sluiten', 
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Refresh',
                accelerator: process.platform === 'darwin' ? 'Command+R' : 'ctrl+R',
                click(){
                    mainWindow.reload();
                }
            }
        ]
    }
]

//Als mac wordt gebruikt moet er een leeg object worden toegevoegd aan de menubalk 
if (process.platform == 'darwin'){
    mainMenuTemplate.unshift({
        label: ''
    });
}

//developer tools als niet in productie
if (process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Dev Tools',
        submenu: [
            {
                label: 'Toggle Devtools',
                accelerator: process.platform === 'darwin' ? 'Command+I' : 'ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    })
}




