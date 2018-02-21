+++
title = "Technical Cheatsheet: Development Environment Setup"
description = "Technical cheatsheet to setup your web development environment with Homebrew, Cask, Sublime as Editor, iTerm2 as Terminal/Command Line Interface, Git and GitHub, and Node, NPM and NVM. Let's setup your development environment to get you started ..."
date = "2016-11-09T13:50:46+02:00"
tags = ["Web Development"]
categories = ["Web Development"]
keywords = ["web developer setup", "javascript developer setup"]
news_keywords = ["web developer setup"]
hashtag = "#JavaScript"
contribute = "developer-setup.md"
headline = "Technical Cheatsheet: Development Environment Setup"

+++

{{% pin_it_image "web developer setup" "img/posts/developer-setup/banner.jpg" "is-src-set" %}}

This concise cheatsheet will give you guidance on how to setup your development environment as a web developer. It's made for MacOS developers, but you can substitute the tools/instructions with equivalent things for Windows and Linux. So don't give up if you are not a MacOS user. Setting up everything yourself is your first challenge as a striving web developer.

Note: If you are a Windows developer who wants to get into React.js, checkout this [React setup guide for Windows users](https://www.robinwieruch.de/react-js-windows-setup).

{{% chapter_header "Table of Contents" "toc" %}}

* [Homebrew](#homebrew)
* [Git](#git)
* [Sublime as Editor](#sublime)
* [iTerm2 (Optional)](#iterm)
* [GitHub](#github)
* [Node and NPM](#node-npm)

{{% chapter_header "Homebrew" "homebrew" %}}

If you are a MacOS user, you should use Homebrew to install every other tool with it. Homebrew is a package manager for MacOS. Rather than having to download every application from a website, Homebrew allows one to install and manage applications from the command line. It's great to get used to the command line in the first place. In addition, you can manage all of your applications with one tool. Get all the instructions for {{% a_blank "Homebrew on their website" "http://brew.sh/" %}}. Otherwise, simply type the following in your command line (terminal) to install Homebrew.

{{< highlight javascript >}}
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
{{< /highlight >}}

Afterward, Homebrew should be installed for you. It should be available on the command line when you type `brew`. Whenever you install another tool with Homebrew, type `brew update` in your command line to update the Homebrew repository with all the recent versions. Afterward you can install the desired tool with `brew install <tool>` or upgrade it with `brew upgrade <tool>`.

{{% chapter_header "Git and GitHub" "git" %}}

Git will be your distributed version control system. It manages your local on your machine and your remote projects on platforms such as GitHub. Sooner or later you will need it to collaborate on projects with other people, to manage your own projects and to showcase your projects to the public. Git should have been installed along the way with the Homebew installation. Type `git --version` to verify its successful installation. Otherwise, you can install it with Homebrew with the follow command on the command line:

{{< highlight javascript >}}
brew install git
{{< /highlight >}}

Now you can setup a GitHub account to manage your projects (repositories) on {{% a_blank "GitHub" "https://github.com/" %}}. It will be your place to share, collaborate on and discuss about exciting projects. Follow the setup instructions from the [GitHub and Git Essentials](https://www.robinwieruch.de/git-essential-commands/) article. In addition, you may want to setup a SSH connection to GitHub. It allows you to connect to your external repositories in a secure way. Therefore, follow the {{% a_blank "instructions on GitHub" "https://help.github.com/articles/generating-an-ssh-key/" %}}. Once you have an account on GitHub, you can make your first social connection on {{% a_blank "GitHub by following my account" "https://github.com/rwieruch" %}} there. I publish lots of educational projects to learn about web development which might be interesting to follow.

{{% chapter_header "Sublime as Editor" "sublime" %}}

{{% a_blank "Sublime" "https://www.sublimetext.com/" %}} is my editor of choice when I code on my projects. But you can decide to choose another one. It's up to you. Other popular code editors are Visual Studio Code and Atom.

Sublime isn't directly accessible in Homebrew. But we can use {{% a_blank "Cask" "https://caskroom.github.io/" %}} to install it. Cask is a another package manager within Homebrew for GUI tools.

{{< highlight javascript >}}
brew install caskroom/cask/brew-cask
brew tap caskroom/versions
brew cask install sublime-text
{{< /highlight >}}

Again, you can verify if the installation was successful:

{{< highlight javascript >}}
sublime --version
{{< /highlight >}}

Another little trick can be used to make sublime open the current directory from the command line. In your command line type:

{{< highlight javascript >}}
link: ln -s "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" /usr/local/bin/sublime
{{< /highlight >}}

Now you should be able to open any directory from the command line with `sublime .` Sublime comes with powerful settings and amazing customization. You can choose from a wide range of themes or packages to make your developer experience nicer and easier.

{{% chapter_header "iTerm2 (Optional)" "iterm" %}}

It's an optional tool, but you might want to install this advanced command line (terminal). I suggest {{% a_blank "iTerm2" "https://www.iterm2.com/" %}} whereas Homebrew helps you to install it.

{{< highlight javascript >}}
brew cask install iterm2
{{< /highlight >}}

Now you can open iTerm2 instead of the default terminal. You could install further stuff for iTerm2 like the {{% a_blank "solarized theme" "http://ethanschoonover.com/solarized" %}} or {{% a_blank "Oh My Zsh" "https://github.com/robbyrussell/oh-my-zsh/wiki/Cheatsheet" %}}.

{{% chapter_header "Node and NPM" "node-npm" %}}

If you are developing with JavaScript, there is no way around {{% a_blank "node and npm" "https://nodejs.org/en/" %}}. You can find the installation instructions on the official website. Installing node will install npm (node package manager) as well. This package manager is used to install libraries/frameworks (node packages) on the command line to your project.

There exists an alternative to install and manage node: {{% a_blank "nvm" "https://github.com/creationix/nvm" %}}. You should be able to install it via Homebrew as well. In addition, there exists a {{% a_blank "Windows version for nvm" "https://github.com/coreybutler/nvm-windows" %}} too. I highly recommend to use nvm, because you can install and manage multiple node versions with it.

<hr class="section-divider">

That's everything you need for a development setup. Homebrew is used to install all the tools for you on the command line. Cask is used on top of Homebrew to install GUI applications. Then there is the editor and the command line which should be selected carefully, because you will spend most of your time in them. If you are a JavaScript developer, there is no way around node and npm and thus you should install them with nvm. Last but not least, git and GitHub should be used to manage your projects. If you are just starting out with web development, you should build a nice portfolio on GitHub to showcase it to your future employers.
