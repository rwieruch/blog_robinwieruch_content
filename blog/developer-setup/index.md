---
title: "My development setup as a JavaScript web developer"
description: "Are you just getting started with web development? This list of web development tools gives you the perfect head start as being a striving web developer. It walks you through the tools that I am using in my daily life as a freelancer and consultant..."
date: "2016-11-09T13:50:46+02:00"
categories: ["Web Development"]
keywords: ["web developer setup", "javascript developer setup", "web development setup", "web development environment"]
hashtags: ["#JavaScript"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

This concise cheatsheet will give you an overview on how to setup your development environment as a web developer. It was created for MacOS developers. However, you can substitute the instructions and tools for Windows and Linux as well. So don't give up yet if you are not a MacOS user. After all, setting up your development environment all by yourself is your first challenge as a striving web developer these days. So let's get started!

The following short checklist reflects my own development environment as being a developer who operates on MacOS. There are different philosophies to shape your development setup. Whereas there are people who prefer to have everything in one [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment), there are also people who use several lightweight tools (e.g. editor, command line) but combine them for their purposes. Personally, I follow the latter philosophy. That's why you will find a bunch of lightweight tools in the following list. However, if you want to have a more thorough guide on how to setup your machine with a sophisticated IDE, head over to these guides. They are dedicated for a React setup, but you can simply leave out React.js from the equation and you have an up and running IDE after following one of these guides. Still, the list below might offer you a couple of useful tools to complement your IDE as well.

* [React setup guide for Windows users](https://www.robinwieruch.de/react-js-windows-setup)
* [React setup guide for MacOS users](https://www.robinwieruch.de/react-js-macos-setup)

What if you are not sure which philosophy to follow? If you are just beginning with web development, I encourage you to start out with an IDE which would mean you should follow one of the guides from above. There you get everything out of the box and don't need to worry about the tooling around your code. Once you become an intermediate developer, checkout the more lightweight approach below.

# Table of Contents

* [Homebrew](#homebrew)
* [Git](#git)
* [Sublime as Editor](#sublime)
* [iTerm2 (Optional)](#iterm)
* [GitHub](#github)
* [Node and NPM](#node-npm)

# Homebrew

If you are a MacOS user, you should use Homebrew to install every other tool on your machine with it. Homebrew is a package manager for MacOS. Rather than having to download every application from a website, Homebrew allows you to install and manage applications from the command line. It's great tool to get used to the command line in the first place. You should feel comfortable on the command line as developer thus it makes sense to perform as much tasks as possible there. In addition, Homebrew gives you the ability to manage all of your applications with only one tool. You can get all the necessary instructions for Homebrew [on their website](http://brew.sh/). Otherwise, simply type the following command in your command line (terminal) to install Homebrew.

```javascript
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Afterward, Homebrew should be installed for you. It should be available on the command line when you type `brew`. Whenever you install another tool with Homebrew, type `brew update` in your command line to update the Homebrew repository with all the recent versions of the packages. Afterward, you can install the desired tool with `brew install <tool>` or upgrade it with `brew upgrade <tool>`.

# Git and GitHub

Git will be your distributed version control system. It manages your local projects on your machine and your remote projects on platforms such as GitHub and GitLab. Sooner or later, you will need it to collaborate on projects with other people, to manage your own projects and to showcase your projects to the public as portfolio for hiring purposes. Git should have been installed along the way with the Homebew installation. Type `git --version` to verify that it is there. Otherwise, you can use Homebrew for the first time to install it with the following command on the command line:

```javascript
brew install git
```

Now you can setup a GitHub account to manage your projects (repositories) on [GitHub](https://github.com/). It will be your place to share, collaborate on and discuss about exciting projects. Therefore, follow the setup instructions from the [GitHub and Git Essentials](https://www.robinwieruch.de/git-essential-commands/) article. In addition, you may want to setup a SSH connection to GitHub. It allows you to connect to your remote repositories in a secure way. Therefore, follow the [instructions on GitHub](https://help.github.com/articles/generating-an-ssh-key/). Once you have an account on GitHub, you can make your first social connection on [GitHub by following me](https://github.com/rwieruch) there. I publish lots of educational projects to learn about web development which might be interesting for you.

# Sublime as Editor

[Sublime](https://www.sublimetext.com/) is my editor of choice when I get into coding. That's the part where it becomes opinionated. You can use any editor or IDE of your choice. It's up to you. Other popular code editors are Visual Studio Code, Atom and VIM.

Unfortunately, Sublime isn't directly accessible via Homebrew. But we can use [Cask](https://caskroom.github.io/) to install it. Cask is a another package manager within Homebrew for GUI tools. For instance, Chrome could be installed on your machine with Cask as well. Since I mentioned Chrome here, I recommend you using Chrome for your web development purposes. It comes with powerful development tools. Otherwise, you can use Firefox as viable alternative as well. But enough talking here, let's install Cask and Sublime by using Homebrew.

```javascript
brew install caskroom/cask/brew-cask
brew tap caskroom/versions
brew cask install sublime-text
```

Again, you can verify on the command line whether the installation for Sublime was successful:

```javascript
sublime --version
```

Another little trick can be used to make sublime open the current directory from the command line. In your command line type:

```javascript
link: ln -s "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" /usr/local/bin/sublime
```

Now you should be able to open any directory from the command line with `sublime .` Sublime comes with powerful settings and amazing customizations. You can choose from a wide range of [themes and packages](https://packagecontrol.io/browse/popular) to make your experience as a developer even more comfortable. Here a list of a couple of my installed packages for Sublime:

* [Agila Theme](https://packagecontrol.io/packages/Agila%20Theme)
* [All Autocomplete](https://packagecontrol.io/packages/All%20Autocomplete)
* [BracketHighlighter](https://packagecontrol.io/packages/BracketHighlighter)
* [Color Highlighter](https://packagecontrol.io/packages/Color%20Highlighter)
* [Emmet](https://packagecontrol.io/packages/Emmet)
* [GitGutter](https://packagecontrol.io/packages/GitGutter)
* [SublimeLinter](https://packagecontrol.io/packages/SublimeLinter)
* [JsPrettier](https://packagecontrol.io/packages/JsPrettier)
* [SideBarEnhancements](https://packagecontrol.io/packages/SideBarEnhancements)

# iTerm2 (Optional)

MacOS and other OS's already come with their own command line (terminal) tools. Thus, another command line tool is optional, but you might want to install one anyway because of various benefits. Other command line tools often come with lots of advanced features and thus they will enrich your daily toolset. I suggest [iTerm2](https://www.iterm2.com/) whereas Homebrew with Cask helps you to install it.

```javascript
brew cask install iterm2
```

After a successful installation, you can open iTerm2 instead of the default terminal on your machine. You could install further stuff for iTerm2 like the [solarized theme](http://ethanschoonover.com/solarized) or [Oh My Zsh](https://github.com/robbyrussell/oh-my-zsh/wiki/Cheatsheet) as well. As mentioned, it comes with powerful integrations, beautiful themes and other useful utility tools. Since this article is only a checklist, you have to dive deeper into iTerm2 on your own.

# Node and NPM

If you are developing with JavaScript, there is no way around [node and npm](https://nodejs.org/en/). You can find the installation instructions on the official website. Installing node will install npm (node package manager) as well. The node package manager is used to install libraries/frameworks (node packages) on the command line to your project.

There exists an alternative to install and manage node: [nvm](https://github.com/creationix/nvm). You should be able to install it via Homebrew as well. In addition, there exists a [Windows version for nvm](https://github.com/coreybutler/nvm-windows) too. I highly recommend to use nvm, because you can install and manage multiple node versions with it. Furthermore, it helps you to install your node version as well.

<Divider />

That are all the things you need for a development environment. Homebrew is used to install all the tools for you on the command line. Cask is used on top of Homebrew to install GUI applications such as Chrome, iTerm2 and Sublime. Then there is the editor and the command line which should be selected carefully, because you will spend most of your time as being a developer with them. If you are a JavaScript developer, there is no way around node and npm and thus you should install them with nvm to manage multiple node versions. Last but not least, git and GitHub should be used to manage your projects. If you are just starting out with web development, you should build a presentable portfolio on GitHub to showcase it. I am curious what you are going to code as your first projects. You can share them on GitHub with me or in the comments of this article.
