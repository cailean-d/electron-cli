<% if (comments) { %>// Modules to control application life and create native browser window
<% } %>const { app, BrowserWindow } = require('electron');
<% if (default_menu) { %>const defaultMenu = require('./main-menu');
<% } %>
<% if (comments) { %>// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
<% } %>let mainWindow;
<% if (comments) { %>
// Reloading all application windows on files changes<% } %>
if (process.env.NODE_ENV == 'development') {
  process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
  require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
  });
}

function createWindow() {<% if (comments) { %>
  // Create the browser window.<% } %>
  mainWindow = new BrowserWindow({ width: 800, height: 600 });<% if (comments) { %>

  // and load the index.html of the app.<% } %>
  mainWindow.loadFile('index.html');<% if (dev_tools) { %><% if (comments) { %>

  // Open the DevTools.<% } %>
  mainWindow.webContents.openDevTools()<% } %><% if (comments) { %>

  // Emitted when the window is closed.<% } %>
  mainWindow.on('closed', function (){<% if (comments) { %>
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.<% } %>
    mainWindow = null;
  });
  <% if (comments) { %>
  // Set Default menu
  <% } %><% if (default_menu) { %>mainWindow.setMenu(defaultMenu);<% } %><% if (!default_menu) { %>mainWindow.setMenu(null);<% } %>
}

<% if (comments) { %>// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
<% } %>app.on('ready', createWindow)
<% if (comments) { %>
// Quit when all windows are closed.<% } %>
app.on('window-all-closed', function () {
  <% if (comments) { %>// On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  <% } %>if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {<% if (comments) { %>
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.<% } %>
  if (mainWindow === null) {
    createWindow();
  }
});
<% if (comments) { %>
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.<% } %>