---
title: "How to make Prettier work with ESLint"
description: "Brief step by step tutorial on how to combine Prettier and ESLint for VSCode, Sublime, or any other IDE/editor. You will get to know the ESLint Prettier Rules that are needed to get you started ..."
date: "2019-06-14T13:50:46+02:00"
categories: ["JavaScript", "VS Code", "Web Development", "Tooling", "Prettier", "ESLint"]
keywords: ["eslint prettier", "prettier eslint", "prettier eslint vscode", "prettier eslint sublime", "prettier eslint rules"]
hashtags: ["#VSCode"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection label="This tutorial is part 2 of 2 in this series." links={[{ prefix: "Part 1:", label: "How to use Prettier in VS Code", url: "https://www.robinwieruch.de/how-to-use-prettier-vscode" }]} />

The default setup for my JavaScript projects: Prettier + ESLint. Whereas Prettier is used to autoformat my code to enforce an opinionated code format, ESLint makes sure to keep my code style in a good shape. In this brief setup guide, I want to show you how to combine Prettier with ESLint without wasting any tear. If you haven't set up Prettier yet, follow the previous tutorial to get it running in VSCode. It shouldn't be much different for other IDEs/editors, because only the extension for Prettier in the IDE/editor changes. The Prettier configuration file itself and the "format on save"-feature should be pretty similar in most environments.

# Benefits of using Prettier and ESLint

As mentioned earlier, whereas Prettier takes care of your code formatting, ESLint takes care of your code style. The former does everything automatically for you. If you have set up Prettier, you can configure it to format your file on saving it. That way, you never need to worry about your code formatting anymore. Since Prettier is highly opinionated, you can do only minor configurations. The latter, ESLint, isn't intended to perform code style fixes automatically though. Instead, ESLint warns you about code smells. For instance, it can happen that you imported something from another file, but don't make use of the imported something in your current file. ESLint will warn you about an unused import. In contrast to Prettier, ESLint is highly configurable, because it doesn't come with pre-configured rules. Once you have installed ESLint, you can configure it yourself or use one of several pre-configured ESLint configurations (e.g. Airbnb Style Guide) for an opinionated code style without thinking about a good code style yourself.

# How to combine ESLint and Prettier

First, make sure you have Prettier and ESLint installed. You can install them on a per project basis or globally with `npm install -g prettier eslint`. I like to install them globally, because I use them in every of my projects. This way, I don't need to worry about installing them for each project. However, if you are working on a project as a team, it makes sense to install both packages to your project as well.

*Note: If you install ESLint globally once, you still need to run `eslint --init` on the command line for your project. It gives you an installation prompt on the command line to step through a dynamic ESLint configuration on a per project basis. Additionally, it comes with a local installation of ESLint for your project. If you want to learn more about ESLint and its configuration, scan through this [ESLint tutorial without worrying about the part about Webpack](https://www.robinwieruch.de/webpack-eslint).*

Second, install the Prettier and ESLint extension/plugin for your editor/IDE. For instance, in VSCode you can find [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extensions on their marketplace. I guess it's quite similar for your IDE/editor of choice.

Third, install two more packages which are in charge of combining Prettier and ESLint: `npm install --save-dev eslint-config-prettier eslint-plugin-prettier`. Whereas the [former](https://github.com/prettier/eslint-config-prettier) turns off all ESLint rules that could conflict with Prettier, the [latter](https://github.com/prettier/eslint-plugin-prettier) integrates the Prettier rules into ESLint rules.

Last but not least, set the Prettier rules in your ESLint configuration. Therefore, create an *.eslintrc.json* file in the root directory of your project and give it the following configuration:

```javascript
{
  "extends": ["prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": ["error"]
  },
}
```

That's it. You are ready to use Prettier and ESLint in your project without worrying about any conflicts. ESLint knows about all your Prettier rules by integrating all the rules that are enforced by it and removing all the rules that could conflict with it. Now there shouldn't be anything in your way for an improved code style and structure. If you need to exclude folders/files from your ESLint rules, you can add these in an *.eslintignore* file (e.g. `node_modules/*`).

# Bonus: Prettier and ESLint Configuration

As mentioned before, Prettier and ESLint can be configured to a certain degree (not much configuration options for Prettier, but rather more options for ESLint). For instance, the previous tutorial for setting up Prettier in VSCode has shown you how to set up Prettier for formatting on saving a file and uses the following configuration in a *.prettierrc* file in your project's root directory:

```javascript
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 70,
}
```

Prettier makes sure that trailing semicolons and commas are enforced, that only single quotes are used, and that the line length is set to the given number of characters. In contrast, ESLint needs lots of configuration from your side, because it isn't as opinionated as Prettier. Therefore, instead of adding all the ESLint rules ourselves, we can use the most popular [code style guide for JavaScript published by Airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb). You can install it with all its dependencies: `npx install-peerdeps --dev eslint-config-airbnb`. Afterward, integrate it in your *.eslintrc.json* file:

```javascript{2}
{
  "extends": ["airbnb", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": ["error"]
  }
}
```

That's it. Both configuration files for Prettier and ESLint can be adjusted to your needs. If you need to add rules, you can do it with both files. If you need to disable a rule coming from the Airbnb style guide, you can do it in the ESLint configuration.

<ReadMore label="How to use ESLint in Webpack" link="https://www.robinwieruch.de/webpack-eslint/" />
