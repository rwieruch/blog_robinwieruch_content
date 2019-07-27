+++
title = "How to create a REST API with Express.js in Node.js"
description = "A Node.js with Express tutorial to learn how to create a REST API for CRUD operations which can be consumed by a client application ..."
date = "2019-01-14T07:50:46+02:00"
tags = ["Node", "JavaScript"]
categories = ["Node", "JavaScript"]
keywords = ["node express tutorial", "express tutorial", "express rest api"]
news_keywords = ["node express tutorial", "express tutorial", "express rest api"]
hashtag = "#NodeJs"
card = "img/posts/node-express-server-rest-api/banner_640.jpg"
banner = "img/posts/node-express-server-rest-api/banner.jpg"
contribute = "node-express-server-rest-api.md"
headline = "How to create a REST API with Express.js in Node.js"

summary = "A Node.js with Express tutorial to learn how to create a REST API for CRUD operations which can be consumed by a client application."
+++

{{% sponsorship %}}

{{% pin_it_image "express rest api" "img/posts/node-express-server-rest-api/banner.jpg" "is-src-set" %}}

{{% read_before_2 "This tutorial is part 3 of 3 in this series." "Part 1:" "The minimal Node.js with Babel Setup" "https://www.robinwieruch.de/minimal-node-js-babel-setup/" "Part 2:" "How to setup Express.js in Node.js" "https://www.robinwieruch.de/node-js-express-tutorial/" %}}

An Express application is most often used as backend application in a client-server architecture whereas the client could be written in React.js or another popular frontend solution and the server could be written in Express. Both entities result in a client-server architecture (frontend and backend relationship) whereas the backend would be needed for (A) business logic that shouldn't be exposed as source code to the frontend application -- otherwise it would be accessible in the browser -- or for (B) establishing connections to third-party data sources (e.g. database(s)).

However, don't mistake client application *always* for frontend and server application *always* for backend here. These terms cannot be exchanged that easily. Whereas a frontend application is usually something seen in the browser, a backend usually performs business logic that shouldn't be exposed in a browser and often connects to a database as well.

{{< highlight javascript >}}
Frontend -> Backend -> Database
{{< /highlight >}}

But, in contrast, the terms client and server are a matter of perspective. A backend application (Backend 1) which *consumes* another backend application (Backend 2) suddenly becomes a client application for the latter server application (Backend 2). However, the same backend application (Backend 1) is still the server for another client application which is the frontend application (Frontend).

{{< highlight javascript >}}
Frontend -> Backend 1 -> Backend 2 -> Database

// Frontend: Client of Backend 1
// Backend 1: Server for Frontend, also Client of Backend 2
// Backend 2: Server for Backend 1
{{< /highlight >}}

If you want to answer the client-server question if someone asks you what role the entity plays in a client-server architecture, always ask yourself who (server) is serving whom (client) and who (client) consumes whom's (backend) functionalities?

That's the theory behind client-server architectures and how to relate to them. Let's get more practical again. How do client and server applications communicate with each other? Over the years, there existed a few popular communication interfaces ({{% a_blank "APIs" "https://en.wikipedia.org/wiki/Application_programming_interface" %}}) between both entities. However, the most popular one is called {{% a_blank "REST" "https://en.wikipedia.org/wiki/Representational_state_transfer" %}} defined in 2000 by Roy Fielding. It's an architecture that leverages the {{% a_blank "HTTP protocol" "https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol" %}} to enable communication between a client and a server application. A server application that offers a REST API is also called a RESTful server. Servers that don't follow the REST architecture a 100% are rather called RESTish than RESTful. In the following, we are going to implement such REST API for our Express server application, but first let's get to know the tooling that enables us to interact with a REST API.

{{% chapter_header "cURL for REST APIs" "curl-rest-api" %}}

If you haven't heard about cURL, this section gives you a short excursus about what's cURL and how to use it to interact with (REST) APIs. The definition taken from {{% a_blank "Wikipedia" "https://en.wikipedia.org/wiki/CURL" %}} says: *"cURL [...] is a computer software project providing a library and command-line tool for transferring data using various protocols."* Since REST is an architecture that uses HTTP, a server that exposes a RESTful API can be consumed with cURL, because HTTP is one of the various protocols.

First, let's install it one the command line. For now, the installation guide is for MacOS users, but I guess by looking up "curl for windows" online, you will find the setup guide for your desired OS (e.g. Windows) too. In this guide, we will use Homebrew to install it. If you don't have Homebrew, install it with the following command on the command line:

{{< highlight javascript >}}
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
{{< /highlight >}}

If you haven't heard about Homebrew, read more about it over [here](https://www.robinwieruch.de/developer-setup/). Next, install cURL with Homebrew:

{{< highlight javascript >}}
brew install curl
{{< /highlight >}}

Now, start your Express server from the previous sections. Once your application is started, execute `curl http://localhost:3000` in another command line window. Make sure the port matches your port and the Express server is running. After executing the command, you should see the "Hello World!" printed on the command line. Congratulations, you just have consumed your Express server as a client with something else than a browser.

{{< highlight javascript >}}
Browser (Client) -> Express Server
Command Line Tool (Client with cURL) -> Express Server
{{< /highlight >}}

Whether you access your Express application on `http://localhost:3000` in the browser or via the command line with cURL, you should see the same result. Both tools act as clients whereas the Express application is your server. You will see in the next sections how to use cURL to verify your Express application's REST API, that we are going to implement together, on the command line instead of in the browser.

{{% chapter_header "Express Routes: HTTP Methods and REST Operations" "express-routes-for-restful-operations" %}}

Express is a perfect choice for a server when it comes to creating and exposing APIs (e.g. REST API, GraphQL API) to communicate as a client with your server application. Previously you have already implemented one Express route, which sends a "Hello World!", that you have accessed via the browser and cURL on the command line. Let's set up more routes to accommodate a RESTful API for your Express application eventually. Add the following routes to your Express application whereas the URI itself doesn't change, but the method used from your Express application:

{{< highlight javascript "hl_lines=9 10 11 13 14 15 17 18 19 21 22 23" >}}
import 'dotenv/config';
...
import express from 'express';

const app = express();

...

app.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});

app.post('/', (req, res) => {
  return res.send('Received a POST HTTP method');
});

app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
{{< /highlight >}}

Now start your Express server on the command line again, if it isn't running already, and execute four cURL commands in another command line window. You should see the following output for the commands:

{{< highlight javascript >}}
curl http://localhost:3000
-> Received a GET HTTP method

curl -X POST http://localhost:3000
-> Received a POST HTTP method

curl -X PUT http://localhost:3000
-> Received a PUT HTTP method

curl -X DELETE http://localhost:3000
-> Received a DELETE HTTP method
{{< /highlight >}}

By default cURL will use a HTTP GET method. However, you can specify the HTTP method with the `-X` flag (or `--request` flag). Depending on the HTTP method you are choosing, you will access different routes of your Express application -- which here represent only a single API endpoint with an URI so far. You will see later other additions that you can add to your cURL requests.

That's one of the key aspects of REST: It uses HTTP methods to perform operations on URI(s). Often these operations are referred to as {{% a_blank "CRUD operations" "https://en.wikipedia.org/wiki/Create,_read,_update_and_delete" %}} for create, read, update, and delete operations. Next you will see on what these operations are used on the URIs (resources).

{{% chapter_header "Express Routes: URIs and Resources" "express-routes-for-restful-resources" %}}

Another important aspect of REST is that every URI acts as a resource. So far, you have only operated on the root URI with your CRUD operations. It's doesn't really represent a resource in REST. In contrast, a resource could be a user resource, for example:

{{< highlight javascript "hl_lines=3 4 7 8 11 12 15 16" >}}
...

app.get('/users', (req, res) => {
  return res.send('GET HTTP method on user resource');
});

app.post('/users', (req, res) => {
  return res.send('POST HTTP method on user resource');
});

app.put('/users', (req, res) => {
  return res.send('PUT HTTP method on user resource');
});

app.delete('/users', (req, res) => {
  return res.send('DELETE HTTP method on user resource');
});

...
{{< /highlight >}}

With cURL on your command line, you can go through the resource represented by one URI with different operations by using the `http://localhost:3000/users` API endpoint again. You will see a similar output as before, but this time you are operating on a user resource. One piece is missing to make the PUT HTTP method (update operation) and DELETE HTTP method (delete operation) RESTful from a URI's point of view:

{{< highlight javascript "hl_lines=11 13 17 19" >}}
...

app.get('/users', (req, res) => {
  return res.send('GET HTTP method on user resource');
});

app.post('/users', (req, res) => {
  return res.send('POST HTTP method on user resource');
});

app.put('/users/:userId', (req, res) => {
  return res.send(
    `PUT HTTP method on user/${req.params.userId} resource`,
  );
});

app.delete('/users/:userId', (req, res) => {
  return res.send(
    `DELETE HTTP method on user/${req.params.userId} resource`,
  );
});

...
{{< /highlight >}}

In order to delete or update a user resource, you would need to know the exact user. That's where unique identifiers are used in programming. In our Express routes, we can assign unique identifiers with parameters in the URI. Then the callback function holds the parameter in the request object's parameters. Try again a cURL operation  on `/users/1`, `/users/2` or another identifier with a DELETE or UPDATE HTTP method and verify that the identifier shows up in the command line as output.

{{% chapter_header "Making sense of REST" "rest-philosophy" %}}

You may be still wondering: *What value brings the combination of URIs and HTTP methods* -- which make up the majority of the REST philosophy -- *to my application?*

Let's imagine we wouldn't just return a result, as we do at the moment, but would act properly on the received operation instead. For instance, the Express server could be connected to a database that stores user entities in a user table. Now, when consuming the REST API as a client (e.g. cURL, browser, or also a [React.js application](https://www.robinwieruch.de/react-fetching-data/)), you could retrieve all users from the database with a HTTP GET method on the `/users` URI or, on the same resource, create a new user with a HTTP POST method.

{{< highlight javascript >}}
// Making sense of the Naming

Express Route's Method <=> HTTP Method <=> REST Operation
Express Route's Path <=> URI <=> REST Resource
{{< /highlight >}}

Suddenly you would be able to read and write data from and to a database from a client application. Everything that makes it possible is a backend application which enables you to write a interface (e.g. REST API) for CRUD operations.

{{< highlight javascript >}}
Client -> REST API -> Server -> Database
{{< /highlight >}}

Whereas it's important to notice that the REST API belongs to the server application. You can take this always one step further by having multiple server applications offering REST APIs. Often you they come with the name microservices or web services whereas each server application offers a well-encapsulated functionality. The servers even don't have to use the same programming language, because they are communicating over a programming language agnostic interface. Also the interfaces (APIs) doesn't have to be necessary REST API.

{{< highlight javascript >}}
       -> REST API -> Server -> GraphQL API -> Server -> Database
Client
       -> REST API -> Server -> Database
{{< /highlight >}}

Let's take everything we learned in theory, so far, one step further towards a real application by sending real data across the wire. The data will be sample data, which will not come from a database yet, but will be hardcoded in the source code instead:

{{< highlight javascript "hl_lines=3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27" >}}
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
{{< /highlight >}}

Next to the user entities, we will have message entities too. Both entities are related to each other by providing the necessary information as identifiers (e.g. a message has a message creator). That's how a message is associated with a user and how you would retrieve the data from a database, too, whereas each entity (user, message) has a dedicated database table. Both are represented as objects that can be accessed by identifiers.

Let's start by providing two routes for reading the whole list of users and a single user by identifier:

{{< highlight javascript "hl_lines=7 8 9 11 12 13" >}}
...

let users = { ... };

let messages = { ... };

app.get('/users', (req, res) => {
  return res.send(Object.values(users));
});

app.get('/users/:userId', (req, res) => {
  return res.send(users[req.params.userId]);
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
{{< /highlight >}}

Whereas we pick a user from the object by identifier for the single users route, we transform the user object to a list of users for the all users route. The same should be possible for the message resource:

{{< highlight javascript "hl_lines=9 10 11 13 14 15" >}}
...

let users = { ... };

let messages = { ... };

...

app.get('/messages', (req, res) => {
  return res.send(Object.values(messages));
});

app.get('/messages/:messageId', (req, res) => {
  return res.send(messages[req.params.messageId]);
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
{{< /highlight >}}

Try out all four routes with cURL on the command line yourself. That's only about reading data. Next, we will discuss the other CRUD operations to create, update and delete resources to actually write data. However, we will not get around a custom Express middleware and a Express middleware provided by the Express ecosystem. That's why we will discuss the subject of the Express middleware next while implementing the missing CRUD operations.

{{% chapter_header "Express Middleware" "express-middleware" %}}

Let's see how a scenario for creating a message could be implemented in our Express application. Since we are creating a message without a database ourselves, we need a helper library to generate unique identifiers for us. Install this helper library on the command line:

{{< highlight javascript >}}
npm install uuid
{{< /highlight >}}

Next import it at the top of your *src/index.js* file:

{{< highlight javascript "hl_lines=1" >}}
import uuidv4 from 'uuid/v4';
{{< /highlight >}}

Now, create a message with a new route that uses a HTTP POST method:

{{< highlight javascript "hl_lines=3 4 5 6 7 8 9 10 11 12" >}}
...

app.post('/messages', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
  };

  messages[id] = message;

  return res.send(message);
});

...
{{< /highlight >}}

We generate a unique identifier for the message with the new library, use it as property in a message object, assign the message by identifier in the messages object -- which is our pseudo database --, and return the new message after it has been created.

However, something is missing for the message. In order to create a message, a client has to provide the `text` string for the message. Fortunately a A HTTP POST method makes it possible to send data as payload in a body. That's why we can use the incoming request (`req`) to extract a payload from it.

{{< highlight javascript "hl_lines=7" >}}
...

app.post('/messages', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
  };

  messages[id] = message;

  return res.send(message);
});

...
{{< /highlight >}}

Accessing the payload of an HTTP POST request is now provided within Express in version 4.16.0+.  Express exposes this built-in middleware (based on ({{% a_blank "body-parser" "http://expressjs.com/en/resources/middleware/body-parser.html" %}}) under the covers) to transform two of the body types we might receive - json, and urlencoded.

We can use it like so:

{{< highlight javascript "hl_lines=8 9" >}}
...
import express from 'express';

const app = express();

...

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

...
{{< /highlight >}}

This extracts the entire body portion of an incoming request stream and makes it accessible on `req.body` ({{% a_blank "Source" "http://expressjs.com/en/4x/api.html#express.json" %}}):

* express.json(): Parses the text as JSON and exposes the resulting object on req.body.

* express.urlencoded(): Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST) and exposes the resulting object (containing the keys and values) on req.body.

Now the body with the message's text is accessible in the request whether it is send by a regular POST request or a POST request from a HTML form. Both ways should work now. All data should be received and send as JSON payload now. That's another aspect of REST, which itself is no opinionated about the payload format (JSON, XML), but once you have chosen a format, you should stick to it for your entire API.

In the last steps we have installed a new Express middleware and made it available on an application-level. Each request that arrives at one of our Express routes goes through the middleware. Therefore, all data send by a client to our server is available in the incoming request. Try it by creating a message yourself. In a cURL request you can specify HTTP headers with the `-H` flag -- that's how we are saying we want to transfer JSON -- and data as payload with the `-d` flag. You should be able to create messages this way:

{{< highlight javascript >}}
curl -X POST -H "Content-Type:application/json" http://localhost:3000/messages -d '{"text":"Hi again, World"}'
{{< /highlight >}}

So far, we have only imported third-party Express middleware and have used it on an application-level. Now, let's build a custom Express middleware, which is used on an application-level, ourselves. The blueprint for a middleware is similar to the Express functions we have seen before:

{{< highlight javascript "hl_lines=3 4 5 6" >}}
...

app.use((req, res, next) => {
  // do something
  next();
});

...
{{< /highlight >}}

The next function, which is available as third argument, is called to signalize that the middleware has finished its job. This becomes more important when your middleware uses asynchronous functions. In between of the middleware function you could do anything now. We could simply `console.log()` the time or do something with the request (`req`) or response (`res`). In our case, for creating a message, we need somehow to know who is creating the message. Let's do a simple version of a middleware that determines a pseudo "authenticated" user that is sending the request. Then it's possible to append this user as message creator to the message:

{{< highlight javascript "hl_lines=4 15" >}}
...

app.use((req, res, next) => {
  req.me = users[1];
  next();
});

...

app.post('/messages', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.me.id,
  };

  messages[id] = message;

  return res.send(message);
});

...
{{< /highlight >}}

Suddenly we would have access to the `me` user in the request object, which is the authenticated user, in our routes. This user can be used then to be assigned as creator of the message. You can imagine how such middleware could be used later to intercept each incoming request to determine from the incoming HTTP headers whether the request comes from an authenticated user or not. If the request comes from an authenticated user, the user is propagated to every Express route to be used there. That's how the Express server can be stateless while a client always sends over the information of the currently authenticated user.

Being a stateless is another characteristic of RESTful services. After all, it should be possible to create multiple server instances to balance the incoming traffic evenly between the servers. If you heard about the term load balancing before, that's exactly what's used when having multiple servers at your disposal. That's why a server cannot keep the state (e.g. authenticated user) and the client always has to send this information along with each request. Then a server can have a middleware which takes care of the authentication on an application-level and provides the session state (e.g. authenticated user) to every route in your Express application.

Now that you have learned the essentials about application-level middleware in Express, let's implement the last routes to complete our  application's routes. What about the operation to delete a message:

{{< highlight javascript "hl_lines=3 4 5 6 7 8 9 10 11 12" >}}
...

app.delete('/messages/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = messages;

  messages = otherMessages;

  return res.send(message);
});

...
{{< /highlight >}}

You can try it with the following cURL command:

{{< highlight javascript >}}
curl -X DELETE http://localhost:3000/messages/1
{{< /highlight >}}

The Update operation on a message resource is for you to implement yourself as an exercise. I will spare it for a later section, because it quickly raises a new topic: permissions. The question: Who is allowed to edit a message? It should only be possible for the authenticated user (`me`) who is the creator of the message, should it?

Last, since you have already the pseudo authenticated user at your disposal due to the application-wide middleware, you can offer a dedicated route for this resource too:

{{< highlight javascript "hl_lines=3 4 5" >}}
...

app.get('/session', (req, res) => {
  return res.send(users[req.me.id]);
});

...
{{< /highlight >}}

It's the first time you break the rules of being entirely RESTful, because you offer an API endpoint for a very specific feature. It will not be the first time you break the laws of REST, because most often REST is not fully implemented RESTful but rather RESTish. If you want to dive deeper into REST, you can do it by yourself. {{% a_blank "HATEOAS" "https://en.wikipedia.org/wiki/HATEOAS" %}} and other REST related topics are not covered in detail and implemented here.

{{% chapter_header "Modular Models in Express as Data Sources" "express-models" %}}

At the moment, all of our implementation sits in the *src/index.js* file. However, at some point you may want to modularize your implementation details and put them into dedicated files and folders whereas the *src/index.js* file should only care about putting everything together and starting the application. Before we dive into modularizing the routing, let's see how we can modularize our sample data in so called models first. From your *src/* folder type the following commands to create a folder/file structure for the models.

{{< highlight javascript >}}
mkdir models
cd models
touch index.js
{{< /highlight >}}

The models folder in an Express application is usually the place where you define your data sources. In our case, it's the sample data, but in other applications, for instance, it would be the interfaces to the database. In our case of refactoring this, let's move our sample data over to the new *src/models/index.js* file:

{{< highlight javascript >}}
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

export default {
  users,
  messages,
};
{{< /highlight >}}

Remove the sample data afterward in the *src/index.js* file. Also import the models in the *src/index.js* file now and pass them in our custom application-level middleware to all routes via a dedicated context object. That's where the `me` user (authenticated) user can be placed as well. You don't need necessarily the context object as container, but I found it a good practice to keep everything that is passed to the routes at one place.

{{< highlight javascript "hl_lines=3 10 11 12 13" >}}
...

import models from './models';

const app = express();

...

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

...
{{< /highlight >}}

Then, instead of having access to the sample data in all routes from outside variables as before -- which is an unnecessary side-effect and doesn't keep the function pure --, we want to use the models (and authenticated user) from the function's arguments now.

{{< highlight javascript "hl_lines=4 8 12 16 20 28 31 40 42" >}}
...

app.get('/session', (req, res) => {
  return res.send(req.context.models.users[req.context.me.id]);
});

app.get('/users', (req, res) => {
  return res.send(Object.values(req.context.models.users));
});

app.get('/users/:userId', (req, res) => {
  return res.send(req.context.models.users[req.params.userId]);
});

app.get('/messages', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});

app.get('/messages/:messageId', (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]);
});

app.post('/messages', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };

  req.context.models.messages[id] = message;

  return res.send(message);
});

app.delete('/messages/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});

...
{{< /highlight >}}

We are using the application-wide middleware to pass the models to all our routes in a context object now. The models are living outside of the *src/index.js* file and can be refactored to actual database interfaces later. Next, since we made the routing independent from all side-effects and pass everything needed to them via the request object with the context object, we can move the routes to separated places too.

{{% chapter_header "Modular Routing with Express Router" "express-router-routing" %}}

So far, you have mounted routes directly on the Express application instance in the *src/index.js* file. This will become verbose eventually, because this file should only care about all the important topics to start our application. It shouldn't reveal implementation details of the routes. Now the best practice would be to move the routes into their dedicated folder/file structure. That's why we want to give each REST resource their own file in a dedicated folder. From your *src/* folder, type the following on the command line to create a folder/file structure for the modular routes:

{{< highlight javascript >}}
mkdir routes
cd routes
touch index.js session.js user.js message.js
{{< /highlight >}}

Then, assumed the routes would be already defined, import the all the modular routes in the *src/index.js* file and *use* them to mount them as modular routes. Each modular route receives a URI which in REST is our resource.

{{< highlight javascript "hl_lines=3 9 10 11" >}}
...

import routes from './routes';

const app = express();

...

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

...
{{< /highlight >}}

In our *src/routes/index.js* entry file to the routes module, import all routes form their dedicated files (that are not defined yet) and export them as an object. Afterward, they are available in the *src/index.js* file as we have already used them.

{{< highlight javascript >}}
import session from './session';
import user from './user';
import message from './message';

export default {
  session,
  user,
  message,
};
{{< /highlight >}}

Now let's implement each modular route. Start with the session route in the *src/routes/session.js* file which only returns the pseudo authenticated user. Express offers the Express Router to create such modular routes without mounting them directly to the Express application instance. That's how we can create modular routes at other places than the Express application, but import them later to be mounted on the Express application's instance as we already have done in a previous step.

{{< highlight javascript >}}
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.send(req.context.models.users[req.context.me.id]);
});

export default router;
{{< /highlight >}}

Next, the user route in the *src/routes/user.js* file. It's quite similar to the session route:

{{< highlight javascript >}}
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.send(Object.values(req.context.models.users));
});

router.get('/:userId', (req, res) => {
  return res.send(req.context.models.users[req.params.userId]);
});

export default router;
{{< /highlight >}}

Notice how we don't need to define the `/users` URI (path) but only the subpaths, because we did this already in the mounting process of the route in the Express application (see *src/index.js* file). Next, implement the *src/routes/message.js* file to define the last of our modular routes:

{{< highlight javascript >}}
import uuidv4 from 'uuid/v4';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});

router.get('/:messageId', (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]);
});

router.post('/', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };

  req.context.models.messages[id] = message;

  return res.send(message);
});

router.delete('/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});

export default router;
{{< /highlight >}}

Every of our modular routes from Express Router is mounted to our Express application with a dedicated URI in the *src/index.js* file now. The modular routes in the *src/routes* folder only take care of their sub paths and their implementation details while the mounting in the *src/index.js* file takes care of the main path and the mounted modular route that is used there. In the end, don't forget to remove all the previously used routes that we moved over to the *src/routes/* folder in the *src/index.js* file.

### Exercises:

* What's a client-server architecture?
* Read more about [REST APIs and other APIs](https://www.robinwieruch.de/what-is-an-api-javascript/)
* Read more about [GraphQL as popular alternative to REST](https://www.robinwieruch.de/why-graphql-advantages-disadvantages-alternatives/)
* Read more about {{% a_blank "basic routing in Express" "https://expressjs.com/en/starter/basic-routing.html" %}}
* Read more about {{% a_blank "advanced routing in Express" "https://expressjs.com/en/guide/routing.html" %}}
* Read more about {{% a_blank "middleware in Express" "https://expressjs.com/en/guide/using-middleware.html" %}}

{{% read_before_3 "This tutorial is part 3 of 4 in this series." "Part 1:" "The minimal Node.js with Babel Setup" "https://www.robinwieruch.de/minimal-node-js-babel-setup/" "Part 2:" "How to setup Express.js in Node.js" "https://www.robinwieruch.de/node-js-express-tutorial/" "Part 4:" "Setup PostgreSQL with Sequelize in Express Tutorial" "https://www.robinwieruch.de/postgres-express-setup-tutorial/" %}}

{{% read_before_3 "This tutorial is part 3 of 4 in this series." "Part 1:" "The minimal Node.js with Babel Setup" "https://www.robinwieruch.de/minimal-node-js-babel-setup/" "Part 2:" "How to setup Express.js in Node.js" "https://www.robinwieruch.de/node-js-express-tutorial/" "Part 4:" "Setup MongoDB with Mongoose in Express Tutorial" "https://www.robinwieruch.de/mongodb-express-setup-tutorial/" %}}
