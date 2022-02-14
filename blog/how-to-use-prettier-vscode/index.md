---
title: "How to use Prettier in VS Code"
description: "How to install Prettier for VS Code (Visual Studio Code). Install Prettier, configure it globally to format on save, add further Prettier configuration on a global level, and use a local .prettierrc file ..."
date: "2022-02-14T06:50:46+02:00"
categories: ["JavaScript", "VS Code"]
keywords: ["vscode prettier", "vscode prettier on save", "vscode prettier format on save", "install prettier vscode"]
hashtags: ["#VSCode"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection label="This tutorial is part 1 of 3 in this series." links={[{ prefix: "Part 2:", label: "How to use ESLint in VSCode", url: "/vscode-eslint/" }, { prefix: "Part 3:", label: "How to use Prettier with ESLint", url: "/prettier-eslint/" }]} />

A brief step by step tutorial on **how to install and use Prettier in VS Code (Visual Studio Code)**. [Prettier](https://prettier.io/) is an opinionated code formatter which ensures one unified code format. It can be used in VS Code by installing it from the VS Code Marketplace. Once you have integrated it in VS Code, you can configure Prettier to format your files when saving them or committing them to a version control system (e.g. Git). This way, you never need to worry about your source code formatting, because Prettier takes care about it. It works for personal projects but also streamlines projects when working with a team of developers.

<ReadMore label="How to set up React on MacOS" link="/react-js-macos-setup/" />

<ReadMore label="How to set up React on Windows" link="/react-js-windows-setup/" />

We will start by installing the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for VS Code. Once you have installed it, you can use it with `CTRL + CMD + P` (MacOS) or `CTRL + Shift + P` (Windows) to manually format a file or a selection of code.

If you don't want to format your file with the given shortcut manually every time, you can **format it on save** as well. Therefore you need to open your VS Code user's settings/preferences as JSON and enter the following configuration:

```javascript
// enable globally (here: format on save)
"editor.formatOnSave": true
// enable per-language (here: Prettier as formatter)
"[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

Afterward, a JavaScript file should format automatically once you save it. Now you don't need to worry about your code formatting anymore, because Prettier takes care of it. Prettier comes with a few [options](https://prettier.io/docs/en/configuration.html) which you can apply globally too; which I like to do for my personal projects:

```javascript{2-3}
"editor.formatOnSave": true
"prettier.singleQuote": true,
"prettier.printWidth": 70,
"[javascript]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
```

After setting up this configuration, Prettier makes sure that only single quotes are used and that the line length is set to the given number of characters.

However, be aware that this applies to every project now. If you happen to work on a project with a team where the project does not use Prettier, you will format every file once you save it. If not agreed upon with your team mates, this may cause trouble. Therefore I recommend the installation of Prettier [Formatting Toggle](https://marketplace.visualstudio.com/items?itemName=tombonnike.vscode-status-bar-format-toggle) which allows you to toggle of Prettier globally in a project.

Furthermore, if a project you are working on uses a local *.prettierrc* file for a local configuration, it can be used to override the global settings. That's what I'd recommend when working with multiple developers in a team on a project:

```javascript
{
  "singleQuote": false,
  "printWidth": 120,
}
```

That's it. You are formatting JavaScript files on save while being able to toggle off Prettier for individual projects. Furthermore, you are using your personal Prettier defaults, however, when working on a project with a team, you can use use a .prettierrc file as well. That's it, you have integrated Prettier successfully in Visual Studio Code.

<LinkCollection label="This tutorial is part 1 of 3 in this series." links={[{ prefix: "Part 2:", label: "How to use ESLint in VSCode", url: "/vscode-eslint/" }, { prefix: "Part 3:", label: "How to use Prettier with ESLint", url: "/prettier-eslint/" }]} />
