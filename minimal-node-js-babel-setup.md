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

I have always been of the understanding there are no common sense rules about how to create a minimal Node.js application with Babel. In my search for these answers, it seemed that every tutorial I came across showed something different. As a result, I wanted to streamline this project setup for my readers and myself, so I developed a common approach for Node.js applications with Babel. I think it is a good foundation for learning JavaScript on the command line, building sophisticated Node.js projects on top of it, releasing it as node package (library) on npm as an open source project, or to build a RESTful or GraphQL server on top of it. The final project you are going to implement here can be found in this [GitHub repository](https://github.com/rwieruch/node-babel-server).

{{% chapter_header "Node.js Project Setup" "node-js-project-setup" %}}

For any new project, there has to be a folder to allocate its configuration, and more importantly, its source code. This folder usually resides in another folder where all your other projects are found. To get started with your new project, create its folder on the command line or in your file explorer, and navigate to it.

{{< highlight javascript >}}
mkdir my-project-name
cd my-project-name
{{< /highlight >}}

Once inside the project folder, you can initialize it as {{% a_blank "npm" "https://docs.npmjs.com/cli/init" %}} project. Adding the `-y` shorthand flag tells npm it should take all the defaults. If you leave the flag out, you will need to specify the information about your project manually.

{{< highlight javascript >}}
npm init -y
{{< /highlight >}}

You can checkout the *package.json* file after initializing your project as an npm project, and it should be filled with your defaults. To change them, type the following into the command line:

{{< highlight javascript >}}
npm config list

npm set init.author.name "<Your Name>"
npm set init.author.email "you@example.com"
npm set init.author.url "example.com"
npm set init.license "MIT"
{{< /highlight >}}

After setting up your npm project, you can install node packages (libraries) to your project with npm. Once you install a new node package, it will be stored in your *package.json* file. After all, your project is a node package, too. You can use it to open source this project on npm later.

Next, on the command line or in your editor/IDE, create a *src/* folder for your project's source code. In this folder, create a *src/index.js* file as an entry point to your project:

{{< highlight javascript >}}
mkdir src
cd src
touch index.js
{{< /highlight >}}

To begin, introduce a `console.log` statement in the file to make sure your setup is running:

{{< highlight javascript >}}
console.log('Hello Node.js project.');
{{< /highlight >}}

When you go on the command line again, you can run this file with Node.js from your project's root folder:

{{< highlight javascript >}}
node src/index.js
{{< /highlight >}}

A statement log appears in the command line after the script is executed. Next, move this script into your *package.json* file, because that's where all your project's scripts will end up eventually.

{{< highlight javascript "hl_lines=5" >}}
{
  ...
  "main": "index.js",
  "scripts": {
    "start": "node src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  ...
}
{{< /highlight >}}

On the command line, run the same script as before, except with `npm start` . Every time you change the underlying start script in the *package.json* file's npm scripts, you only need to type `npm start` on the command line without the specifics of the script. Try creating more npm scripts for your needs like testing and deploying in the *package.json* file for this project later.

{{% chapter_header "Node.js with Nodemon" "node-js-nodemon" %}}

The only remaining concern is that you have start the script every time you want to try your source code. You can change this with an always-running node process. To remedy this, install the commonly used {{% a_blank "nodemon" "https://github.com/remy/nodemon" %}} library on the command line as {{% a_blank "development dependency" "https://docs.npmjs.com/files/package.json#dependencies" %}} to your project.

{{< highlight javascript >}}
npm install nodemon --save-dev
{{< /highlight >}}

Next, exchange node with nodemon in your npm start script:

{{< highlight javascript "hl_lines=5" >}}
{
  ...
  "main": "index.js",
  "scripts": {
    "start": "nodemon src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  ...
}
{{< /highlight >}}

When you run your application with `npm start` from the command line, it should keep running. The best part is that the script will execute again once you change the source code. Try adjusting your source code in the *src/index.js* file and see what happens in your command line.

{{< highlight javascript "hl_lines=1" >}}
console.log('Hello ever running Node.js project.');
{{< /highlight >}}

This little adjustment to the environment gives developers a powerful tool, because the node process executes again once you change your code. If you introduce a bug, you will see a stack trace in the command line, and the script runs again without any flaws.

{{% chapter_header "Node.js with Babel" "node-js-babel" %}}

You should be able to develop a Node.js application by now, but there is more to setting up a sophisticated Node.js project that is capable of using recent JavaScript language features (ECMAScript) that are not included in the recent Node.js versions. That's where {{% a_blank "Babel" "https://babeljs.io/" %}} becomes useful. You can install it from the command line for your project's development dependencies.

{{< highlight javascript >}}
npm install @babel/core @babel/node --save-dev
{{< /highlight >}}

Next, add it to your npm start script:

{{< highlight javascript "hl_lines=5" >}}
{
  ...
  "main": "index.js",
  "scripts": {
    "start": "nodemon --exec babel-node src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  ...
}
{{< /highlight >}}

Nothing should change when you run the application again, though that's just the surface. Under the hood, Babel transpiles your code to vanilla JavaScript. When you use an upcoming JavaScript language feature, which hasn't been introduced in Node.js, you can still use the feature in your source code. Babel makes sure that Node.js understands it. However, there is still one crucial step to include upcoming language features with Babel. You can activate different upcoming JavaScript features by adding them as presets to Babel. Let's add the most common used Babel preset to your application:

{{< highlight javascript >}}
npm install @babel/preset-env --save-dev
{{< /highlight >}}


Now, in the project's root folder, create a *.babelrc* file in the command line:

{{< highlight javascript >}}
touch .babelrc
{{< /highlight >}}

In this configuration file for Babel, you can include the recently installed dependency for unlocking the upcoming JavaScript language features.

{{< highlight javascript >}}
{
  "presets": [
    "@babel/preset-env"
  ]
}
{{< /highlight >}}

Now you can include upcoming JavaScript features in your *src/index.js* file. If you run into problems because your desired feature is not working, check whether there exists a dedicated Babel preset for it.

{{% chapter_header "Environment Variables in Node.js" "node-js-environment-variables" %}}

It is important to set data like private API keys and user credentials like password, username, and email as environmental variables, but without exposing them in the source code. For this, we put environmental variables in a dedicated file that is safe from external access. The *.env* file lets you set Node.js environment variables as accessible in your project's source code. On the command line, in your project's root folder, create a *.env* file:

{{< highlight javascript >}}
touch .env
{{< /highlight >}}

Now you can place any key value pair that you don't want in your source code in this new file.

{{< highlight javascript >}}
MY_SECRET=mysupersecretpassword
{{< /highlight >}}

{{% a_blank "dotenv" "https://github.com/motdotla/dotenv" %}} is another helpful library to make environmental variables accessible in the source code. First, install it on the command line as a normal dependency:

{{< highlight javascript >}}
npm install dotenv --save
{{< /highlight >}}

Second, import it into your *src/index.js* file  to initialize it. The environment variable from your *.env* file is now accessible in your source code.

{{< highlight javascript "hl_lines=1 5" >}}
import 'dotenv/config';

console.log('Hello Node.js project.');

console.log(process.env.MY_SECRET);
{{< /highlight >}}

Start the npm script again, and you should see the environmental variable in the command line. Now you are able to store sensible data separate from the source code.

Now, consider the following code for your *src/index.js* file, where a function is imported from another file from this project.

{{< highlight javascript >}}
import saySomething from './my-other-file.js'

import 'dotenv/config';
{{< /highlight >}}

If you use an environment variable in your *src/my-other-file.js*, it is undefined because the initialization of the dotenv package happens after the import in your *src/index.js* file. To fix it, put the dotenv initialization before your local file imports:

{{< highlight javascript >}}
import 'dotenv/config';

import saySomething from './my-other-file.js'
{{< /highlight >}}

That's a basic understanding of Node.js environment variables. They should be used to keep sensible data secure in JavaScript applications, but shouldn't be shared on public GitHub repositories when using git.

### Exercises:

* Confirm your {{% a_blank "source code" "https://github.com/rwieruch/node-babel-server" %}}
* Ask yourself:
  * What's `npm init` doing when you setup your Node.js project?
  * What benefit is Nodemon giving us?
  * Why do we need Babel?
  * Why do we need Environment Variables?

<hr class="section-divider">

This guide has shown you how to create a Node.js project from scratch, and how you can introduce upcoming JavaScript features in your Node.js environment using Babel. You have seen how npm scripts are used to start, test, and deploy applications, and how environment variables secure sensible data like private API keys and user credentials. The finished product is a node package that can be open sourced on npm, another rewarding aspect of working with the Node.js ecosystem.

{{% read_before "This tutorial is part 1 of 2 in the series." "Part 2:" "How to setup Express.js in Node.js" "https://www.robinwieruch.de/node-js-express-tutorial/" %}}

{{% read_before "This tutorial is part 1 of 2 in the series." "Part 2:" "GraphQL Server Tutorial with Apollo Server and Express" "https://www.robinwieruch.de/graphql-apollo-server-tutorial/" %}}

{{% read_before "This tutorial is part 1 of 2 in the series." "Part 2:" "Node Testing Setup with Mocha and Chai" "https://www.robinwieruch.de/node-js-testing-mocha-chai/" %}}

{{% read_before "This tutorial is part 1 of 2 in the series." "Part 2:" "How to publish a npm package?" "https://www.robinwieruch.de/publish-npm-package-node/" %}}
