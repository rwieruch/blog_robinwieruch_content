---
title: 'Mac Setup for Web Development [2024]'
description: 'How I set up my new M1 MacBook Pro as a web developer in 2024 for web development ...'
date: '2024-02-05T06:50:46+02:00'
categories: ['Web Development']
keywords:
  [
    'mac setup web development',
    'mac setup web developer',
    'mac setup javascript',
  ]
hashtags: ['#JavaScript']
banner: './images/banner.jpg'
contribute: ''
author: ''
---

<Sponsorship />

After using the MacBook Pro 2015 for several years, I upgraded to a MacBook Pro 2021 a while ago. The years with my previous Mac were fantastic, and now, with the newer MacBook Pro, I continue to work efficiently on my freelance web development projects. My goal is to keep this MacOS setup for web development up-to-date for you. This is everything I got in 2024:

# MacBook Pro Specification

- 14-inch
- Apple M1 Pro mit 10‑Core CPU, 16‑Core GPU und 16‑Core Neural Engine
- 32 GB RAM
- 512 GB SSD
- QWERTY = English (International)
- macOS Sonoma (formerly Ventura)

# System Preferences

- Appearance
  - Dark Mode
  - Show Scroll Bars -> "Always"
    - Ugly, but better for web development
- Dock
  - Remove most applications from Dock
  - Automatic Hide
  - Smaller Dock
  - "Show recent applications in Dock" -> off
  - "Show indicators for open applications" -> on
  - Battery -> "Show Percentage"
- Display
  - Nightshift
- Security
  - Touch ID
- Notifications
  - Off, except for Calendar
- Siri
  - Disabled
- Trackpad
  - Tap to Click
  - Point & Click -> Look up & data detectors off
  - More Gestures -> Notification Centre off
- Keyboard
  - Text
    - disable "Capitalise word automatically"
    - disable "Add full stop with double-space"
    - disable "Use smart quotes and dashes"
    - use `"` for double quotes
    - use `'` for single quotes
  - Keyboard -> Mission Control -> disable all
  - Press FN to -> "Do Nothing"
  - Keyboard Shortcuts -> Spotlight -> CMD + Space disable
    - We will be using Raycast instead
- Mission Control
  - Hot Corners: disable all
- Finder
  - General
    - New Finder windows show: [Downloads]
    - Show these items on the desktop: disable all
  - Sidebar:
    - activate all Favorites
    - move Library to Favorites
  - Show only:
    - Desktop
    - Downloads
    - Documents
    - [User]
    - Library
  - Tags
    - disable all
  - Advanced
    - Show all Filename Extensions
    - Remove Items from Bin after 30 Days
    - View -> Show Preview (e.g. image files)
- Sharing
  - "Change computer name"
    - Also terminal:
      - sudo scutil --set ComputerName "newname"
      - sudo scutil --set LocalHostName "newname"
      - sudo scutil --set HostName "newname"
  - "Make sure all file sharing is disabled"
- Security and Privacy
  - Turn on FileVault
  - Add Browser to "Screen Recording"
- Storage
  - Remove Garage Band & Sound Library
  - Remove iMovie
- Trackpad
  - Speed: Max
- Accessibility
  - Scroll Speed: Max

# System Preferences (Terminal)

Override more system preferences from the terminal ...

```text
# take screenshots as jpg (usually smaller size) and not png
defaults write com.apple.screencapture type jpg

# do not open previous previewed files (e.g. PDFs) when opening a new one
defaults write com.apple.Preview ApplePersistenceIgnoreState YES

# show Library folder
chflags nohidden ~/Library

# show hidden files
defaults write com.apple.finder AppleShowAllFiles YES

# show path bar
defaults write com.apple.finder ShowPathbar -bool true

# show status bar
defaults write com.apple.finder ShowStatusBar -bool true

killall Finder;
```

# Files

- If files from previous machine are needed, transfer via external drive instead of cloud

# Homebrew

Install [Homebrew](https://brew.sh) as package manager for macOS:

```text
# paste in terminal and follow the instructions
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Update everything in Homebrew to recent version:

```text
brew update
```

Install GUI applications (read more about these in GUI Applications):

```text
brew install --cask \
  raycast \
  bitwarden \
  google-chrome  \
  firefox \
  brave-browser \
  tor \
  iterm2 \
  visual-studio-code \
  docker \
  rectangle \
  slack \
  discord \
  signal \
  vlc \
  calibre \
  figma \
  imageoptim \
  maccy \
  protonvpn \
  zoom \
  skype \
  sequel-ace \
  ngrok \
  obs \
  keycastr \
  shotcut
```

Install terminal applications (read more about these in Terminal Applications):

```text
brew install \
  wget \
  exa \
  git \
  nvm \
  yarn \
  pnpm \
  graphicsmagick \
  commitizen \
  cmatrix \
  vips
```

# GUI Applications

- [Raycast](https://www.raycast.com/) (spotlight replacement)
  - enabled
    - File Search
    - Snippets
    - System
  - shortcuts
    - CMD + Space
- [Bitwarden](https://bitwarden.com/) (password manager)
  - Preferences:
    - enable dark mode
    - enable Touch ID
- [Google Chrome](https://www.google.com/chrome/) (web development, web browsing)
  - Preferences
    - set default browser
    - enable dark mode
    - never save passwords
    - always show bookmarks
    - import bookmarks from previous machine
  - Chrome Developer Tools
    - enable dark mode
    - Network -> only "Fetch/XHR"
  - Chrome Extensions
    - [uBlock Origin](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=en)
    - [Bitwarden](https://chrome.google.com/webstore/detail/bitwarden-free-password-m/nngceckbapebfimnlniiiahkandclblb/related?hl=en)
    - [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
    - [GraphQL Network Inspector](https://chrome.google.com/webstore/detail/graphql-network-inspector/ndlbedplllcgconngcnfmkadhokfaaln?hl=en)
    - [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)
    - [GraphQL Network Inspector](https://chrome.google.com/webstore/detail/graphql-network-inspector/ndlbedplllcgconngcnfmkadhokfaaln?hl=en-GB)
- [Firefox](https://www.google.com/chrome/) (web development)
- [Brave](https://brave.com/) (web browsing, wallet)
- [Tor](https://brave.com/) (secret web browsing)
- [iterm2](https://iterm2.com/) (terminal)
- [Visual Studio Code](https://code.visualstudio.com/) (web development IDE)
- [Docker](https://www.docker.com/products/docker-desktop) (Docker, see [setup](/docker-macos/))
  - used for running databases (e.g. PostgreSQL, MongoDB) in container without cluttering the Mac
  - Preferences
    - enable "Use Docker Compose"
- [Rectangle](https://rectangleapp.com//) (window manager)
  - use Rectangle settings, not Spectacle
- [Slack](https://slack.com/) (team messenger)
- [Discord](https://discord.com/) (community messenger)
- [Signal](https://signal.org/en/) (messenger)
- [VLC](https://www.videolan.org/vlc/) (video player)
  - use as default for video files
- [Calibre](https://calibre-ebook.com/) (epub/ebook editor)
- [Figma](https://www.figma.com/) (design)
- [ImageOptim](https://imageoptim.com/mac) (performance)
- [Maccy](https://maccy.app/) (clipboard manager)
  - enable "Launch at Login"

# Built-in MacOS Applications

- iMessage
  - sync iCloud for iMessages just for the sake of syncing, then disable iCloud again
  - sync contacts on iCloud
  - iPhone: activate message forwarding to new Mac
- Pages
  - show word count
- Apple Mail
  - set up all email accounts with [Fastmail](https://join.fastmail.com/9219c0b0) as provider of choice
  - show most recent message at top
  - undo send delay set to off
- Notes
  - New notes start with: Body
  - Settings -> Disable: Group notes by date
- Quick Time Player
  - save to Desktop

# Terminal Applications

- [wget](https://www.gnu.org/software/wget/) (curl replacement)
- [exa](https://the.exa.website/install/macos) (ls replacement)
  - `exa`
  - `exa -a` (include hidden files)
  - `exa -l` (include additional information)
- [git](https://git-scm.com/) (version control)
- [nvm](https://github.com/nvm-sh/nvm) (node version manager)
- [pnpm](https://pnpm.io/) (node package manager)
- [graphicsmagick](http://www.graphicsmagick.org/) ([screenshot/visual regression testing](https://loki.js.org/))
- [commitzen](https://commitizen-tools.github.io/commitizen/)
- [cmatrix](https://github.com/abishekvashok/cmatrix) (terminal screensaver)
- vips ([support for old Gatsby.js version on M1](https://github.com/lovell/sharp/issues/2460#issuecomment-751491241))

# iTerm2

The look and feel we want to achieve from our terminal:

![](./images/terminal.png)

- Make iterm2 Default Term
- Preferences ->
  - General -> Window
    - unselect "Native full screen windows"
    - select "close windows when closing an app"
  - Appearance ->
    - Windows
      - select "Hide scrollbars"
    - Tabs
      - unselect "Show tab bar in fullscreen"
    - Dimming
      - Unselect all dimming
  - Profiles -> Window
    - Transparency: 30
    - Style: Full Screen
    - Screen: Main Screen
  - Profiles -> Advanced
    - Semantic History -> Open with editor ... -> VS Code
  - [Open new split pane with current directory](https://apple.stackexchange.com/a/337386)
  - [Natural Text Editing](https://apple.stackexchange.com/a/293988)
- Bring it to fullscreen Command + Enters

# Oh My Zsh

When you open iTerm2, you see that MacOS already comes with zsh as default shell. Install [Oh My Zsh](https://ohmyz.sh/) for an improved (plugins, themes, ...) terminal (here: iTerm2) experience:

```text
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Update everything (e.g. plugins) in Oh My Zsh to recent version:

```text
omz update
```

Important: If you change something in your Zsh configuration (_.zshrc_), force a reload:

```text
source ~/.zshrc
```

**Oh My Zsh Theme + Fonts:**

Install [Starship](https://starship.rs/) as your new terminal theme. We will use Homebrew, but you can use an alternative from the website too:

```text
brew install starship
```

Make it the default theme for Oh My ZSH from the terminal:

```text
echo 'eval "$(starship init zsh)"' >> ~/.zshrc
```

As font we will be using Hack Nerd Font in iTerm2 and VS Code. Install it via:

```text
brew tap homebrew/cask-fonts
brew install --cask font-hack-nerd-font
```

Use the new font in iTerm2: Preferences -> Profile -> Text -> Font: font-hack-nerd-font.

If the theme and font changes do not apply, reload your zsh configuration (_.zshrc_) or close/open iTerm2.

**Oh My Zsh Plugins**

- [zsh-completions](https://github.com/zsh-users/zsh-completions)
- [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)
- [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)

**ZSH Configuration File (_.zshrc_):**

```markdown
# Path to your oh-my-zsh installation.
export ZSH="$HOME/.oh-my-zsh"

# Which plugins would you like to load?
# Standard plugins can be found in $ZSH/plugins/
# Custom plugins may be added to $ZSH_CUSTOM/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(
  git
  zsh-completions
  zsh-autosuggestions
  zsh-syntax-highlighting
)

# get machine's ip address
alias ip="ipconfig getifaddr en0"

# edit global zsh configuration
alias zshconfig="vim ~/.zshrc"
# reload zsh configuration
alias zshsource="source ~/.zshrc"
# reload zsh configuration
alias ohmyzsh="cd ~/.oh-my-zsh"

# navigate to global ssh directory
alias sshhome="cd ~/.ssh"
# edit global ssh configuration
alias sshconfig="vim ~/.ssh/config"

# edit global git configuration
alias gitconfig="vim ~/.gitconfig"

# git aliases
alias gits="git status"
alias gitd="git diff"
alias gitl="git lg"
alias gita="git add ."
alias gitc="cz commit"

alias loc="npx sloc --format cli-table --format-option head --exclude 'build|\.svg$\.xml' ./"

# load zsh-completions
autoload -U compinit && compinit

# use nvm
source /opt/homebrew/opt/nvm/nvm.sh

# use starship theme (needs to be at the end)
eval "$(starship init zsh)"
```

# VS Code

The look and feel we want to achieve from our IDE:

![](./images/ide.png)

**Extensions:**

- [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) (AI Support)
- [Night Owl](https://marketplace.visualstudio.com/items?itemName=sdras.night-owl) (Theme)
- [Auto Hide](https://marketplace.visualstudio.com/items?itemName=sirmspencer.vscode-autohide) (Hides Sidebar)
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) (Shared Config)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) ([Code Style](/vscode-eslint/))
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) ([Code Format](/how-to-use-prettier-vscode/))
  - Prettier: [Formatting Toggle](https://marketplace.visualstudio.com/items?itemName=tombonnike.vscode-status-bar-format-toggle) (Toggle Prettier)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) (Visualize Git)
- [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments) (Comment Highlighting)
- [Highlight Matching Tag](https://marketplace.visualstudio.com/items?itemName=vincaslt.highlight-matching-tag)
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
- [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)
- [Vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components)
- [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)
- [Color Picker](https://marketplace.visualstudio.com/items?itemName=anseki.vscode-color)
- [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
- [Astro](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Tailwind Fold](https://marketplace.visualstudio.com/items?itemName=stivo.tailwind-fold)
- [Tailwind Documentation](https://marketplace.visualstudio.com/items?itemName=austenc.tailwind-docs)
- [FontSize Shortcuts](https://marketplace.visualstudio.com/items?itemName=fosshaas.fontsize-shortcuts)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [Pretty TypeScript Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors)
- [Increment Selection](https://marketplace.visualstudio.com/items?itemName=albymor.increment-selection)
- [GitHub Theme](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme)
- [Relative Goto](https://marketplace.visualstudio.com/items?itemName=DanielBreiner.go-to-relative)
- [Cloak](https://marketplace.visualstudio.com/items?itemName=johnpapa.vscode-cloak)

**Manual:**

- move Search feature from Activity Bar to Panel

**JSON Settings:**

```json
{
  "editor.cursorBlinking": "solid",
  "editor.cursorStyle": "block",
  "window.titleBarStyle": "native",
  "window.customTitleBarVisibility": "never",
  "window.title": "${activeEditorMedium}",
  "files.trimTrailingWhitespace": true,
  "explorer.confirmDelete": false,
  "explorer.compactFolders": false,
  "workbench.colorTheme": "GitHub Dark Default",
  "workbench.sideBar.location": "right",
  "workbench.startupEditor": "none",
  "workbench.statusBar.visible": true,
  "workbench.editor.enablePreview": false,
  "workbench.editor.restoreViewState": true,
  "terminal.integrated.fontFamily": "Hack Nerd Font Mono",
  "editor.find.addExtraSpaceOnTop": true,
  "editor.padding.top": 36,
  "editor.stickyScroll.enabled": false,
  "editor.fontFamily": "Hack Nerd Font Mono",
  "editor.fontSize": 14,
  "editor.tabSize": 2,
  "editor.lineHeight": 0,
  "editor.insertSpaces": true,
  "editor.detectIndentation": false,
  "editor.renderWhitespace": "none",
  "editor.scrollBeyondLastLine": true,
  "editor.minimap.enabled": false,
  "editor.lineNumbers": "relative",
  "editor.find.seedSearchStringFromSelection": "never",
  "breadcrumbs.enabled": false,
  // line highlight
  "editor.renderLineHighlight": "all",
  "workbench.colorCustomizations": {
    "editor.lineHighlightBackground": "#223851"
  },
  // syntax highlighting
  "files.associations": {
    ".env*": "makefile"
  },
  // prettier
  "prettier.singleQuote": true,
  "prettier.printWidth": 70,
  "editor.formatOnSave": true,
  "[markdown]": {
    "editor.formatOnSave": false
  },
  "[javascript]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "prettier.documentSelectors": ["**/*.astro"],
  "[astro]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // eslint
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit",
    "source.fixAll.eslint": "explicit",
    "source.fixAll.tslint": "explicit",
    "source.addMissingImports": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "javascript.validate.enable": false,
  "javascript.updateImportsOnFileMove.enabled": "prompt",
  "typescript.updateImportsOnFileMove.enabled": "never",
  "explorer.confirmDragAndDrop": false,
  "js/ts.implicitProjectConfig.checkJs": true,
  "editor.formatOnPaste": true,
  "editor.formatOnType": true,
  "editor.inlineSuggest.enabled": true,
  "mui-snippets.importPaths": "second level",
  "gitlens.advanced.messages": {
    "suppressCommitHasNoPreviousCommitWarning": true
  },
  "github.copilot.enable": {
    "*": true,
    "plaintext": false,
    "markdown": true,
    "scminput": false
  },
  "git.openRepositoryInParentFolders": "never",
  "workbench.activityBar.location": "hidden",
  "typescript.preferences.autoImportFileExcludePatterns": [
    "@radix-ui"
  ],
  "cSpell.enableFiletypes": [
    "!asciidoc",
    "!c",
    "!cpp",
    "!csharp",
    "!css",
    "!elixir",
    "!erlang",
    "!git-commit",
    "!go",
    "!graphql",
    "!handlebars",
    "!haskell",
    "!html",
    "!jade",
    "!java",
    "!javascript",
    "!javascriptreact",
    "!json",
    "!jsonc",
    "!jupyter",
    "!less",
    "!php",
    "!pug",
    "!python",
    "!restructuredtext",
    "!rust",
    "!scala",
    "!scminput",
    "!scss",
    "!swift",
    "!typescript",
    "!typescriptreact",
    "!vue",
    "!yaml",
    "!yml",
    "mdx"
  ]
}
```

**JSON keybindings (keybindings.json):**

```json
[
  {
    "key": "ctrl+up",
    "command": "cursorMove",
    "args": {
      "to": "up",
      "by": "line",
      "value": 10
    },
    "when": "editorTextFocus"
  },
  {
    "key": "ctrl+down",
    "command": "cursorMove",
    "args": {
      "to": "down",
      "by": "line",
      "value": 10
    },
    "when": "editorTextFocus"
  }
]
```

# Git

From terminal, set global name and email:

```text
git config --global user.name "Your Name"
git config --global user.email "you@your-domain.com"
```

Improved `git log`:

```text
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

Now use:

```text
git lg
```

Set the default branch to main instead of master:

```text
git config --global init.defaultBranch main
```

Print global git configuration:

```text
git config --list
# or alias
# gitconfig
```

# SSH

There are two common strategies for SSH keys: one SSH key to rule them all or one SSH key per service. I use the latter one and will here run yout through it by [connecting to GitHub via SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

First, create a new SSH key in the _~/.ssh_ folder:

```text
# in case the folder is not there yet
mkdir ~/.ssh

cd ~/.ssh
# or alias
# sshhome

ssh-keygen -t ed25519 -C "github"
# follow instructions
# use file name: github
# use passphrase and store it somewhere secure
```

Confirm whether passphrase was used properly by accessing private key:

```text
ssh-keygen -y -f gitHub
# confirm with passphrase
```

Create the SSH configuration file if it doesn't exist yet:

```text
# in case the file is not there yet
touch ~/.ssh/config
```

In your _~/.ssh/config_ file, add the new SSH key, so that it can get picked up for every terminal session automatically:

```text
Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/github
```

Add SSH key to MacOS' keychain:

```text
ssh-add --apple-use-keychain ~/.ssh/github
```

Add the public key to your GitHub settings via the website or via the GitHub CLI (via `brew install gh`):

```text
# copy public key and add it to https://github.com/
cat ~/.ssh/id_rsa.pub | pbcopy

# or use GitHub's CLI
gh auth login
# for the first login I think the SSH key gets added
# without the next command, but if not:

gh ssh-key add ~/.ssh/id_rsa.pub -t github
```

That's it. You have created an SSH key locally for one specific service, secured it via a passphrase, made it automatically available for every terminal session, and applied it to GitHub. In the case of GitHub, you are now able to interact with GitHub via SSH.

# NVM for Node/npm

The [node version manager (NVM)](https://github.com/nvm-sh/nvm) is used to install and manage multiple Node versions. After you have installed it via Homebrew in a previous step, type the following commands to complete the installation:

```text
echo "source $(brew --prefix nvm)/nvm.sh" >> ~/.zshrc

source ~/.zshrc
# or alias
# zshsource
```

Now install the latest LTS version on the command line:

```text
nvm install --lts
```

Afterward, check whether the installation was successful and whether the [node package manager (npm)](https://www.npmjs.com/) got installed along the way:

```text
node -v && npm -v
```

Update npm to its latest version:

```text
npm install -g npm@latest
```

And set defaults for npm:

```text
npm set init-author-name="your name"
npm set init-author-email="you@example.com"
npm set init-author-url="example.com"
```

If you are a library author, log in to npm too:

```text
npm adduser
```

That's it. If you want to list all your Node.js installation, type the following:

```text
nvm list
```

If you want to install a newer Node.js version, then type:

```text
nvm install <version> --reinstall-packages-from=$(nvm current)
nvm use <version>
nvm alias default <version>
```

If you want to list all globally installed packages, run this command:

```text
npm list -g --depth=0
```

That's it. You have a running version of Node.js and its package manager.

<Divider />

I hope my setup helps other developers to get their Mac up and running. If you have any additional ideas or want to share your setup, let me know! If you want to know more about my setup, check out my [about page](/about/).
