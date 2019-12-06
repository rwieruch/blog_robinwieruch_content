---
title: "How to setup React.js on Windows"
description: "A concise step by step guide on how to setup React.js on Windows for your PC. In a few steps, you will install Visual Studio Code, Node.js, NPM, Git, Prettier and create-react-app for building React applications with Windows ..."
date: "2018-02-20T13:50:46+02:00"
categories: ["React", "VS Code", "Web Development"]
keywords: ["react js windows setup"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

In this article, you will find a concise step by step guide on how to install React on Windows. There are plenty of articles out there on how to setup your web development environment on MacOS, but very few on how to setup it on Windows. Especially when people want to enter the world of React.js in Windows, there is a missing starting point. I wanted to address this issue, since a lot of people reading [The Road to learn React](https://www.robinwieruch.de/the-road-to-learn-react/) are coming from Windows too.

Just recently I worked closely with a group of developers who are required to develop on a Windows machine, because of company internal policies. Thus I had to go through the whole React setup on a Windows machine with them. That's why I think I can give you a concise way on how to use React on a Windows machine in 4 steps.

# Node.js and NPM on Windows

Since you are going to use JavaScript for your React development on Windows, there is no way around Node.js and NPM. Node.js is a JavaScript runtime which makes it possible to run JavaScript outside of the browser. The underlying node package manager (NPM) is used to install libraries, such as React.js, to your project on the command line. You will see later on how this works out on the command line for Windows users.

In order to install Node.js for Windows, you need to head over to the [Node.js website](https://nodejs.org/en/) and download the Windows version which is recommended for most users. Afterward, you should install it. NPM comes automatically with Node.js.

Note: An alternative way to install and manage Node.js on your Windows machine is [nvm-windows](https://github.com/coreybutler/nvm-windows). If you are just getting started with web development, I wouldn't recommend it in the beginning. But it can be a powerful asset later on. nvm-windows is the equivalent to the popular [nvm](https://github.com/creationix/nvm) package for Unix systems. It's called Node Version Manager. It helps you to upgrade Node.js version and to manage multiple Node.js versions on your PC. I didn't try it myself yet, but I hope it just works similar to the MacOS version.

# Visual Studio Code for React on Windows

There are plenty of editors and IDEs out there to develop web applications. Depending on your personal, project or company requirements, you can choose from a range of lightweight editors to full-blown IDEs. Visual Studio Code is a solution in between. Many developers, operating on Windows but also MacOS, enjoy using it. That's why my recommendation would be Visual Studio Code to start developing React applications on Windows. The installation on a Windows machine is simple: Navigate to the official [Visual Studio Code](https://code.visualstudio.com/) website and download the recent version of VS Code in 32 or 64 bit. Afterward, install it and check if everything is working when you open it. That's it for the installation of an editor/IDE on your machine.

If you want to use another editor/IDE, it is up to you. But keep in mind that a couple of the following steps are building up on top of Visual Studio Code. However, it should be possible to substitute these steps for your own editor/IDE.

# Node and NPM for React

If you are just getting started with web development, you should create a dedicated folder on your machine to manage all your web development projects. It's up to you to divide the folder into subfolders. For instance, there could be a folder for React applications and another one for plain Node.js applications. Once you have your folder for your projects, open this folder in Visual Studio Code.

In Visual Studio Code you should be able to open a tab which is called "Terminal" at the bottom. That's your integrated command line in Visual Studio Code to install node packages with NPM or to start/test your project. It's up to you to use the integrated terminal or another command line interface for your Windows machine.

Now, you should check whether the Node.js installation for Windows was successful. On the command line, type the following commands. They should output the versions for Node.js and NPM.

```javascript
node --version
npm --version
```

*Note: In most cases, it should just work for you. If node or npm are no valid commands, you need to check your environment variables in Windows. But I didn't run into this issue anymore in the past when I worked together with Windows users on React applications.*

# create-react-app for React on Windows

Now you can install your first node package with npm on the command line. You will install it globally with a -g flag. Because of installing it globally, you will always have access to it on the command line. Later on, when you install a node package for your project without the -g flag, you will only have access to the node package (node module) in your project. Now, on the command line (in Visual Studio Code), type the following command to install [create-react-app](https://github.com/facebook/create-react-app):

```javascript
npm install -g create-react-app
```

[create-react-app](https://github.com/facebook/create-react-app) allows you to bootstrap React applications with zero-configuration. There is no need to get involved too early in toolings with [Webpack and Babel](https://github.com/rwieruch/minimal-react-webpack-babel-setup). If you are going to read "The Road to React", you will use create-react-app as well. It's the simplest approach to learn React without worrying about all the tooling around it. You can bootstrap your first React.js application with npx (which comes via npm) on Windows with create-react-app by passing the name of your application to it on the command line:

```javascript
npx create-react-app my-app
```

Afterward, you can navigate into the project on the command line and start it with npm:

```javascript
cd my-app
npm start
```

The command line should give you an output where you can find the application in the browser. The default should be localhost:8080. If you are only using IE or Edge on your Windows machine, I can recommend you to install Chrome as well to access the developer environment and the React Developer Tools which are available as Chrome extension. On the other side, now you have an advantage over the MacOS developers, because you can debug your web applications in the Internet Explorer and Edge too.

If you just want to learn React now, you could start to read [The Road to learn React](https://www.robinwieruch.de/the-road-to-learn-react/). It's a pragmatic book which guides you step by step through building a React application from scratch. Along the way, you will transition from JavaScript ES5 to JavaScript ES6 and you will lots of exercises to improve your React skills.

# Git for Visual Studio Code and Windows

At some point, you might want to share your projects on GitHub or collaborate with other people via the git version control. If you want to use GitHub as your platform of choice, you should create an account via [their official website](https://github.com/). GitHub is a social platform where you can follow other people ([you could have your first social interaction with me](https://github.com/rwieruch)), like (star) their projects or collaborate on open source projects with other people.

In order to have git available on the command line and in Visual Studio Code, you need to install it. You can find all the instructions on the official [git website](https://git-scm.com/). Here again you need to download the installer for your OS with your 32 or 64 bit version. Afterward, you should be able to check your git version on the command line:

```javascript
git --version
```

If it doesn't show up in Visual Studio Code, you may have to restart the application. Afterward, you should see that Visual Studio Code already comes with a git integration as well. It's convenient to use git from this integration, but you can also use it from the command line now. That's it for the git installation and the account creation on GitHub. Furthermore, you can check out [this essential guide on how to use git and GitHub](https://www.robinwieruch.de/git-essential-commands/).

<Divider />

That's everything you need for a React development setup in Windows. I hope you have everything to get started in React on your PC. Let me know what other tools you are using on Windows in the comments below. Otherwise, if you are curios about the tools that I am using on my machine, head over to [my personal development setup guide](https://www.robinwieruch.de/developer-setup).

<LinkCollection label="This tutorial is part 1 of 2 in this series." links={[{ prefix: "Part 2:", label: "How to use Prettier in VS Code", url: "https://www.robinwieruch.de/how-to-use-prettier-vscode" }]} />

<ReadMore label="How to set up React with Webpack and Babel" link="https://www.robinwieruch.de/minimal-react-webpack-babel-setup" />
