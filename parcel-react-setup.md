+++
title = "Getting started with React and Parcel"
description = "This guide helps you to setup React with Parcel from 0 to 1. Learn how to use Parcel and Babel in React.js with zero-configuration. Setup your own boilerplate application ..."
date = "2018-02-10T13:50:46+02:00"
tags = ["React", "JavaScript", "Tooling"]
categories = ["React", "JavaScript", "Tooling"]
keywords = ["react parcel"]
news_keywords = ["react parcel"]
hashtag = "#ReactJs"
card = "img/posts/parcel-react-setup/banner_640.jpg"
banner = "img/posts/parcel-react-setup/banner.jpg"
contribute = "parcel-react-setup.md"
headline = "Getting started with React and Parcel"

summary = "The article is a short guide on how to setup Parcel with React. Parcel is a bundler that got popular because of its zero-configuration setup for JavaScript applications. It can be used as alternative for Webpack."
+++

{{% pin_it_image "react parcel" "img/posts/parcel-react-setup/banner.jpg" "is-src-set" %}}

The following article is a short guide on how to setup Parcel with React. {{% a_blank "Parcel" "https://github.com/parcel-bundler/parcel" %}} is a bundler that got popular because of its zero-configuration setup for JavaScript applications. That's why this guide is kept fairly short yet it should give you all the essentials to setup your React project with Parcel. You can find the finished boilerplate project in {{% a_blank "this GitHub repository" "https://github.com/rwieruch/parcel-react" %}}.

It's good to know that Parcel is used as alternative for Webpack. It takes a different approach to bundle your files for your application than Webpack. Because of the rising popularity of zero-configuration tools, Webpack made the decision to offer such a configuration with Webpack 4 as well.

{{% chapter_header "Project Setup with Parcel" "project-parcel-setup" %}}

Let's get started setting up the React application with Parcel. Before you can start, make sure you have installed {{% a_blank "node and npm" "https://nodejs.org/en/" %}} so that it can be used on the command line. Afterward, create your new project folder on the command line, navigate into it and initialize it as npm project.

{{< highlight javascript >}}
mkdir react-parcel
cd react-parcel
npm init -y
{{< /highlight >}}

The last command should have generated a *package.json* file. The `-y` indicates that all default configurations should be used. In the *package.json* file you will find configurations, installed node packages and scripts later on. In the next step, install Parcel as a project dependency. You can use npm to install it on the command line. Afterward, the dependency should show up in your *package.json* file.

*From root folder (react-parcel):*

{{< highlight javascript >}}
npm install parcel-bundler --save-dev
{{< /highlight >}}

Next create a *src/* folder for your implementations. In the folder you can already create a *index.js* and a *index.html* file.

*From root folder (react-parcel):*

{{< highlight javascript >}}
mkdir src
cd src
touch index.js index.html
{{< /highlight >}}

Let's keep both files quite minimal in the next step to showcase how to run them with Parcel.

*src/index.html*

{{< highlight html >}}
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>React App bundled with Parcel</title>
  </head>
  <body>
    <script src="./index.js"></script>
  </body>
</html>
{{< /highlight >}}

*src/index.js*

{{< highlight javascript >}}
console.log('Hello Parcel Project');
{{< /highlight >}}

Last but not least, you have to add a start script in your *package.json* file. There you can use Parcel and the only argument it needs is an entry point file.

*package.json*

{{< highlight javascript "hl_lines=3" >}}
"main": "index.js",
"scripts": {
  "start": "parcel ./src/index.html",
  "test": "echo \"Error: no test specified\" && exit 1"
},
"keywords": [],
{{< /highlight >}}

Parcel is traversing trough all required files (e.g. *index.js*) to include them in the final application. Now, you can run your application from the command line with `npm start` and check the console output in your browser. It should be visible there.

As alternative to get your application running without the *package.json* start script, you could also install Parcel as a global npm package and just run the line from the script on your command line.

{{< highlight javascript >}}
npm -g install parcel-bundler
parcel ./src/index.html
{{< /highlight >}}

That's it for the zero-configuration Parcel setup. You only need to give Parcel an entry point file and it will resolve all the required files for you. In addition, you can change those files in the editor and see the change happening in the browser while Parcel is running.

{{% chapter_header "React in Parcel Setup" "react-parcel-setup" %}}

Now it's only a small step to run React in Parcel. First, you need to install React and ReactDOM on the command line. The latter is used to hook your React component, which can be the entry point to a hierarchy of React components, into your HTML file.

{{< highlight javascript >}}
npm install react react-dom
{{< /highlight >}}

Second, add an HTML element with an id to your *index.html* file.

{{< highlight html "hl_lines=7" >}}
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>React App bundled with Parcel</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="./index.js"></script>
  </body>
</html>
{{< /highlight >}}

Now React is able to hook into the HTML by using ReactDOM. In your *index.js* file, you can use ReactDOM to render HTML with JSX in place of the DOM element with the defined identifier.

{{< highlight javascript >}}
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello Parcel React Project</h1>,
  document.getElementById('root')
);
{{< /highlight >}}

If you try to run your application with Parcel on the command line now, you should get a "Unexpected token" error. This happens because the JSX from React cannot be interpreted. It's not vanilla JavaScript and thus it needs to be transpiled by {{% a_blank "Babel" "https://github.com/babel/babel" %}}. Let's install two libraries on the command line as dev dependencies which take care of it.

{{< highlight javascript >}}
npm install babel-preset-env babel-preset-react --save-dev
{{< /highlight >}}

Afterward, include them in your *package.json* file.

{{< highlight javascript "hl_lines=5 6 7 8 9 10" >}}
"scripts": {
  "start": "parcel ./src/index.html",
  "test": "echo \"Error: no test specified\" && exit 1"
},
"babel": {
  "presets": [
    "env",
    "react"
  ]
},
"keywords": [],
{{< /highlight >}}

As alternative, you can create a *.babelrc* file in your project for a dedicated place to specify your Babel configuration.

*.babelrc*

{{< highlight javascript >}}
{
  "presets": [
    "env",
    "react"
  ]
}
{{< /highlight >}}

If you are doing it this way, don't forget to remove the configuration from your *package.json* file.

That's basically it for the React in Parcel setup. You are ready to implement your React application now. If you import a component from another file in your *index.js* file, Parcel will be able to resolve it. If you import a CSS file or a image from a file, Parcel will resolve it as well.

{{< highlight javascript >}}
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import logo from './logo.svg';
import './index.css';

ReactDOM.render(
  <App>
    <img src={logo} alt="logo" />
  </App>,
  document.getElementById('root')
);
{{< /highlight >}}

If these files are in your *src/* folder, Parcel should take care of resolving them for you. That's it for a minimal React setup with Parcel and Babel. Again, you can find the {{% a_blank "repository on GitHub" "https://github.com/rwieruch/parcel-react" %}}. However, Parcel should make it fairly easy to setup a React project on your own. It's zero-configuration after all, so just give it a shot.

{{% read_more "Setup React with Babel and Webpack" "https://www.robinwieruch.de/minimal-react-webpack-babel-setup/" %}}
