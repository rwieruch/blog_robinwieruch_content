---
title: "How to Micro Frontend with React"
description: "This tutorial shows an example how to create a micro frontend architecture for React with Webpack ..."
date: "2020-03-10T07:52:46+02:00"
categories: ["React"]
keywords: ["react micro frontend"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Micro Frontends are the equivalent for Microservices: Whereas microservices are an architecture to split up monolithic backend applications into smaller services, micro frontends can be used to achieve the same on the frontend. But they are not as popular as microservices yet.

For my last client, I made a experimental spike for a Micro Frontend React with  Webpack scenario. Here I want to share what I came up with. The finished experimental micro frontend application can be found [here](https://github.com/rwieruch/react-micro-frontend-example).

# React Frontend

We will start with this [advanced React with Webpack setup](https://github.com/rwieruch/advanced-react-webpack-babel-setup). Also you will need an installation of React Router. Let's go through the React components step by step. This is our *src/index.js* root entry point:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const title = 'My React Micro Frontend';

ReactDOM.render(
  <App title={title} />,
  document.getElementById('app')
);
```

From there, we have a App component in *src/App/index.js*:

```javascript
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

import * as routes from '../constants/routes';
import Programming from '../Programming';
import Installation from '../Installation';

const App = ({ title }) => (
  <Router>
    <h1>{title}</h1>

    <ul>
      <li>
        <Link to={routes.PROGRAMMING}>Programming</Link>
      </li>
      <li>
        <Link to={routes.INSTALLATION}>Installation</Link>
      </li>
    </ul>

    <Routes>
      <Route path={routes.PROGRAMMING} element={<Programming />} />
      <Route path={routes.INSTALLATION} element={<Installation />} />
    </Routes>
  </Router>
);

export default App;
```

The App component takes care of the routing with React router, therefore displays the navigation with links, and renders depending on the route a Programming or Installation component. Both of these components will be our micro frontends. But more about this later.

For the sake of completeness, this is the *src/constants/routes.js* file:

```javascript
export const PROGRAMMING = '/';
export const INSTALLATION = '/installation';
```

Each micro frontend component, here Installation and Programming, exist in their own folder. One in *src/Installation/index.js* and one in *src/Programming/index.js*:

```javascript
// src/Installation/index.js

import React from 'react';

const Installation = () => (
  <div style={{ backgroundColor: 'yellow', padding: '20px' }}>
    <h1>Installation</h1>
  </div>
);

export default Installation;

// src/Programming/index.js

import React from 'react';

const Programming = () => (
  <div style={{ backgroundColor: 'green', padding: '20px' }}>
    <h1>Programming</h1>
  </div>
);

export default Programming;
```

The folder structure should look similar to this one:

```text
- src/
-- App
--- index.js
-- constants
--- routes.js
-- Installation
--- index.js
-- Programming
--- index.js
```

So far, all components are pretty much coupled to each other. The App component renders the Installation and Programming components. Let's move over to our Webpack setup to enable the micro frontend architecture with these React components.

# Webpack Micro Frontend

We will start with the *package.json* file and move all the layers down to our Webpack configuration file. Previously we had only one script to start this React application. Now we extend it with two more commands to start one of our micro frontends:

*package.json*

```javascript{5-6}
{
  ...
  "scripts": {
    "start": "webpack serve --config build-utils/webpack.config.js --env env=dev",
    "start:programming": "webpack serve --config build-utils/webpack.config.js --env env=dev --env micro=Programming",
    "start:installation": "webpack serve --config build-utils/webpack.config.js --env env=dev --env micro=Installation",
    ...
  },
  ...
}
```

The only thing changed to the previous start script are these new `--env micro` flags. That's how we can distinguish in Webpack which application should start as micro frontend. Our *build-utils/webpack.config.js* file looks like this one:

```javascript
const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.common.js');

const getAddons = addonsArgs => { ... };

module.exports = ({ env, addon }) => {
  const envConfig = require(`./webpack.${env}.js`);

  return webpackMerge(commonConfig, envConfig, ...getAddons(addon));
};
```

*Note: The environment config depends on the other `env` flag that is passed in to evaluate between development or production build. The `getAddons` function is optional, if you have Webpack addons in place. Check again [how to set up a build process and addons with Webpack](/webpack-advanced-setup-tutorial/).*

Now we change this implementation to the following:

```javascript{3,5}
...

module.exports = ({ env, micro, addon }) => {
  const envConfig = require(`./webpack.${env}.js`);
  const commonConfig = require('./webpack.common.js')(micro);

  return webpackMerge(commonConfig, envConfig, ...getAddons(addon));
};
```

This change assumes that our *build-utils/webpack.common.js* file doesn't export a configuration object anymore, but a function which return the configuration object. Essentially depending on the `micro` flag, this function returns an appropriate configuration. We are doing this for the common Webpack configuration here, but it would work the same with the development or production Webpack configuration files, if the flag would be needed there.

Now in the *build-utils/webpack.common.js* file, we only have to adjust two things. We transform the following object:

```javascript
module.exports = {
  entry: './src/index.js',
  ...
};
```

To a function which returns an object, has the `micro` flag as argument, and returns depending on whether we want to return a micro frontend or not the appropriate entry point file. If there is no `micro` flag, we return the standard `src/index.js` file which renders the App component, if there is a `micro` flag we return a dynamic file from our source folder:

```javascript{1-2,4}
module.exports = micro => ({
  entry: micro ? `./src/${micro}/standalone.js` : './src/index.js',
  ...
});
```

We don't have this *standalone.js* file yet. We need to offer these new entry point files for our micro frontends in our source folder. That happens next.

# React Micro Frontend

Let's go through the first micro frontend *standalone.js* file which is *src/Installation/standalone.js*:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import Installation from '.';

const InstallationStandalone = () => {
  const props = {};

  return <Installation isStandalone {...props} />;
};

ReactDOM.render(
  <InstallationStandalone />,
  document.getElementById('app')
);
```

This file takes the regular Installation component, which has been used in the App component before, and wraps it into another React component (here InstallationStandalone). This new wrapping component is then used to render everything with React DOM.

What's important about this new wrapper component (InstallationStandalone) is that you can provide any information to the Installation component which isn't coming from the App component anymore. Previously the App component may would provide data to the Installation component. Now this data isn't available anymore, because the Installation component has to render on its own. That's where the InstallationStandalone component comes into play to provide this data as props.

We can apply the same for the second micro frontend *standalone.js* file which is *src/Programming/standalone.js*. Notice the `isStandalone` flag, which helps us later to identify in the micro frontend component (here Programming) whether its rendered standalone as micro frontend or as one part of a larger monolith.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import Programming from '.';

const ProgrammingStandalone = () => {
  const props = {};

  return <Programming isStandalone {...props} />;
};

ReactDOM.render(
  <ProgrammingStandalone />,
  document.getElementById('app')
);
```

The `isStandalone` flag can be used in each component. We will use it to render a link to the other micro frontend component, but only if the component itself isn't a micro frontend. In *src/Installation/index.js* we do:

```javascript{2,4,6,10-16}
import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';

const Installation = ({ isStandalone }) => (
  <div style={{ backgroundColor: 'yellow', padding: '20px' }}>
    <h1>Installation</h1>

    {!isStandalone && (
      <ul>
        <li>
          <Link to={routes.PROGRAMMING}>Back to Programming</Link>
        </li>
      </ul>
    )}
  </div>
);

export default Installation;
```

And in *src/Programming/index.js* we do:

```javascript{2,4,6,10-16}
import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';

const Programming = ({ isStandalone }) => (
  <div style={{ backgroundColor: 'green', padding: '20px' }}>
    <h1>Programming</h1>

    {!isStandalone && (
      <ul>
        <li>
          <Link to={routes.INSTALLATION}>Back to Installation</Link>
        </li>
      </ul>
    )}
  </div>
);

export default Programming;
```

Now you can try to run your new micro frontend npm scripts. Whereas `npm start` create the whole monolith application with the App component, the other new npm scripts only create the micro frontends:

```text
npm run start:programming
npm run start:installation
```

You are able to run both micro frontends on their own. If they are run on their own, their standalone wrapper component is used to be render in HTML and to provide additional props which would normally come from the App component.

<Divider />

What you have seen is only a first spike on how to create a micro frontend architecture with Webpack and React. There are still a lot of more things to consider:

* There should be micro frontend scripts for testing and building too.
* Should every micro frontend folder have its own *package.json* file to execute its scripts without the monolith?
  * And if yes, should it have listed all the dependencies from the monolith or just copy them over?
  * Should all tests be executed from the monolith or move to the *package.json* file of the micro frontend?
* How to separate micro frontends and monolith into their own version control systems?

Anyway, if you were looking for how to create a micro frontend with React, I hope this walkthrough has helped you to get an idea about how to achieve it.
