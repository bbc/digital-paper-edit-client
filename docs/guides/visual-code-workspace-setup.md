# Visual Code Workspace - draft

**Optionally** you can use [multi root VS Code Workspace](https://code.visualstudio.com/docs/editor/multi-root-workspaces)

**Pre-requisite** 
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node](https://nodejs.org/en/download/)


Some quick instructions to get setup, feedback to make this onboarding 

git clone these repos 
- [`bbc/digital-paper-edit-client`](https://github.com/bbc/digital-paper-edit-client)
- [`bbc/digital-paper-edit-api`](https://github.com/bbc/digital-paper-edit-api)
- [`bbc/digital-paper-edit-infrastructure`](https://github.com/bbc/digital-paper-edit-infrastructure)
- [`/bbc/digital-paper-edit-electron`](https://github.com/bbc/digital-paper-edit-electron) 
- [`bbc/digital-paper-edit-cep`](https://github.com/bbc/digital-paper-edit-cep) 


Copy and paste this in your terminal to download all the repositories

```
git clone git@github.com:bbc/digital-paper-edit-client.git 
git clone git@github.com:bbc/digital-paper-edit-api.git  
git clone git@github.com:bbc/digital-paper-edit-electron.git  
git clone git@github.com:bbc/digital-paper-edit-infrastructure.git  
git clone git@github.com:bbc/digital-paper-edit-cep.git 
```

To download the micro services used in the backend
```
git clone git@github.com:bbc/stt-proxy.git
git clone git@github.com:bbc/video-preview-converter.git
git clone 
```


Create a file named `digital-paper-edit.code-workspace` in the same root where you have cloned the repositories, and add this json as content

```json
{
    "folders": [
        {
            "name": "React Client",
            "path": "digital-paper-edit-client"
        },
        {
            "name": "Server API",
            "path": "digital-paper-edit-api"
        },
        {
            "name": "Electron Desktop app",
            "path": "digital-paper-edit-electron"
        },
        {
            "name": "Adobe CEP - Premiere Plugin",
            "path": "digital-paper-edit-cep"
        },
        {
            "name": "AWS Infrastructure",
            "path": "digital-paper-edit-infrastructure"
        },
        {
            "name": "Microservice: STT Proxy",
            "path": "stt-proxy"
        },
        {
            "name": "Microservice: Video Preview Converter",
            "path": "video-preview-converter"
        },
        {
            "name": "Microservice: Audio Converter",
            "path": "audio-converter"
        }
    ]
}

```


double clicking `digital-paper-edit.code-workspace` will open the workspace.


## `npm ScriptExplorer` 

You can also use the convinient `npm ScriptExplorer` 

> go to File -> Preferences -> Settings (CTRL+,) and to enable npm.enableScriptExplorer. VS Code will now automatically search for your package.json file and extract all commands from its scripts section.

> This adds a new view in the sidebar on the left called “NPM Scripts”.

>There, all NPM script commands are listed and you can simply click on the little arrow next to each one to start it. A new terminal is opened and the script is executed.


[see here for more details](http://www.matthiassommer.it/programming/testing/run-npm-scripts-in-visual-studio-code-with-a-click-of-a-button/)

