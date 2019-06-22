+++
title = "How to set up a Webpack project [Tutorial]"
description = "A Webpack setup tutorial that walks you through your first JavaScript application set up with Webpack. Bonus: You will add Babel to enable advanced JavaScript features ..."
date = "2019-06-15T13:51:46+02:00"
tags = ["JavaScript", "Tooling"]
categories = ["JavaScript", "Tooling"]
keywords = ["webpack setup", "webpack tutorial", "webpack babel"]
news_keywords = ["webpack setup", "webpack tutorial", "webpack babel"]
hashtag = "#Webpack"
card = "img/posts/webpack-setup-tutorial/banner_640.jpg"
banner = "img/posts/webpack-setup-tutorial/banner.jpg"
contribute = "webpack-setup-tutorial.md"
headline = "How to set up a Webpack project [Tutorial]"

summary = "A Webpack setup tutorial that walks you through your first JavaScript application set up with Webpack. Bonus: You will add Babel to enable advanced JavaScript features."
+++

{{% sponsorship %}}

{{% pin_it_image "webpack setup tutorial" "img/posts/webpack-setup-tutorial/banner.jpg" "is-src-set" %}}

{{% read_before_2 "This tutorial is part 2 of 3 in the 'Frontend Setup'-series." "Part 1:" "How to set up a modern JavaScript project" "https://www.robinwieruch.de/javascript-project-setup-tutorial/" "Part 3:" "How to set up Webpack with Babel" "https://www.robinwieruch.de/webpack-babel-setup-tutorial/" %}}

Webpack is a JavaScript bundler for your web application. In the past, you had to link JavaScript files manually in HTML files. Nowadays, Webpack takes care about it. In this tutorial, I want to walk you through a minimal Webpack setup for a JavaScript + HTML application. Afterward, you should be able to extend Webpacks features, advance your JavaScript application, or structure the HTML of your website yourself.

{{% chapter_header "Project File/Folder Structure" "project-structure" %}}

We will start with creating a distribution folder. The folder will be used to serve your application from a local or remote web server later on. Serving the app makes it possible to view it in the browser or to host it on an external hosting server which makes it accessible for everyone via {{% a_blank "HTTP" "https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol" %}}. After all, the distribution folder will be everything you need to publish your web application. To get you started, create the distribution folder and a HTML file as entry point to your application from your project's root directory on the command line:

{{< highlight javascript >}}
mkdir dist
cd dist
touch index.html
{{< /highlight >}}

The naming of the folder is up to you. Often you will find it named as *dist*, *public*, or *build*. Also you can give the HTML file a name yourself. However, calling it *index.html* is a widely used naming convention again. So you may want to keep it this way for now. As next step, give the created *dist/index.html* file the following content:

{{< highlight javascript >}}
<!DOCTYPE html>
<html>
  <head>
    <title>Hello Webpack</title>
  </head>
  <body>
    <div>
      <h1>Hello Webpack</h1>
    </div>
  </body>
</html>
{{< /highlight >}}

The file contains all the HTML to display your website in a browser. No JavaScript is involved yet. In order to get you started with JavaScript, put the following logging in a *src/index.js* file:

{{< highlight javascript >}}
console.log('Hello Webpack Project.');
{{< /highlight >}}

As for now, you should have a *dist/* and *src/* folder for your project:

{{< highlight javascript >}}
- dist/
-- index.html
- src/
-- index.js
- package.json
{{< /highlight >}}

You may wonder: Why don't we put all files into one folder? That's because in the next steps we will make sure that all JavaScript source code files from the *src/* folder will get bundled into a single JavaScript file which will be placed automatically into the *dist/* folder. By keeping this separation of folders, you can be sure that everything you need to take your application to production on a web server sits in the *dist/* folder and everything to implement your application sits in the *src/* folder.

Now, the most straightforward approach to link JavaScript to your HTML file would be the following way:

{{< highlight javascript "hl_lines=10" >}}
<!DOCTYPE html>
<html>
  <head>
    <title>Hello Webpack</title>
  </head>
  <body>
    <div>
      <h1>Hello Webpack</h1>
    </div>
    <script src="../src/index.js"></script>
  </body>
</html>
{{< /highlight >}}

However, this may become a tedious task over time, because you have to keep track of what JavaScript you link to your HTML file. That's why we are using Webpack to generate **one JavaScript bundle** from all our source code in the *src/* folder, which will be automatically put into your *dist/* folder afterward. Then, it can be used in our entry point HTML file the following way:

{{< highlight javascript "hl_lines=10" >}}
<!DOCTYPE html>
<html>
  <head>
    <title>Hello Webpack</title>
  </head>
  <body>
    <div>
      <h1>Hello Webpack</h1>
    </div>
    <script src="./bundle.js"></script>
  </body>
</html>
{{< /highlight >}}

Therefore, we will need to set up Webpack to bundle our source code for us. Let's get into Webpack.

{{% chapter_header "Webpack Setup" "webpack-setup" %}}

You will use {{% a_blank "Webpack" "https://github.com/webpack/webpack" %}} to bundle your JavaScript source code, but also to add advanced features to *build* your project with further build steps later on. Moreover, you will use the {{% a_blank "Webpack Dev Server" "https://github.com/webpack/webpack-dev-server" %}} to serve your project in a local environment with a local web server for development purposes. Last but not least, you need the {{% a_blank "Webpack CLI" "https://github.com/webpack/webpack-cli" %}} as well. Let's install all three dependencies as libraries (node packages) by using npm for your project. From your project's root directory, type the following command to install all libraries as development dependencies:

{{< highlight javascript >}}
npm install --save-dev webpack webpack-dev-server webpack-cli
{{< /highlight >}}

*Note: Development dependencies (short: dev dependencies, indicated with `--save-dev`) are not bundled in your production code later on. This way, you keep the bundle for your production code lightweight. For instance, if you want to test your source code later on, you can do this in your local development mode with all the testing libraries installed as dev dependencies, but later on these libraries will not be included in the actual application for production. Only the dependencies for running the source code are needed as production ready dependencies. They can be installed without the `--save-dev` flag.*

As a side effect, you should find a *node_modules/* folder with all your third party dependencies. Usually you don't need to worry about them in there. Also the dependencies will be listed in the *package.json* file. Check it yourself to see the dependencies with their version numbers. By now, your folder structure should look like the following:

{{< highlight javascript >}}
- dist/
-- index.html
- src/
-- index.js
- node_modules/
- package.json
{{< /highlight >}}

In your *package.json* file, change the start script to the following script for using the Webpack Dev Server:

{{< highlight javascript "hl_lines=4" >}}
{
  ...
  "scripts": {
    "start": "webpack-dev-server --mode development",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  ...
}
{{< /highlight >}}

You can run your *npm start* script on the command line again, however, this time you have Webpack as local web server to serve your files in development mode. Navigate to your *dist/index.html* file to see its output in the browser. You may also see in the developer tools of your browser that our *bundle.js* cannot be found. That's because we didn't tell Webpack yet to generate it for us. Next, let's see how we can bundle our source code files from the *src/* folder into the *dist/* folder with Webpack. Therefore, add the following addition to your npm start script in your *package.json* file:

{{< highlight javascript "hl_lines=4" >}}
{
  ...
  "scripts": {
    "start": "webpack-dev-server --config ./webpack.config.js --mode development",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  ...
}
{{< /highlight >}}

The script defines that you want to use the Webpack Dev Server with a configuration file called *webpack.config.js*. Let’s create the required *webpack.config.js* file in your project's root directory:

{{< highlight javascript >}}
touch webpack.config.js
{{< /highlight >}}

Your folder structure should look like the following now:

{{< highlight javascript >}}
- dist
-- index.html
- node_modules
- src
-- index.js
- package.json
- webpack.config.js
{{< /highlight >}}

Finish the Webpack setup by providing the following configuration for the new *webpack.config.js* file:

{{< highlight javascript >}}
module.exports = {
  // 1
  entry: './src/index.js',
  // 2
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  // 3
  devServer: {
    contentBase: './dist'
  }
};
{{< /highlight >}}

The Webpack configuration file gives the following instructions:

* (1) Use the *src/index.js* file as entry point to bundle it. If the *src/index.js* file imports other JavaScript files, bundle them as well.
* (2) The bundled source code files shall result in a *bundle.js* file in the */dist* folder.
* (3) The */dist* folder will be used to serve our application to the browser.

After all, you should be able to start the Webpack Dev Server again. Before, make sure that your *dist/index.html* includes the generated *bundle.js* file as already shown previously:

{{< highlight javascript "hl_lines=10" >}}
<!DOCTYPE html>
<html>
  <head>
    <title>Hello Webpack</title>
  </head>
  <body>
    <div>
      <h1>Hello Webpack</h1>
    </div>
    <script src="./bundle.js"></script>
  </body>
</html>
{{< /highlight >}}

After starting the application with `npm start`, open the {{% a_blank "application in your browser" "http://localhost:8080/" %}}. Note: The URL for the browser should be visible on the command line too. Once you opened your application in the browser, you should be able to see the output of your *dist/index.html* file and the logging from your *src/index.js* file. If more JavaScript source code files get imported from the *src/index.js* file, they will be bundled in the *bundle.js* by Webpack as well.

### Exercises:

* Confirm your {{% a_blank "source code for the last section" "https://github.com/rwieruch/minimal-webpack-setup" %}}
* Add a button element to your *dist/index.html* file
* Add a click handler for this new button in your *src/index.js* file

{{% read_before_2 "This tutorial is part 2 of 3 in the 'Frontend Setup'-series." "Part 1:" "How to set up a modern JavaScript project" "https://www.robinwieruch.de/javascript-project-setup-tutorial/" "Part 3:" "How to set up Webpack with Babel" "https://www.robinwieruch.de/webpack-babel-setup-tutorial/" %}}