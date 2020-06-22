---
title: "Getting started with Oak in Deno"
description: "A comprehensive Oak with Deno tutorial for beginners. Learn what makes Oak unique with its context, middleware, and routes with Oak's Router ..."
date: "2020-06-21T09:52:46+02:00"
categories: ["Deno"]
keywords: ["deno oak", "deno oak tutorial"]
hashtags: ["#100DaysOfCode", "#Deno"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection label="This tutorial is part 2 of 2 in this series." links={[{ prefix: "Part 1:", label: "How to get started with Deno", url: "/deno-tutorial" }]} />

Oak, the successor of [Koa](https://github.com/koajs/koa) (which is the spiritual successor of [Express](/node-js-express-tutorial) in Node.js), is the most popular choice when it comes to building web applications with Deno. However, when saying web applications with Deno, it's often not for anything visible in the browser (excluding server-side rendering of a frontend application). Instead, Oak, a web application framework for Deno, enables you to build server applications in Deno. As a backend application, it is the glue between your frontend application and a potential database or other data sources (e.g. REST APIs, GraphQL APIs). Just to give you an idea, the following is a list of tech stacks to build client-server architectures:

* React.js (Frontend) + Oak (Backend) + PostgreSQL (Database)
* Vue.js (Frontend) + Oak (Backend) + MongoDB (Database)
* Angular.js (Frontend) + Oak (Backend) + Neo4j (Database)

[Oak](https://github.com/oakserver/oak) is exchangeable with other web application frameworks for the backend the same way as React.js is exchangeable with Vue.js and Angular.js when it comes to frontend applications. The Deno ecosystem doesn't offer only one solution, but various solutions that come with their strengths and weaknesses. However, for this application we will use a Oak server, because it is the most popular choice when it comes to building JavaScript backend applications with Deno.

# Oak in Deno

Let's start by using Oak in your Deno application. In your *src/server.ts* TypeScript file, use the following code to import Oak, to create an instance of an Oak application, and to start it as Oak server:

```javascript
import { Application } from 'https://deno.land/x/oak/mod.ts';

const port = 8000;
const app = new Application();

app.addEventListener('listen', () => {
  console.log(`Listening on localhost:${port}`);
});

await app.listen({ port });
```

Remember to put the event listener (addEventListener) in front of the actual listening (listen), otherwise the listener will never get executed. Once you start your application on the command line with `deno run --allow-net server.ts`, which includes the permission for network access for this server, you should be able to see the output in the command line:

```text
Listening on localhost:8000
```

Your Oak server is up and running. Everything that should happen after your Oak application has started goes into the `addEventListener` methods's [callback function](/javascript-callback-function). The `listen` method takes as first parameter a configuration object with the [port](https://en.wikipedia.org/wiki/Port_(computer_networking)) -- which we initialized with a [property shorthand in an object](/javascript-object-property-shorthand) -- for the running application . That's why after starting it, the application is available via `http://localhost:8000` in the browser, although nothing should be available at this URL yet when you visit it in your browser.

The Oak application has two methods: use and listen. While the `listen` method starts the server and starts processing requests with registered middleware, the `use` method sets up the middleware in the first place. We will set up one basic middleware with Oak before diving into this topic more in depth later:

```javascript{6-8}
import { Application } from 'https://deno.land/x/oak/mod.ts';

const port = 8000;
const app = new Application();

app.use((ctx) => {
  ctx.response.body = 'Hello Deno';
});

app.addEventListener('listen', () => {
  console.log(`Listening on localhost:${port}`);
});

await app.listen({ port });
```

This new middleware as a function will process all incoming requests for the Oak server. Try it yourself by running `deno run --allow-net server.ts` on the command line and visiting your browser on `http://localhost:8000`. You should see the "Hello Deno" text showing up.

# Context in Oak

Context in Oak represents the current request which goes through Oak's middleware. In code you see it often as `context` or `ctx`. In the previous code, we have used Oak's context to return a text to our browser by using the context's response object's body:

```javascript
...

app.use((ctx) => {
  ctx.response.body = 'Hello Deno';
});

...
```

This is one of the most straightforward usages of context in a Oak middleware. The context holds several useful properties. For example, you have access to the currently incoming request from the client with `ctx.request` while you also decide what to return to the client with `ctx.response`. You will see in the next sections how to use context for different use cases.

# Middleware in Oak

Essentially every Oak application is a just a series of middleware function calls. If there are more than one middleware, we need to understand how they are called and how to determine the order of the call stack. Let's start with one middleware which prints the HTTP method and the URL of the incoming request on the command line when visiting the application in the browser:

```javascript{7}
import { Application } from 'https://deno.land/x/oak/mod.ts';

const port = 8000;
const app = new Application();

app.use((ctx) => {
  console.log(`HTTP ${ctx.request.method} on ${ctx.request.url}`);
  ctx.response.body = 'Hello Deno';
});

app.addEventListener('listen', () => {
  console.log(`Listening on localhost:${port}`);
});

await app.listen({ port });
```

The command line should output `HTTP GET on http://localhost:8000/`. Every time a user visits a URL in a browser, a HTTP GET method is performed to the web server. In our case, the HTTP request returns just a text to the browser which reads "Hello Deno". Now, what happens if we have two middleware instead of one:

```javascript{6-8,11}
import { Application } from 'https://deno.land/x/oak/mod.ts';

const port = 8000;
const app = new Application();

app.use((ctx) => {
  console.log(`HTTP ${ctx.request.method} on ${ctx.request.url}`);
});

app.use((ctx) => {
  console.log('returning a response ...');
  ctx.response.body = 'Hello Deno';
});

app.addEventListener('listen', () => {
  console.log(`Listening on localhost:${port}`);
});

await app.listen({ port });
```

The command line should log "HTTP GET on http://localhost:8000/", but not "returning a response ..." as text. Oak stops after the first middleware in the series of middleware has been called. In order to jump from one middleware to the next middleware, we have to use Oak's next function with async/await:

```javascript{3,5}
...

app.use(async (ctx, next) => {
  console.log(`HTTP ${ctx.request.method} on ${ctx.request.url}`);
  await next();
});

app.use((ctx) => {
  console.log('returning a response ...');
  ctx.response.body = 'Hello Deno';
});

...
```

Now the output on the command line should read the following:

```text
HTTP GET on http://localhost:8000/
returning a response ...
```

Finally both middleware are called after each other. You can manipulate the order of when each middleware should be called by moving the `next` function's invocation around:

```javascript{4}
...

app.use(async (ctx, next) => {
  await next();
  console.log(`HTTP ${ctx.request.method} on ${ctx.request.url}`);
});

app.use((ctx) => {
  console.log('returning a response ...');
  ctx.response.body = 'Hello Deno';
});

...
```

The output on the command line should read:

```text
returning a response ...
HTTP GET on http://localhost:8000/
```

Basically "next" is the next middleware in the series of middleware you are calling. If "next" happens before the actual implementation logic of the middleware where it's used (like in the last example), the next middleware is executed before the implementation logic of the current middleware.

A middleware function, because it's a function, can be extracted as such and reused as middleware in your Deno application:

```javascript{1,6-9,11}
import { Application, Context } from 'https://deno.land/x/oak/mod.ts';

const port = 8000;
const app = new Application();

const logging = async (ctx: Context, next: Function) => {
  console.log(`HTTP ${ctx.request.method} on ${ctx.request.url}`);
  await next();
};

app.use(logging);

app.use((ctx) => {
  console.log('returning a response ...');
  ctx.response.body = 'Hello Deno';
});

app.addEventListener('listen', () => {
  console.log(`Listening on localhost:${port}`);
});

await app.listen({ port });
```

Often abstract middleware is often available as library for Oak. By using Oak's `use` method, we can opt-in any third-party middleware. Eventually you will run in a few of these middleware when using Deno for larger projects.

# Routes in Oak

Routes in web applications for the backend are used to map URIs to middleware. These URIs could serve a text message, a HTML page, or data in JSON via REST or GraphQL. In a larger application, this would mean having several routes (middleware) which map to several URIs.


In Oak, the router middleware is everything needed for a route, because routes are just another abstraction on top of middleware. Let's set up such a single route with Oak's Router:

```javascript{1,6,8-10,12-13}
import { Application, Router } from 'https://deno.land/x/oak/mod.ts';

const port = 8000;
const app = new Application();

const router = new Router();

router.get('/', (ctx) => {
  ctx.response.body = 'Hello Deno';
});

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener('listen', () => {
  console.log(`Listening on localhost:${port}`);
});

await app.listen({ port });
```

The route points to the root (`/`) of your domain. In the browser, you can visit this route with `http://localhost:8000/` or `http://localhost:8000` without the trailing slash. After starting the Deno application, visit the browser to see what it outputs for you. You should see the printed "Hello Deno" there.

There are a few more gotchas for the router middleware. For example, it can be used for more than one URI:

```javascript{7-12}
...

router
  .get('/', (ctx) => {
    ctx.response.body = 'Hello Deno';
  })
  .get('/1', (ctx) => {
    ctx.response.body = 'Hello Deno 1';
  })
  .get('/2', (ctx) => {
    ctx.response.body = 'Hello Deno 2';
  });

...
```

When you visit the running application in the browser, you can navigate to all these paths to receive different texts. It's also possible to have more than one Oak Router to group your application's routes into domains:

```javascript{3-19}
...

const routerOne = new Router();

routerOne.get('/1', (ctx) => {
  ctx.response.body = 'Hello Deno 1';
});

const routerTwo = new Router();

routerTwo.get('/2', (ctx) => {
  ctx.response.body = 'Hello Deno 2';
});

app.use(routerOne.routes());
app.use(routerOne.allowedMethods());

app.use(routerTwo.routes());
app.use(routerTwo.allowedMethods());

...
```

Essentially every Oak application is a just a series of routing and middleware function calls. You have seen the former, the routing with one or multiple routes, and the latter for enabling these routes or other utilities (e.g. logging). Both, middleware and routes, have access to Oak's context object for the processed request.

### Exercises:

* Confirm your [source code for the last section](https://github.com/the-road-to-deno/deno-oak).
* Define for yourself: What's a frontend and a backend application?
* Ask yourself: How do frontend and backend application communicate with each other?
* Explore alternatives for Oak.

<LinkCollection label="This tutorial is part 2 of 3 in this series." links={[{ prefix: "Part 1:", label: "How to get started with Deno", url: "/deno-tutorial" }, { prefix: "Part 3:", label: "How to create a REST API with Oak in Deno", url: "/deno-oak-rest-api" }]} />