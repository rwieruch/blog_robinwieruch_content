
+++
title = "How to use Prettier in VS Code"
description = "Tutorial on how to install Prettier for VS Code (Visual Studio Code). Get to know how to configure Prettier to format on save and how to write a configuration file for line length and other formatting options ..."
date = "2019-06-14T13:50:46+02:00"
tags = ["JavaScript", "VS Code", "Web Development", "Tooling", "Prettier", "ESLint"]
categories = ["JavaScript", "VS Code", "Web Development", "Tooling", "Prettier", "ESLint"]
keywords = ["vscode prettier", "vscode prettier on save", "vscode prettier format on save", "vscode prettier line length", "install prettier vscode"]
news_keywords = ["vscode prettier", "vscode prettier on save", "vscode prettier format on save", "vscode prettier line length", "install prettier vscode"]
hashtag = "#VSCode"
card = "img/posts/how-to-use-prettier-vscode/banner_640.jpg"
banner = "img/posts/how-to-use-prettier-vscode/banner.jpg"
contribute = "how-to-use-prettier-vscode.md"
headline = "How to use Prettier in VS Code"

summary = "Tutorial on how to install Prettier for VS Code (Visual Studio Code). Get to know how to configure Prettier to format on save and how to write a configuration file for line length and other formatting options."
+++

{{% sponsorship %}}

{{% pin_it_image "vscode prettier" "img/posts/how-to-use-prettier-vscode/banner.jpg" "is-src-set" %}}

{{% read_before "This tutorial is part 1 of 2 in this series." "Part 2:" "How to make Prettier work with ESLint" "https://www.robinwieruch.de/prettier-eslint" %}}

A brief step by step tutorial on how to install and use Prettier in VS Code. {{% a_blank "Prettier" "https://prettier.io/" %}} is an opinionated code formatter which ensures one unified code format. It can be used within VS Code by installing it from the VS Code marketplace. Once you have integrated it in VS Code, you can configure Prettier to format your files when saving them or committing them to a version control system (e.g. Git, SVN). This way, you never need to worry about your source code formatting and Prettier takes care about it. In addition, you can give Prettier a global or project based configuration file to adapt it to your needs. For instance, you can decide the length of your code lines and when the code line should break into two lines.

*Note: If you want to get started with React in VS Code, you may want to follow either the [MacOS](https://www.robinwieruch.de/react-js-macos-setup/) or [Windows](https://www.robinwieruch.de/react-js-windows-setup/) setup before continuing with this tutorial. Afterward, continue with this tutorial to integrate Prettier into Visual Studio Code.*

{{% chapter_header "How to install Prettier in VS Code" "how-to-install-prettier-vscode" %}}

First, install Prettier globally as node package: `npm install -g prettier`. You can install Prettier for every project individually too, but since Prettier should become second nature eventually, make it easier for yourself and install it to your globally installed npm packages.

Second, {{% a_blank "install Prettier as VS Code extension" "https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode" %}}. Once you have installed it, you can use it with `CTRL + CMD + P` (MacOS) or `CTRL + Shift + P` (Windows) to manually format a file or a selection of code. You should have an opened file to perform it. If you don’t want to format your file manually every time, you can format it on save as well. Therefore you need to open your Visual Studio Code User's settings/preferences as JSON and put in the following configuration:

{{< highlight javascript >}}
// Set the default
"editor.formatOnSave": false,
// Enable per-language
"[javascript]": {
    "editor.formatOnSave": true
}
{{< /highlight >}}

If you open up the VS Code User's settings/preferences as UI, search for "Format On Save" and make sure to activate it. Afterward, the file should format automatically once you save it. Now you don’t need to worry about your code formatting anymore, because Prettier takes care of it. You and your team can follow one code format.

{{% chapter_header "How to configure Prettier" "how-to-configure-prettier" %}}

If you want to have a configuration for each project, you can add a *.prettierrc* configuration file to it. On the command line, add the following file to your project root directory:

{{< highlight javascript >}}
touch .prettierrc
{{< /highlight >}}

The following configuration is only my personal recommendation for a Prettier configuration file in a project, but you can find all available configuration over {{% a_blank "here" "https://prettier.io/docs/en/configuration.html" %}}.

{{< highlight javascript >}}
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 70,
}
{{< /highlight >}}

After setting up this configuration, Prettier makes sure that trailing semicolons and commas are enforced, that only single quotes are used, and that the line length is set to the given number of characters. Prettier should be able to format your code with the general configuration file but also for each project individually by doing it the shown way.

{{% read_before "This tutorial is part 1 of 2 in this series." "Part 2:" "How to make Prettier work with ESLint" "https://www.robinwieruch.de/prettier-eslint" %}}