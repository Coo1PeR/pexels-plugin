// import { Injectable } from '@angular/core';
// import { WorkflowIntegration } from '../../../assets/WorkflowIntegration.node';
//
// @Injectable({
//   providedIn: 'root'
// })
//
// export class MediaService {
//   private PLUGIN_ID = "com.blackmagicdesign.resolve.pexelsplugin";
//
//   initialize() {
//     WorkflowIntegration.Initialize(this.PLUGIN_ID);
//   }
//
//   addVideoToMediaPool(videoPath: string) {
//     const resolve = WorkflowIntegration.GetResolve();
//     const projectManager = resolve.GetProjectManager();
//     const project = projectManager.GetCurrentProject();
//     const mediaPool = project.GetMediaPool();
//     const mediaStorage = resolve.GetMediaStorage();
//
//     let rootBin = mediaPool.GetRootFolder();
//     let pexelsBin = this.getBinByName(mediaPool, rootBin, 'Pexels');
//     if (!pexelsBin) {
//       pexelsBin = this.addBin(mediaPool, rootBin, 'Pexels');
//     }
//
//     mediaPool.SetCurrentFolder(pexelsBin);
//     mediaStorage.AddItemListToMediaPool([videoPath]);
//   }
//
//   private getBinByName(mediaPool, parentBin, binName) {
//     const subFolders = parentBin.GetSubFolderList();
//     for (const folder of subFolders) {
//       if (folder.GetName() === binName) {
//         return folder;
//       }
//     }
//     return null;
//   }
//
//   private addBin(mediaPool, parentBin, binName) {
//     return mediaPool.AddSubFolder(parentBin, binName);
//   }
// }
