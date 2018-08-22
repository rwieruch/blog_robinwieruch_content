+++
title = "The minimal Node.js with Babel Setup"
description = "A common sense minimal Node.js setup guide which uses Babel and Nodemon: Whereas Babel with the Babel Cli is used for enabling recent JavaScript language features, Nodemon is used for keeping your node process up and running ..."
date = "2018-06-18T13:50:46+02:00"
tags = ["Node", "Web Development", "Tooling", "JavaScript"]
categories = ["Node", "Web Development", "Tooling", "JavaScript"]
keywords = ["node setup", "node js setup", "node babel setup", "node js babel setup"]
news_keywords = ["node setup", "node js setup", "node babel setup", "node js babel setup"]
hashtag = "#NodeJs"
card = "img/posts/minimal-node-js-babel-setup/banner_640.jpg"
banner = "img/posts/minimal-node-js-babel-setup/banner.jpg"
contribute = "minimal-node-js-babel-setup.md"
headline = "The minimal Node.js with Babel Setup"

summary = "A common sense minimal Node.js setup guide. It uses Babel and Nodemon: Whereas Babel with the Babel Cli is used for enabling recent JavaScript language features, Nodemon is used for keeping your node process up and running."
+++

{{% sponsorship %}}

{{% pin_it_image "node js babel setup" "img/posts/minimal-node-js-babel-setup/banner.jpg" "is-src-set" %}}

{{% read_before "This tutorial is part 2 of 2 in the series." "Part 1:" "My development setup as a JavaScript web developer" "https://www.robinwieruch.de/developer-setup/" %}}

Personally I always had the feeling that there was no common sense on how to create an up and running minimal Node.js application with Babel. Every tutorial showed something different. Perhaps it was only a personal feeling, but I wanted to streamline this project setup for me and my clients and ended up with the following common approach for Node.js applications with Babel. I find it is a good foundation for getting started with learning JavaScript on the command line, building sophisticated Node.js projects on top of it, or releasing it as node package (library) on npm as open source project. The final project you are going to implement can be found in this [GitHub repository](https://github.com/rwieruch/node-babel-server).

{{% chapter_header "Node.js Project Setup" "node-js-project-setup" %}}

For any new project, there has to be a folder to allocate the project's configuration but most importantly its source code. This folder usually resides in another folder where all your other projects can be found. That's at least how I do it for my projects. In order to get started with your new project, create its folder on the command line or in your favorite folder/file explorer (e.g. MacOS finder, editor/IDE side bar) and navigate into it.

{{< highlight javascript >}}
mkdir my-project-name
cd my-project-name
{{< /highlight >}}

Now you have got the project's folder. Next you can initialize it as {{% a_blank "npm" "https://docs.npmjs.com/cli/init" %}} project. By giving it the `-y` shorthand flag, you are telling npm that it should take all the defaults. If you leave the flag out, you are in charge to specify the information about your project manually.

{{< highlight javascript >}}
npm init -y
{{< /highlight >}}

You can checkout the *package.json* file after initializing your project as npm project. It should be filled with your defaults. If you want to change your defaults, you can see and change them with the following commands on the command line:

{{< highlight javascript >}}
npm config list

npm set init.author.name "<Your Name>"
npm set init.author.email "you@example.com"
npm set init.author.url "example.com"
npm set init.license "MIT"
{{< /highlight >}}

After setting up your npm project, you can install node packages (libraries) to your project with npm itself. Once you install a new node package, it should show up in your *package.json* file. After all, your project is a node package too. You can use it later to open source this project on npm.

Next, on the command line or in your editor/IDE, create a *src/* folder for your project's source code. In this folder, create a *src/index.js* file as entry point to your project.

{{< highlight javascript >}}
mkdir src
cd src
touch index.js
{{< /highlight >}}

In the beginning, just introduce a `console.log` statement in this file for making sure that your setup is up and running.

{{< highlight javascript >}}
console.log('Hello Node.js project.');
{{< /highlight >}}

When you go on the command line again, you can run this file with Node.js from your project's root folder:

{{< highlight javascript >}}
node src/index.js
{{< /highlight >}}

The logging of the statement should appear on your command line after executing the script. Next you are going to move this script into your *package.json* file, because that's the place where all your project's scripts will end up eventually.

{{< highlight javascript "hl_lines=5" >}}
{
  ...
  "main": "index.js",
  "scripts": {
    "start": "node src/index.js"
  },
  "keywords": [],
  ...
}
{{< /highlight >}}

On the command line, you can run the same script from before, but this time with `npm start`. So every time you change your underlying start script in the *package.json* file's npm scripts, you only need to type `npm start` on the command line without the need to remember the specifics of the script. Later it is up to you to create more npm scripts for your needs (e.g. testing, deploying) in this *package.json* file for this particular project.

What's bothering now is that you have to start the script every time again when you want to test your source code. You can change this by having an ever running node process. Therefore, install the commonly used {{% a_blank "nodemon" "https://github.com/remy/nodemon" %}} library on the command line as {{% a_blank "development dependency" "https://docs.npmjs.com/files/package.json#dependencies" %}} to your project.

{{< highlight javascript >}}
npm install nodemon --save-dev
{{< /highlight >}}

Afterward, exchange node with nodemon in your npm start script:

{{< highlight javascript "hl_lines=5" >}}
{
  ...
  "main": "index.js",
  "scripts": {
    "start": "nodemon src/index.js"
  },
  "keywords": [],
  ...
}
{{< /highlight >}}

When you run your application again with `npm start` on the command line, you should see that it keeps running. The best part about it: the script will execute again once you change your source code. Try to adjust your source code in the *src/index.js* file and see what happens on your command line.

{{< highlight javascript "hl_lines=1" >}}
console.log('Hello ever running Node.js project.');
{{< /highlight >}}

This little adjustment to your development environment gives you a powerful developer experience, because once you change your code the node process will execute again. If you introduce a bug, you will see the stack trace on the command line, may fix the bug, and the script executes again without any flaws.

{{% chapter_header "Node.js with Babel" "node-js-babel" %}}

You would be able to develop a Node.js application by now. But there is more for setting up a sophisticated Node.js project where you may want to use recent JavaScript language features (ECMAScript) such as {{% a_blank "async/await" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function" %}} or the object {{% a_blank "spread operator" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax" %}} in your Node.js project, too. That's where {{% a_blank "Babel" "https://babeljs.io/" %}} comes into play. You can install {{% a_blank "babel-cli" "https://babeljs.io/docs/en/babel-cli" %}} on the command line for your project's development dependencies.

{{< highlight javascript >}}
npm install babel-cli --save-dev
{{< /highlight >}}

Then you can add it to your npm start script:

{{< highlight javascript "hl_lines=5" >}}
{
  ...
  "main": "index.js",
  "scripts": {
    "start": "nodemon --exec babel-node src/index.js"
  },
  "keywords": [],
  ...
}
{{< /highlight >}}

Nothing should have changed when running your application again. But it only seems like that. Under the hood, Babel transpiles your code to vanilla JavaScript. So whenever you use an upcoming JavaScript language feature, which is not introduced yet in Node.js, you can still use the feature in your source code and Babel makes sure that Node.js understands it. However, there is one crucial step missing to include upcoming language features when using Babel. New features in the JavaScript language are introduced in {{% a_blank "stages" "https://babeljs.io/docs/en/plugins/" %}}. So when looking for a particular new feature for the JavaScript programming language that you want to use in your application, you have to check at which stage it appears.

The following walkthrough shows you how to introduce all JavaScript features up to stage 2. First, install the necessary dependencies on the command line:

{{< highlight javascript >}}
npm install babel-preset-env babel-preset-stage-2 --save-dev
{{< /highlight >}}

Next you could use these dependencies directly in your npm start script:

{{< highlight javascript >}}
{
  ...
  "main": "index.js",
  "scripts": {
    "start": "nodemon --exec babel-node --presets env,stage-2 src/index.js"
  },
  "keywords": [],
  ...
}
{{< /highlight >}}

But let's choose a more elegant way of doing it. On the command line in your project's root folder, create a *.babelrc* file:

{{< highlight javascript >}}
touch .babelrc
{{< /highlight >}}

In this configuration file for Babel, you can include the two recently installed dependencies for unlocking the upcoming JavaScript language features.

{{< highlight javascript >}}
{
 "presets": ["env", "stage-2"]
}
{{< /highlight >}}

Now, in your *src/index.js* file, you can try to include some of these upcoming JavaScript features. It should work unless they are not included in the stage 2 specification from your *.babelrc* file. The application should be able to run once you enter `npm start` on the command line.

{{% chapter_header "Environment Variables in Node.js" "node-js-environment-variables" %}}

Sometimes it is important to set sensible data as environment variables (e.g. private API keys, user credentials such as password, username and email) for your project without exposing them in your source code. That's why there are environment variables which you can put in a dedicated file. The *.env* file is such a file, which you would put in your *.gitignore* file when working with git, for setting Node.js environment variables for your project in order to make them accessible in your source code. On your command line in your project's root folder, you can create such a *.env* file:

{{< highlight javascript >}}
touch .env
{{< /highlight >}}

Afterward, you can put any key value pair, which you wouldn't want to include in your source code, in this new file.

{{< highlight javascript >}}
MY_DATABASE_PASSWORD=mysupersecretpassword
{{< /highlight >}}

One little helper library is missing in order to make these environment variables accessible in the source code: {{% a_blank "dotenv" "https://github.com/motdotla/dotenv" %}}. First, install it on the command line as normal dependency:

{{< highlight javascript >}}
npm install dotenv --save
{{< /highlight >}}

And second, import it in your *src/index.js* file in order to initialize it. Afterward, the environment variable from your *.env* file is accessible in your source code.

{{< highlight javascript "hl_lines=1 5" >}}
import 'dotenv/config';

console.log('Hello Node.js project.');

console.log(process.env.MY_DATABASE_PASSWORD);
{{< /highlight >}}

After starting your npm script again, you should see the environment variable in the command line. Now you are able to store your sensible data separately from your source code.

There is one thing about these environment variables where you have to be careful. Consider the following code for your *src/index.js* file where you import a function from another file from your project.

{{< highlight javascript >}}
import saySomething from './my-other-file.js'

import 'dotenv/config';
{{< /highlight >}}

If you would use an environment variable in your *src/my-other-file.js*, it would be undefined, because the initialization of the dotenv package happens after the actual import in your *src/index.js* file. In order to fix it, you would have to put the dotenv initialization before your local file imports.

{{< highlight javascript >}}
import 'dotenv/config';

import saySomething from './my-other-file.js'
{{< /highlight >}}

Basically that's everything you need to know about Node.js environment variables. They should be used to keep your sensible data secure in JavaScript applications, but shouldn't be shared on public GitHub repositories when using git.

<hr class="section-divider">

The final project can be found in this [GitHub repository](https://github.com/rwieruch/node-babel-server). In conclusion, the guide has shown you how to create a Node.js project from scratch. Furthermore, by using Babel, you can introduce upcoming JavaScript features in your Node.js environment. You have seen how npm scripts can be used to start, test or deploy your application and how environment variables can be used to secure sensible data such as private API keys or user credentials. After all, the project itself is a node package which could be open sourced on npm again. That's the great part about the Node.js ecosystem.

{{% read_more "GitHub and Git Setup and Essentials" "https://www.robinwieruch.de/git-essential-commands/" %}}

{{% read_more "The minimal React + Webpack 4 + Babel Setup" "https://www.robinwieruch.de/minimal-react-webpack-babel-setup/" %}}