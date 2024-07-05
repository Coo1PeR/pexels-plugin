interface ElectronAPI {
  downloadVideo: (url: string, filePath: string) => Promise<string>;
}

interface Window {
  electron: ElectronAPI;
}
