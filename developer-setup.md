+++
title = "Technical Cheatsheet: Development Environment Setup"
description = "Technical cheatsheet to setup your MAC developer environment with Homebrew, Git, Sublime as Editor, iTerm2 as Terminal / Command Line Tool and GitHub. Setup your development environment to get started..."
date = "2016-11-09T13:50:46+02:00"
tags = ["Web Development"]
categories = ["Web Development"]
keyword = "frontend developer setup"
news_keywords = ["frontend developer setup"]
hashtag = "#programming"
contribute = "developer-setup.md"
headline = "Technical Cheatsheet: Development Environment Setup"

+++

The cheatsheet will give you guidance to setup your environment. It addresses Mac users, but you could substitute some tools and instructions with something equivalent for Windows or Linux.

{{% chapter_header "Table of Contents" "toc" %}}

* [Homebrew](#homebrew)
* [Git](#git)
* [Sublime as Editor](#sublime)
* [iTerm2 (Optional)](#iterm)
* [GitHub](#github)

{{% chapter_header "Homebrew" "homebrew" %}}

When you are a Mac user, we will use Homebrew to install everything. Homebrew is a package manager for Mac. Rather than having to download every application from a website, Homebrew allows one to install and manage applications from the command line.

Get your full instructions on {{% a_blank "Homebrew" "http://brew.sh/" %}}. Otherwise type the following in your command line to install Homebrew.

{{< highlight javascript >}}
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
{{< /highlight >}}

> Whenever you install something with Homebrew, type `brew update` in your command line to update the Homebrew repository with the recent changes.

{{% chapter_header "Git" "git" %}}

Git will be your distributed version control system. It manages your local and external projects. You will need it to collaborate on projects, to manage your own projects and to release your projects for the public. Git should have been installed during the Homebew installation. Type `git --version` to verify if it was installed successfully. Otherwise you can install it with Homebrew:

{{< highlight javascript >}}
brew install git
{{< /highlight >}}

Later we will setup a GitHub account to manage our projects (repositories) on GitHub. You can read up all my essential GitHub commands in this article: [GitHub and Git Essentials](https://www.robinwieruch.de/git-essential-commands/).

{{% chapter_header "Sublime as Editor" "sublime" %}}

{{% a_blank "Sublime" "https://www.sublimetext.com/" %}} is my editor of choice. But you can decide to choose another one. It's up to you.

Sublime isn't directly accessible in Homebrew. But we can use {{% a_blank "Cask" "https://caskroom.github.io/" %}} to install it.

{{< highlight javascript >}}
brew install caskroom/cask/brew-cask
brew tap caskroom/versions
brew cask install sublime-text
{{< /highlight >}}

Again verify if the installation was successful:

{{< highlight javascript >}}
sublime --version
{{< /highlight >}}

Another little trick can be applied to make sublime open the current directory from the command line. In your command line type:

{{< highlight javascript >}}
link: ln -s "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" /usr/local/bin/sublime
{{< /highlight >}}

Now you should be able to open any directory from the command line with `sublime .`

> Sublime comes with powerful settings and amazing customization. You can choose from a wide range of themes or packages to make your developer experience nicer and easier.

{{% chapter_header "iTerm2 (Optional)" "iterm" %}}

It's optional, but you might want to install an advanced command line (terminal) tool. I suggest {{% a_blank "iTerm2" "https://www.iterm2.com/" %}}.

Homebrew again helps you to install it.

{{< highlight javascript >}}
brew cask install iterm2
{{< /highlight >}}

Now you can open iTerm2 instead of the default terminal.

> You could install further stuff for iTerm2 like the {{% a_blank "solarized theme" "http://ethanschoonover.com/solarized" %}} or {{% a_blank "Oh My Zsh" "https://github.com/robbyrussell/oh-my-zsh/wiki/Cheatsheet" %}}.

{{% chapter_header "GitHub" "github" %}}

Now it's time to create an account on {{% a_blank "GitHub" "https://github.com/" %}}. It will be your place to share, collaborate on and discuss projects. You could {{% a_blank "follow me on GitHub" "https://github.com/rwieruch" %}} to have your first social connection.

Next you may want to setup a SSH connection to GitHub. It allows you to connect to your external repositories in a secure way. Therefor follow the {{% a_blank "instructions on GitHub" "https://help.github.com/articles/generating-an-ssh-key/" %}}.

That's it for the development setup. I hope it gives you everything you need to start to code or to build your own website.