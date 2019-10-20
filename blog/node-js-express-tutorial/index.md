---
title: "How to setup Express.js in Node.js"
description: "A Node.js with Express tutorial to learn how to setup a Node.js application step by step from scratch ..."
date: "2019-01-13T07:50:46+02:00"
categories: ["Starter", "Node"]
keywords: ["node express tutorial", "express tutorial"]
hashtags: ["#NodeJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection label="This tutorial is part 2 of 2 in this series." links={[{ prefix: "Part 1:", label: "The minimal Node.js with Babel Setup", url: "https://www.robinwieruch.de/minimal-node-js-babel-setup/" }]} />

Express.js is the most popular choice when it comes to building web applications with Node.js. However, when saying web applications, it's often not for anything visible in the browser (excluding server-side rendering). Instead, Express.js, a web application framework for Node.js, enables you to build server applications in Node.js. As a backend application, it is the glue between your frontend application and a potential database or other data sources (REST APIs, GraphQL APIs, ...). Just to give you an idea, the following is a list of tech stacks to build client-server architectures:

* React.js (Frontend) + Express.js (Backend) + PostgreSQL (Database)
* Vue.js (Frontend) + Koa.js (Backend) + MongoDB (Database)
* Angular.js (Frontend) + Hapi.js (Backend) + Neo4j (Database)

Express.js is exchangeable with other web application frameworks for the backend the same way as React.js is exchangeable with Vue.js and Angular.js when it comes to frontend applications. The Node.js ecosystem doesn't offer only one solution, but various solutions that come with their strengths and weaknesses. However, for this application we will use a Express server, because it is the most popular choice when it comes to building JavaScript backend applications with Node.js.

The Node.js application from before comes with a watcher script to restart your application once your source code has changed, Babel to enable JavaScript features that are not supported in Node.js yet, and environment variables for your application's sensitive information. That's a great foundation to get you started with Express.js in Node.js. Let's continue by installing Express.js in your Node.js application from before on the command line:

```javascript
npm install express
```

Now, in your *src/index.js* file, use the following code to import Express.js, to create an instance of an Express application, and to start it as Express server:

```javascript
import express from 'express';

const app = express();

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);
```

Once you start your application on the command line with `npm start`, you should be able to see the output in the command line:

```javascript
Example app listening on port 3000!
```

Your Express server is up and running. Everything that should happen after your Express application has started goes into the callback function. The method itself takes another parameter as first parameter which is the [port](https://en.wikipedia.org/wiki/Port_(computer_networking)) of the running application. That's why after starting it, the application is available via `http://localhost:3000`. Nothing should be available at this URL yet when you visit it in your browser though. We will get a sneak peak about this URL next before diving deeper into it later.

## Routes in Express.js

In web applications frameworks like Express.js, you can create routes once you have created your application's instance. All routes make up your application's entire routing. Let's set up such a single route:

```javascript{5,6,7}
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);
```

The route points to the root of your domain: `http://localhost:3000/` which can also be used as `http://localhost:3000` as you know from browsing online from website to website. Once you save the file, the application should restart automatically. You can verify it on the command line. Afterward, visit the browser at `http://localhost:3000` to see what it outputs for you. You should see the printed *"Hello World!"* there. That's it for your first route in Express.js. We will learn more about routes and how to interact with them later.

Essentially every Express application is a just **a series of routing and middleware function calls**. You have seen the former, the routing with a single route, previously for the `http://localhost:3000` URL or `/` route. You can extend the application with additional URIs (e.g. `http://localhost:3000/test`) by using routes in Express.js (e.g. `/test`) as shown before. Try it yourself!

## Middleware in Express.js

If an Express application consists of routing and middleware function calls, what about the middleware function calls then? There are two kinds of middleware in Express.js: application-level middleware and router-level middleware. Let's explore an application-level middleware in this section with a neat use case and dive deeper into the other aspects of both application-level and router-level middleware later.

When using Express.js, people often run into the following error in the browser when accessing their Express application: *"Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at http://localhost:3000/. (Reason: CORS header ‘Access-Control-Allow-Origin’ missing)."* It most likely happens because we are accessing a domain from a foreign domain. [Cross-origin resource sharing (CORS)](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) was invented to secure web applications on a domain level. The idea: It shouldn't be possible to access data from other domains. For instance, a web application with the domain `https://example.com` shouldn't be allowed to access another web application with `https://website.com` by default. It's used to restrict access between web applications.

Now, we can allow CORS by adding this missing CORS header, because we will run eventually into this error ourselves when implementing a consuming client application for our Express server. However, since we don't want to do this manually for every route, we can use an application-level middleware to add the CORS HTTP header to every request by default. Therefore, we could write a middleware ourselves -- we will see how this works later -- or use a Express.js middleware library which is doing the job for us.

```javascript
npm install cors
```

Next use it as a application-wide middleware:

```javascript{2,7}
import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () =>
  console.log(`Example app listening on port 3000!`),
);
```

The Express application can literally *use* a middleware, coming from an external library or built by yourself, to extend all its routes (application-level middleware). In this case, all routes are extended with CORS HTTP headers. By default all routes are accessible for all domains now. This includes later our development domains from our consuming client application too. After all, this was only a sneak peak into an Express middleware. We will learn more about application-level and router-level middleware, and how to write a middleware yourself, later.

Note: Don't worry too much about the CORS configuration if you didn't fully grasp it yet. It's one of the things many first time Express users run into, have to deal with by installing this neat library, and often never look back why they had to install and use it. If you didn't understand it yet, no worries, but at the time you deploy your application to production, you should set up a [whitelist](https://en.wikipedia.org/wiki/Whitelisting) of domains which are allowed to access your Express server application. The [CORS library](https://github.com/expressjs/cors) offers this kind of configuration. Take some time to look into it yourself.

## Environment Variables in Express.js

Before you have set up environment variables for your Node.js application. Let's use one environment variable to set up your port instead of hardcoding it in the source code. If there isn't such file, create a new *.env* file in your project. Otherwise use the *.env* file that's already there. Give it a new key value pair to define your port:

```javascript
PORT=3000
```

Now in your *src/index.js* file, import the node package which makes the environment variables available in your source code and use the `PORT` environment variable for starting your Express application.

```javascript{1,13,14,15}
import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
```

Instead of exposing the port that is used in the source code, you have stored it at a more sensitive place in your environment variables. If you are using Git with something like GitHub, you can exclude the *.env* from being uploaded to the GitHub repository by adding it to your *.gitignore* file. That's how sensitive data is kept away from public Git repositories like GitHub. If you deploy your application to production eventually, you can add the environment variables as *.env* file on your web server which is serving your application.

### Exercises:

* Confirm your [source code](https://github.com/rwieruch/node-express-server)
* Define for yourself: What's a frontend and a backend application?
* Ask yourself: How do frontend and backend application communicate with each other?
* Optional: Checkout the configuration that can be used with the CORS library
* Optional: Upload your project to [GitHub with Git](https://www.robinwieruch.de/git-essential-commands/)
  * Exclude the *.env* file from Git with a *.gitignore* file

<LinkCollection label="This tutorial is part 2 of 3 in this series." links={[{ prefix: "Part 1:", label: "The minimal Node.js with Babel Setup", url: "https://www.robinwieruch.de/minimal-node-js-babel-setup/" }, { prefix: "Part 3:", label: "How to create a REST API with Express.js in Node.js", url: "https://www.robinwieruch.de/node-express-server-rest-api/" }]} />
