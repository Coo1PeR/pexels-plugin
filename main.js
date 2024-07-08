const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const fs = require('fs');
const https = require('https');

// Ignore invalid SSL certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 825,
    useContentSize: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true
    }
  });

  mainWindow.on('close', function (e) {
    app.quit();
  });

  mainWindow.loadURL('http://localhost:4200'); // or your Angular app's URL


  mainWindow.loadFile('dist/pexels-plugin/browser/index.html');

  // // Optionally open DevTools for debugging
  // mainWindow.webContents.openDevTools();
  //
  // // Handle any potential errors
  // mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
  //   console.error(`Failed to load URL: ${validatedURL} with error ${errorDescription} (${errorCode})`);
  // });
}

ipcMain.handle('download-video', async (event, url, filePath) => {
  return new Promise((resolve, reject) => {
    console.log(`Event: ${event}, URL: ${url}, Downloading ${filePath}`);
    const file = fs.createWriteStream(filePath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(filePath));
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => reject(err.message));
    });
  });
});

app.on('ready', createWindow);

ipcMain.on('download-video', (event, data) => {
  const {videoId, apiKey} = data;
  const videoUrl = `https://api.pexels.com/videos/videos/${videoId}`; // Adjust if needed
  const videoPath = path.join('/Library/Application Support/Blackmagic Design/DaVinci Resolve/Workflow Integration Plugins', `${videoId}.mp4`);

  // const videoPath = path.join(app.getPath('userData'), `${videoId}.mp4`);

  const options = {
    headers: {
      'Authorization': apiKey
    }
  };

  https.get(videoUrl, options, (response) => {
    response.pipe(fs.createWriteStream(videoPath))
      .on('finish', () => {
        console.log('Video downloaded successfully');
        // Send a message back to the renderer process if needed
        event.sender.send('video-downloaded', videoPath);
        // Call the function to add the video to the media pool
        addVideoToMediaPool(videoPath);
      })
      .on('error', (err) => {
        console.error('Error downloading video:', err);
      });
  });
});

function addVideoToMediaPool(videoPath) {
  // Add the video to the DaVinci Resolve media pool
  const WorkflowIntegration = require('./WorkflowIntegration.node');
  const PLUGIN_ID = "com.blackmagicdesign.resolve.pexelspluginVD";

  const isInitialized = WorkflowIntegration.Initialize(PLUGIN_ID);
  if (!isInitialized) {
    console.error('Failed to initialize WorkflowIntegration');
    return;
  }

  const resolve = WorkflowIntegration.GetResolve();
  if (!resolve) {
    console.error('Failed to get Resolve object');
    return;
  }

  const projectManager = resolve.GetProjectManager();
  const project = projectManager.GetCurrentProject();
  const mediaPool = project.GetMediaPool();
  const rootBin = mediaPool.GetRootFolder();

  let pexelsBin = GetBinByName(mediaPool, rootBin, "Pexels");
  if (!pexelsBin) {
    pexelsBin = AddBin(mediaPool, rootBin, "Pexels");
  }

  const mediaStorage = resolve.GetMediaStorage();
  AddClipToBin(mediaStorage, mediaPool, videoPath, pexelsBin);
}

function GetBinByName(mediaPool, parentBin, binName) {
  const subFolders = parentBin.GetSubFolderList();
  for (const folder of subFolders) {
    if (folder.GetName() === binName) {
      return folder;
    }
  }
  return null;
}

function AddBin(mediaPool, parentBin, binName) {
  return mediaPool.AddSubFolder(parentBin, binName);
}

function AddClipToBin(mediaStorage, mediaPool, clipFullPath, bin) {
  mediaPool.SetCurrentFolder(bin);
  mediaStorage.AddItemListToMediaPool([clipFullPath]);
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
