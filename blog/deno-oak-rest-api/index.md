---
title: "How to create a REST API with Oak in Deno"
description: "A comprehensive Oak with Deno tutorial for REST APIs. Learn how to set up a REST API with Oak's Router in Deno to manage RESTful resources with CRUD operations ..."
date: "2020-06-29T10:52:46+02:00"
categories: ["Deno"]
keywords: ["deno oak rest api"]
hashtags: ["#Deno"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection label="This tutorial is part 3 of 3 in this series." links={[{ prefix: "Part 1:", label: "How to get started with Deno", url: "/deno-tutorial" }, { prefix: "Part 2:", label: "Getting started with Oak in Deno", url: "/deno-oak" }]} />

An Oak application is most often used as a backend application in a client-server architecture whereas the client could be written in React.js or another popular frontend solution and the server could be written in Oak. Both entities result in a client-server architecture (frontend and backend relationship) whereas the backend would be needed for (A) business logic that shouldn't be exposed as source code to the frontend application -- otherwise it would be accessible in the browser -- or for (B) establishing connections to third-party data sources (e.g. database(s)).

However, don't mistake client application *always* for frontend and server application *always* for backend here. These terms cannot be exchanged that easily. Whereas a frontend application is usually something seen in the browser, a backend usually performs business logic that shouldn't be exposed in a browser and often connects to a database as well.

```text
Frontend -> Backend -> Database
```

But, in contrast, the terms client and server are a matter of perspective. A backend application (Backend 1) which *consumes* another backend application (Backend 2) becomes a client application (Backend 1) for the server application (Backend 2). However, the same backend application (Backend 1) is still the server for another client application which is the frontend application (Frontend).

```text
Frontend -> Backend 1 -> Backend 2 -> Database

// Frontend: Client of Backend 1
// Backend 1: Server for Frontend, also Client of Backend 2
// Backend 2: Server for Backend 1
```

If you want to answer the client-server question if someone asks you what role an entity plays in a client-server architecture, always ask yourself who (server) is serving whom (client) and who (client) consumes whom's (backend) functionalities?

That's the theory behind client-server architectures and how to relate to them. Let's get more practical again. How do client and server applications communicate with each other? Over the years, there existed a few popular communication interfaces ([APIs](https://en.wikipedia.org/wiki/Application_programming_interface)) between both entities. However, the most popular one is called [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) defined in 2000 by Roy Fielding. It's an architecture that leverages the [HTTP protocol](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) to enable communication between a client and a server application. A server application that offers a REST API is also called a RESTful server. Servers that don't follow the REST architecture a 100% are rather called RESTish than RESTful. In the following, we are going to implement such REST API for our Oak server application, but first let's get to know the tooling that enables us to interact with a REST API.

### Exercises:

* What's a client-server architecture?
* Read more about [REST APIs and other APIs](/what-is-an-api-javascript/).

# cURL for REST APIs

If you haven't heard about cURL, this section gives you a short excursus about what's cURL and how to use it to interact with (REST) APIs. The definition taken from [Wikipedia](https://en.wikipedia.org/wiki/CURL) says: *"cURL [...] is a computer software project providing a library and command-line tool for transferring data using various protocols."* Since REST is an architecture that uses HTTP, a server that exposes a RESTful API can be consumed with cURL, because HTTP is one of the various protocols.

First, let's install it one the command line. For now, the installation guide is for MacOS users, but I guess by looking up "curl for windows" online, you will find the setup guide for your desired OS (e.g. Windows) too. In this guide, we will use Homebrew to install it. If you don't have Homebrew, install it with the following command on the command line:

```text
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

If you haven't heard about Homebrew, read more about it over [here](/developer-setup/). Next, install cURL with Homebrew:

```text
brew install curl
```

Now, start your Oak server from the previous sections. Once your application is started, execute `curl http://localhost:8000` in another command line window. Make sure the port matches your port and the Oak server is running. After executing the command, you should see the "Hello World!" printed on the command line. Congratulations, you just have consumed your Oak server as a client with something else than a browser.

```text
Browser (Client) -> Oak Server
cURL (Client) -> Oak Server
```

Whether you access your Oak application on `http://localhost:8000` in the browser or via the command line with cURL, you should see the same result. Both tools act as clients whereas the Oak application is your server. You will see in the next sections how to use cURL to verify your Oak application's REST API, that we are going to implement together, on the command line instead of in the browser.

### Exercises:

* Get yourself more familiar with the terms client/server and frontend/backend.
* If you want to have an alternative for cURL which works in the browser, check out [Postman](https://www.postman.com/) or [Isomnia](https://insomnia.rest/).

# Deno Routes: HTTP Methods are REST Operations

Oak is a perfect choice for a server when it comes to creating and exposing APIs (e.g. REST API) to communicate as a client with your server application. Previously you have already implemented one Oak route, which sends a "Hello Deno", that you have accessed via the browser and cURL. Let's set up more routes to accommodate a RESTful API for your Oak application eventually. Add the following routes to your Oak application whereas the URI itself doesn't change, but the method used from your Oak instance:

```javascript{8-10,12-14,16-18,20-22}
import { Application, Router } from 'https://deno.land/x/oak/mod.ts';

const port = 8000;
const app = new Application();

const router = new Router();

router.get('/', (ctx) => {
  ctx.response.body = 'Received a GET HTTP method';
});

router.post('/', (ctx) => {
  ctx.response.body = 'Received a POST HTTP method';
});

router.put('/', (ctx) => {
  ctx.response.body = 'Received a PUT HTTP method';
});

router.delete('/', (ctx) => {
  ctx.response.body = 'Received a DELETE HTTP method';
});

app.use(router.allowedMethods());
app.use(router.routes());

app.addEventListener('listen', () => {
  console.log(`Listening on: localhost:${port}`);
});

await app.listen({ port });
```

Every Oak Router instance's method maps to a HTTP method. Let's see how this works: Start your Oak server on the command line again, if it isn't running already, and execute four cURL commands in another command line window. You should see the following output for the commands:

```text
curl http://localhost:8000
-> Received a GET HTTP method

curl -X POST http://localhost:8000
-> Received a POST HTTP method

curl -X PUT http://localhost:8000
-> Received a PUT HTTP method

curl -X DELETE http://localhost:8000
-> Received a DELETE HTTP method
```

By default cURL will use a HTTP GET method. However, you can specify the HTTP method with the `-X` flag (or `--request` flag). Depending on the HTTP method you are choosing, you will access different routes of your Oak application -- which here represent only a single API endpoint with an URI so far. You will see later other additions that you can add to your cURL requests.

That's one of the key aspects of REST: It uses HTTP methods to perform operations on URI(s). Often these operations are referred to as CRUD operations for create, read, update, and delete operations. Next you will see on what these operations are used on the URIs (resources).

### Exercises:

* Confirm your [source code for the last section](https://codesandbox.io/s/github/the-road-to-deno/deno-oak-rest-api/tree/http-methods).
  * Confirm your [changes from the last section](https://github.com/the-road-to-deno/deno-oak-rest-api/compare/init...http-methods?expand=1).
* Read more about [CRUD operations](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete).
* Try some more cURL commands yourself on the command line.

# Oak Routes: URIs are REST Resources

Another important aspect of REST is that every URI acts as a resource. So far, you have only operated on the root URI with your CRUD operations, which doesn't really represent a resource in REST. In contrast, a resource could be a user resource, for example. Change your previously introduced routes to the following:

```javascript{3-4,7-8,11-12,15-16}
...

router.get('/users', (ctx) => {
  ctx.response.body = 'GET HTTP method on user resource';
});

router.post('/users', (ctx) => {
  ctx.response.body = 'POST HTTP method on user resource';
});

router.put('/users', (ctx) => {
  ctx.response.body = 'PUT HTTP method on user resource';
});

router.delete('/users', (ctx) => {
  ctx.response.body = 'DELETE HTTP method on user resource';
});

...
```

With cURL on your command line, you can go through the resource -- represented by one URI `http://localhost:8000/users` -- which offers all the CRUD operations via HTTP methods:

```text
C for Create: HTTP POST
R for Read: HTTP GET
U for Update: HTTP PUT
D for Delete: HTTP DELETE
```

You will see a similar output as before, but this time you are operating on a user resource. For example, if you want to create a user, you hit the following URI:

```text
curl -X POST http://localhost:8000/users
-> POST HTTP method on user resource
```

Obviously we don't transfer any information for creating a user yet, however, the API endpoint for creating a user would be available now. One piece is missing to make the PUT HTTP method (update operation) and DELETE HTTP method (delete operation) RESTful from a URI's point of view:

```javascript{11-12,15-16}
...

router.get('/users', (ctx) => {
  ctx.response.body = 'GET HTTP method on user resource';
});

router.post('/users', (ctx) => {
  ctx.response.body = 'POST HTTP method on user resource';
});

router.put('/users/:userId', (ctx) => {
  ctx.response.body = `PUT HTTP method on user/${ctx.params.userId} resource`;
});

router.delete('/users/:userId', (ctx) => {
  ctx.response.body = `PUT DELETE method on user/${ctx.params.userId} resource`;
});

...
```

In order to delete or update a user resource, you would need to know the exact user. That's where unique identifiers are used. In our Oak routes, we can assign unique identifiers with parameters in the URI. Then the [callback function](/javascript-callback-function) holds the URI's parameter in the context object's properties.

Optionally, Oak offers a utility function called [getQuery](https://github.com/oakserver/oak#getqueryctx-options) which allows us to retrieve all parameter from the URI:

```javascript{4,10-11,15-16}
import {
  Application,
  Router,
  helpers,
} from 'https://deno.land/x/oak/mod.ts';

...

router.put('/users/:userId', (ctx) => {
  const { userId } = helpers.getQuery(ctx, { mergeParams: true });
  ctx.response.body = `PUT HTTP method on user/${userId} resource`;
});

router.delete('/users/:userId', (ctx) => {
  const { userId } = helpers.getQuery(ctx, { mergeParams: true });
  ctx.response.body = `PUT DELETE method on user/${userId} resource`;
});

...
```

Try again a cURL operation  on `/users/1`, `/users/2` or another identifier with a DELETE or UPDATE HTTP method and verify that the identifier shows up in the command line as output.

### Exercises:

* Confirm your [source code for the last section](https://codesandbox.io/s/github/the-road-to-deno/deno-oak-rest-api/tree/uris).
  * Confirm your [changes from the last section](https://github.com/the-road-to-deno/deno-oak-rest-api/compare/http-methods...uris?expand=1).
* Try to delete or update a user by identifier with cURL.
* Read more about [basic routing in Oak](https://github.com/oakserver/oak).

# Making sense of REST with Oak

You may be still wondering: *What value brings the combination of URIs and HTTP methods* -- which make up the majority of the REST philosophy -- *to my application?*

Let's imagine we wouldn't just return a result, as we do at the moment, but would act properly on the received operation instead. For instance, the Oak server could be connected to a database that stores user entities in a user table. Now, when consuming the REST API as a client (e.g. cURL, browser, or also a [React.js application](/react-fetching-data)), you could retrieve all users from the database with a HTTP GET method on the `/users` URI or, on the same resource, create a new user with a HTTP POST method.

```text
// making sense of the naming

Oak Route's Method <=> HTTP Method <=> REST Operation
Oak Route's Path <=> URI <=> REST Resource
```

Suddenly you would be able to read and write data from and to a database from a client application. Everything that makes it possible is a backend application which enables you to write a interface (e.g. REST API) for CRUD operations:

```text
Client -> REST API -> Server -> Database
```

Whereas it's important to notice that the REST API belongs to the server application:

```text
Client -> (REST API -> Server) -> Database
```

You can take this always one step further by having multiple server applications offering REST APIs. Often they come with the name microservices or web services whereas each server application offers a well-encapsulated functionality. The servers even don't have to use the same programming language, because they are communicating over a programming language agnostic interface (HTTP with REST). Although the interfaces (APIs) don't have to be necessary REST APIs.

```text
       -> (GraphQL API -> Server) -> Database
Client
       -> (REST API -> Server) -> Database
```

Let's take everything we learned in theory, so far, one step further towards a real application by sending real data across the wire. The data will be sample data, which will not come from a database yet, but will be hardcoded in the source code instead:

```javascript{3-25}
...

let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davids',
  },
};

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2',
  },
};

...
```

As replacement to JavaScript objects, we could also use [JavaScript Maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map). In addition, since we are using TypeScript, we can define the interfaces of the entities:

```javascript{3-38}
...

interface User {
  id: string;
  username: string;
}

const users = new Map<string, User>();

users.set('1', {
  id: '1',
  username: 'Robin Wieruch',
});

users.set('2', {
  id: '2',
  username: 'Dave Davids',
});

interface Message {
  id: string;
  text: string;
  userId: string;
}

const messages = new Map<string, Message>();

messages.set('1', {
  id: '1',
  text: 'Hello World',
  userId: '1',
});

messages.set('2', {
  id: '2',
  text: 'By World',
  userId: '2',
});

...
```

Next to the user entities, we will have message entities too. Both entities are related to each other by providing the necessary information as identifiers (e.g. a message has a message creator). That's how a message is associated with a user and how you would retrieve the data from a database, too, whereas each entity (user, message) has a dedicated database table. Both are represented as objects that can be accessed by identifiers.

Let's start by providing two routes for reading the whole list of users and a single user by identifier:

```javascript{9-11,13-16}
...

const users = new Map<string, User>();

...

const router = new Router();

router.get('/users', (ctx) => {
  ctx.response.body = Array.from(users.values());
});

router.get('/users/:userId', (ctx) => {
  const { userId } = helpers.getQuery(ctx, { mergeParams: true });
  ctx.response.body = users.get(userId);
});

app.use(router.allowedMethods());
app.use(router.routes());

...
```

Whereas we pick a user from the object by identifier for the single users route, we transform the user object to a list of users for the all users route. The same should be possible for the message resource:

```javascript{11-13,15-18}
...

const messages = new Map<string, Message>();

...

const router = new Router();

...

router.get('/messages', (ctx) => {
  ctx.response.body = Array.from(messages.values());
});

router.get('/messages/:messageId', (ctx) => {
  const { messageId } = helpers.getQuery(ctx, { mergeParams: true });
  ctx.response.body = messages.get(messageId);
});

app.use(router.allowedMethods());
app.use(router.routes());

...
```

Try all four routes with cURL on the command line yourself. That's only about reading data. Next, we will discuss the other CRUD operations to create, update and delete resources to actually write data. However, we will not get around a custom Oak middleware and a Oak middleware provided by the Oak ecosystem. That's why we will discuss the subject of the Oak middleware next while implementing the missing CRUD operations.

Let's see how a scenario for creating a message could be implemented in our Oak application. Since we are creating a message without a database ourselves, we need a helper library to generate unique identifiers for us. Import this helper library at the top of your *src/server.ts* file:

```javascript
import { v4 } from 'https://deno.land/std/uuid/mod.ts';
```

Now, create a message with a new route that uses a HTTP POST method:

```javascript{3-13}
...

router.post('/messages', (ctx) => {
  const id = v4.generate();

  messages.set(id, {
    id,
    text: '', // TODO
    userId: '', // TODO
  });

  ctx.response.body = messages.get(id);
});

...
```

We generate a unique identifier for the message with the new library, use it as property in a message object with a [shorthand object property initialization](/javascript-object-property-shorthand), assign the message by identifier in the messages object -- which is our pseudo database --, and return the new message after it has been created.

However, something is missing for the message. In order to create a message, a client has to provide the `text` string for the message. Fortunately a HTTP POST method makes it possible to send data as payload in a body. That's why we can use the incoming request to extract a payload from it:

```javascript{3,6-8,12}
...

router.post('/messages', async (ctx) => {
  const id = v4.generate();

  const {
    value: { text },
  } = await ctx.request.body();

  messages.set(id, {
    id,
    text,
    userId: '', // TODO
  });

  ctx.response.body = messages.get(id);
});
```

All data send by a client to our server is available in the incoming request's body. Try it by creating a message yourself: In a cURL request you can specify HTTP headers with the `-H` flag -- that's how we are saying we want to transfer JSON -- and data as payload with the `-d` flag. You should be able to create messages this way:

```text
curl -X POST -H "Content-Type:application/json" http://localhost:8000/messages -d '{"text":"Hi again, World"}'
```

You should see the created messaged returned to you on the command line. You can double check whether the message was really created in your messages object (aka pseudo database) by performing another cURL requests on the command line:

```text
curl http://localhost:8000/messages
```

There you should see the new message which has been created for you. In addition, you should also be able to request your new message by identifier. Perform the following cURL request to get a single message entity, but use your actual message identifier for it, because my identifier is different from yours:

```text
curl http://localhost:8000/messages/849d9407-d7c6-4712-8c91-1a99f7b22ef5
```

What's missing is the `userId` for the message entity. So far, we have only used Oak's routes as middleware. Now we will build a custom Oak middleware ourselves for retrieving the current users which creates the message. We will start with a blueprint for a Oak middleware:

```javascript{3-6}
...

app.use(async (ctx, next) => {
  // do something
  await next();
});

app.use(router.allowedMethods());
app.use(router.routes());

...
```

In our particular case, when creating a message on the message resource, we need to know who is creating the message to assign a `userId` to it. Let's do a simple version of a middleware that determines a pseudo authenticated user that is sending the request. In the following case, the authenticated user is the user with the identifier `1` which gets assigned as `me` property to the state object which is used to pass information from middleware to middleware in Oak:

```javascript{4}
...

app.use(async (ctx, next) => {
  ctx.state = { me: users.get('1') };

  await next();
});

app.use(router.allowedMethods());
app.use(router.routes());

...
```

Afterward, you can get the authenticated user from the request object and append it as message creator to the message:

```javascript{13}
...

router.post('/messages', async (ctx) => {
  const id = v4.generate();

  const {
    value: { text },
  } = await ctx.request.body();

  messages.set(id, {
    id,
    text,
    userId: ctx.state.me.id,
  });

  ctx.response.body = messages.get(id);
});

...
```

You can imagine how such middleware could be used later to intercept each incoming request to determine from the incoming HTTP headers whether the request comes from an authenticated user or not. If the request comes from an authenticated user, the user is propagated to every Oak route to be used there. That's how the Oak server can be stateless while a client always sends over the information of the currently authenticated user.

Being a stateless is another characteristic of RESTful services. After all, it should be possible to create multiple server instances to balance the incoming traffic evenly between the servers. If you heard about the term load balancing before, that's exactly what's used when having multiple servers at your hands. That's why a server shouldn't keep the state (e.g. authenticated user) -- except for in a database -- and the client always has to send this information along with each request. Then a server can have a middleware which takes care of the authentication on an application-level and provides the session state (e.g. authenticated user) to every route in your Oak application.

What about the operation to delete a message:

```javascript{3-9}
...

router.delete('/messages/:messageId', async (ctx) => {
  const { messageId } = helpers.getQuery(ctx, { mergeParams: true });

  const isDeleted = messages.delete(messageId);

  ctx.response.body = isDeleted;
});

...
```

You can try to verify the functionality with the following cURL command:

```text
curl -X DELETE http://localhost:8000/messages/1
```

The update operation on a message resource is for you to implement yourself as an exercise. I will spare it for a later section, because it quickly raises a new topic: permissions. The question: Who is allowed to edit a message? It should only be possible for the authenticated user (`me`) who is the creator of the message.

Last, since you have already the pseudo authenticated user at your hands due to the middleware, you can offer a dedicated route for this resource too:

```javascript{3-5}
...

router.get('/session', (ctx) => {
  ctx.response.body = users.get(ctx.state.me.id);
});

...
```

It's the first time you break the rules of being entirely RESTful, because you offer an API endpoint for a very specific feature. It will not be the first time you break the laws of REST, because most often REST is not fully implemented RESTful but rather RESTish. If you want to dive deeper into REST, you can do it by yourself. [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS) and other REST related topics are not covered in detail and implemented here.

### Exercises:

* Confirm your [source code for the last section](https://codesandbox.io/s/github/the-road-to-deno/deno-oak-rest-api/tree/rest-sense).
  * Confirm your [changes from the last section](https://github.com/the-road-to-deno/deno-oak-rest-api/compare/uris...rest-sense?expand=1).
* Read more about [REST](https://en.wikipedia.org/wiki/Representational_state_transfer).
* Read more about [middleware and routes in Oak](https://github.com/oakserver/oak).
* Read more about [GraphQL as popular alternative to REST](/why-graphql-advantages-disadvantages-alternatives/).

# Modular Models in Oak as Data Sources

At the moment, all of our implementation sits in the *src/server.ts* file. However, at some point you may want to modularize your implementation details and put them into dedicated files and folders whereas the *src/server.ts* file should only care about putting everything together and starting the application. Before we dive into modularizing the routing, let's see how we can modularize our sample data in so called models first. From your root folder type the following commands to create a folder/file structure for the models.

```text
cd src
mkdir models
cd models
touch index.ts
```

The models folder in an Oak application is usually the place where you define your data sources. In our case, it's the sample data, but in other applications, for instance, it would be the interfaces to the database. In our case of refactoring this, let's move our sample data over to the new *src/models/index.ts* file:

```javascript
interface User {
  id: string;
  username: string;
}

const users = new Map<string, User>();

users.set('1', {
  id: '1',
  username: 'Robin Wieruch',
});

users.set('2', {
  id: '2',
  username: 'Dave Davids',
});

interface Message {
  id: string;
  text: string;
  userId: string;
}

const messages = new Map<string, Message>();

messages.set('1', {
  id: '1',
  text: 'Hello World',
  userId: '1',
});

messages.set('2', {
  id: '2',
  text: 'By World',
  userId: '2',
});

export default {
  users,
  messages,
};
```

Remove the sample data afterward in the *src/server.ts* file. Also import the models in the *src/server.ts* file now and pass them in our custom middleware to all routes via a dedicated property in the context's state:

```javascript{3,12-13}
...

import models from './models/index.ts';

const port = 8000;
const app = new Application();

...

app.use(async (ctx, next) => {
  ctx.state = {
    models,
    me: models.users.get('1'),
  };

  await next();
});

...
```

Then, instead of having access to the sample data in all routes from outside variables as before -- which is an unnecessary side-effect and doesn't keep the function pure --, we want to use the models (and authenticated user) from the function's arguments now:

```javascript{4,8,13,17,22,32,38,44}
...

router.get('/session', (ctx) => {
  ctx.response.body = ctx.state.models.users.get(ctx.state.me.id);
});

router.get('/users', (ctx) => {
  ctx.response.body = Array.from(ctx.state.models.users.values());
});

router.get('/users/:userId', (ctx) => {
  const { userId } = helpers.getQuery(ctx, { mergeParams: true });
  ctx.response.body = ctx.state.models.users.get(userId);
});

router.get('/messages', (ctx) => {
  ctx.response.body = Array.from(ctx.state.models.messages.values());
});

router.get('/messages/:messageId', (ctx) => {
  const { messageId } = helpers.getQuery(ctx, { mergeParams: true });
  ctx.response.body = ctx.state.models.messages.get(messageId);
});

router.post('/messages', async (ctx) => {
  const id = v4.generate();

  const {
    value: { text },
  } = await ctx.request.body();

  ctx.state.models.messages.set(id, {
    id,
    text,
    userId: ctx.state.me.id,
  });

  ctx.response.body = ctx.state.models.messages.get(id);
});

router.delete('/messages/:messageId', async (ctx) => {
  const { messageId } = helpers.getQuery(ctx, { mergeParams: true });

  const isDeleted = ctx.state.models.messages.delete(messageId);

  ctx.response.body = isDeleted;
});

...
```

We are using the application-wide middleware to pass the models to all our routes in a context object's state object now. The models are living outside of the *src/server.ts* file and can be refactored to actual database interfaces later. Next, since we made the routing independent from all side-effects and pass everything needed to them via the request object with the context object, we can move the routes to separated places too.

### Exercises:

* Confirm your [source code for the last section](https://codesandbox.io/s/github/the-road-to-deno/deno-oak-rest-api/tree/modular-models).
  * Confirm your [changes from the last section](https://github.com/the-road-to-deno/deno-oak-rest-api/compare/rest-sense...modular-models?expand=1).

# Modular Routing with Oak Router

So far, you have mounted routes directly on the Oak application instance in the *src/server.ts* file. This will become verbose eventually, because this file should only care about all the important topics to start our application. It shouldn't reveal implementation details of the routes. Now the best practice would be to move the routes into their dedicated folder/file structure. That's why we want to give each REST resource their own file in a dedicated folder. From your root folder, type the following on the command line to create a folder/file structure for the modular routes:

```text
cd src
mkdir routes
cd routes
touch index.ts session.ts user.ts message.ts
```

Then, assumed the routes would be already defined, import the all the modular routes in the *src/server.ts* file and *use* them to mount them as modular routes. Each modular route receives a URI which in REST is our resource:

```javascript{1,4,18-23}
import { Application } from 'https://deno.land/x/oak/mod.ts';

import models from './models/index.ts';
import routes from './routes/index.ts';

const port = 8000;
const app = new Application();

app.use(async (ctx, next) => {
  ctx.state = {
    models,
    me: models.users.get('1'),
  };

  await next();
});

app.use(routes.session.allowedMethods());
app.use(routes.session.routes());
app.use(routes.user.allowedMethods());
app.use(routes.user.routes());
app.use(routes.message.allowedMethods());
app.use(routes.message.routes());

app.addEventListener('listen', () => {
  console.log(`Listening on: localhost:${port}`);
});

await app.listen({ port });
```

In our *src/routes/index.ts* entry file to the routes module, import all routes form their dedicated files (that are not defined yet) and export them as an object. Afterward, they are available in the *src/server.ts* file as we have already used them.

```javascript
import session from './session.ts';
import user from './user.ts';
import message from './message.ts';

export default {
  session,
  user,
  message,
};
```

Now let's implement each modular route. Start with the session route in the *src/routes/session.ts* file which only returns the pseudo authenticated user. Oaks Router offers the ability to create such modular routes without mounting them directly to the Oak application instance. That's how we can create modular routes at other places than the Oak application, but import them later to be mounted on the Oak application's instance as we already have done in a previous step.

```javascript
import { Router } from 'https://deno.land/x/oak/mod.ts';

const router = new Router();

router.get('/session', (ctx) => {
  ctx.response.body = ctx.state.models.users.get(ctx.state.me.id);
});

export default router;
```

Next, the user route in the *src/routes/user.ts* file. It's quite similar to the session route:

```javascript
import { Router, helpers } from 'https://deno.land/x/oak/mod.ts';

const router = new Router();

router.get('/users', (ctx) => {
  ctx.response.body = Array.from(ctx.state.models.users.values());
});

router.get('/users/:userId', (ctx) => {
  const { userId } = helpers.getQuery(ctx, { mergeParams: true });
  ctx.response.body = ctx.state.models.users.get(userId);
});

export default router;
```

Notice how we don't need to define the `/users` URI (path) but only the subpaths, because we did this already in the mounting process of the route in the Oak application (see *src/server.ts* file). Next, implement the *src/routes/message.ts* file to define the last of our modular routes:

```javascript
import { Router, helpers } from 'https://deno.land/x/oak/mod.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

const router = new Router();

router.get('/messages', (ctx) => {
  ctx.response.body = Array.from(ctx.state.models.messages.values());
});

router.get('/messages/:messageId', (ctx) => {
  const { messageId } = helpers.getQuery(ctx, { mergeParams: true });
  ctx.response.body = ctx.state.models.messages.get(messageId);
});

router.post('/messages', async (ctx) => {
  const id = v4.generate();

  const {
    value: { text },
  } = await ctx.request.body();

  ctx.state.models.messages.set(id, {
    id,
    text,
    userId: ctx.state.me.id,
  });

  ctx.response.body = ctx.state.models.messages.get(id);
});

router.delete('/messages/:messageId', async (ctx) => {
  const { messageId } = helpers.getQuery(ctx, { mergeParams: true });

  const isDeleted = ctx.state.models.messages.delete(messageId);

  ctx.response.body = isDeleted;
});

export default router;
```

Every of our modular routes from Oak Router is mounted to our Oak application with a dedicated URI in the *src/server.ts* file now. The modular routes in the *src/routes* folder only take care of their sub paths and their implementation details while the mounting in the *src/server.ts* file takes care of the main path and the mounted modular route that is used there. In the end, don't forget to remove all the previously used routes that we moved over to the *src/routes/* folder in the *src/server.ts* file.

### Exercises:

* Confirm your [source code for the last section](https://codesandbox.io/s/github/the-road-to-deno/deno-oak-rest-api/tree/modular-routing).
  * Confirm your [changes from the last section](https://github.com/the-road-to-deno/deno-oak-rest-api/compare/modular-models...modular-routing?expand=1).
