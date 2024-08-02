# 🎥 Pexels Plugin for DaVinci Resolve

#### This repository contains a plugin for integrating the search and download of video materials from the Pexels website directly into the DaVinci Resolve video editor. This plugin was developed using the [DaVinci Resolve Workflow Integration](https://resolvedevdoc.readthedocs.io/en/latest/readme_workflow.html).

## ☕ Features
 - Video Search: Search for video materials from Pexels directly within DaVinci Resolve.
 - Download Videos: Download selected videos and add them to your DaVinci Resolve project.
 - API Key Management: Check for a pexels-api-key.txt file in the root directory for the Pexels API key. If not found, prompts the user to input the API key via a modal dialog, saving it to the file for future use.

## 🛠️ Technologies Used
- [**Angular**](https://angular.dev/):  Framework for building the plugin.
- [**Angular Material**](https://material.angular.io/): UI component library for creating the interface.
- [**NGXS**](https://www.ngxs.io/): State management for handling the application's state.
- [**Pexels API**](https://www.pexels.com/api/): API for searching and retrieving video content.

### Workflow Integration Plugins root directory

User should place their Workflow Integration Plugin under the following directory:

> ~~~
> ℹ Note
> ~~~
>_Mac OS X_:
"/Library/Application Support/Blackmagic Design/DaVinci Resolve/Workflow Integration Plugins/"
>
>_Windows_:
"%PROGRAMDATA%\Blackmagic Design\DaVinci Resolve\Support\Workflow Integration Plugins\"


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.6.



### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
