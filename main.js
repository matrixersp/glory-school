const { app, BrowserWindow } = require("electron"),
  { join } = require("path"),
  url = require("url");

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 860,
    minHeight: 640,
    frame: false
  });

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: join(__dirname, "../build/index.html"),
      protocol: "file:",
      slashes: true
    });
  mainWindow.loadURL(startUrl);

  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-close", () => {
  // Quit app when the platform is not OS X
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Reactivate window in OS X
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
