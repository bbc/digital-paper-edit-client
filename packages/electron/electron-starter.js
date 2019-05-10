const electron = require("electron");
// Module to control application life.
const app = electron.app;
const Menu = electron.Menu;
const shell = electron.shell;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");

// TODO: figure out auto updater
// require("update-electron-app")({
//   repo: "kitze/react-electron-example",
//   updateInterval: "1 hour"
// });

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 670,
    minWidth: 1000,
    minHeight: 670,
    titleBarStyle: 'show',
    webPreferences: {
      webSecurity: false
    }
  });

  console.log(__dirname);
  if (process.env.NODE_ENV === "development") {
    // and load the index.html of the app.
    mainWindow.loadURL("http://localhost:3000");
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  }
  // Once we package this in electron we no longer 
  // have access to process.env.NODE_ENV to set it to production
  // so we need to recur to putting the production mode
  // into the else for now. 
  else{
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "./build/index.html"),
        protocol: "file:",
        slashes: true
      })
    );
  }

  // https://github.com/electron/electron/issues/1095
  mainWindow.dataPath = app.getPath("userData");

  // MENU
  // TODO: menu could be refactored as separate file?
  // Create the Application's main menu
  var template = [
    {
      label: "Application",
      submenu: [
        {
          label: "About Application",
          selector: "orderFrontStandardAboutPanel:"
        },
        { type: "separator" },
        {
          label: "Quit",
          accelerator: "Command+Q",
          click: function() {
            app.quit();
          }
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { role: "pasteandmatchstyle" },
        { role: "delete" },
        {
          label: "Select All",
          accelerator: "CmdOrCtrl+A",
          selector: "selectAll:"
        },
        { type: "separator" },
        {
          label: "Speech",
          submenu: [
            { role: "startspeaking", accelerator: "CmdOrCtrl+E" }, //perhaps add keyboard shortcut?
            { role: "stopspeaking", accelerator: "CmdOrCtrl+Shift+E" } //perhaps add keyboard shortcut?
          ]
        }
      ]
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forcereload" },
        { role: "toggledevtools", accelerator: "CmdOrCtrl+Alt+I" },
        { type: "separator" },
        { role: "resetzoom" },
        { role: "zoomin" },
        { role: "zoomout" },
        { type: "separator" },
        { role: "togglefullscreen" }
      ]
    },
    {
      role: "window",
      submenu: [{ role: "minimize" }, { role: "close" }]
    },
    {
      role: "help",
      submenu: [
        // {
        //   label: "Project Page",
        //   click() {
        //     require("electron").shell.openExternal("https://autoEdit.io");
        //   }
        // },
        // {
        //   label: "User Manual",
        //   click() {
        //     require("electron").shell.openExternal(
        //       "https://pietropassarelli.gitbooks.io/autoedit2-user-manual/content/"
        //     );
        //   }
        // },
        // {
        //   label: "Advanced - Developer Console",
        //   click() {
        //     win.webContents.toggleDevTools();
        //   }
        // }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// https://electron.atom.io/docs/api/app/#event-open-file-macos
//not working ?
app.on("open-file", (event, path) => {
  console.log('open-file: ',path);
  event.preventDefault();
  // shell.openExternal(url);
});

// https://electronjs.org/docs/api/app#appsetbadgecountcount-linux-macos
// app.setBadgeCount(3)

//not working ?
app.on("open-url", (event, url) => {
  console.log('open-url: ',url);
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  event.preventDefault();
  shell.openExternal(url);
});
