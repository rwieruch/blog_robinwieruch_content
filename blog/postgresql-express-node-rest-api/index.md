---
title: "Creating a REST API with Express.js and PostgreSQL"
description: "A Node.js with Express and PostgreSQL tutorial to learn step by step how to create a REST API for CRUD operations which can be consumed by a client application ..."
date: "2019-02-24T07:50:46+02:00"
categories: ["Node"]
keywords: ["express postgresql rest api", "express postgresql rest", "express postgresql crud"]
hashtags: ["#NodeJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection
  label="This tutorial is part 5 of 5 in this series."
  links={[
    {
      prefix: "Part 1:",
      label: "The minimal Node.js with Babel Setup",
      url: "https://www.robinwieruch.de/minimal-node-js-babel-setup/"
    },
    {
      prefix: "Part 2:",
      label: "How to setup Express.js in Node.js",
      url: "https://www.robinwieruch.de/node-js-express-tutorial/"
    },
    {
      prefix: "Part 3:",
      label: "How to create a REST API with Express.js in Node.js",
      url: "https://www.robinwieruch.de/node-express-server-rest-api/"
    },
    {
      prefix: "Part 4:",
      label: "Setup PostgreSQL with Sequelize in Express",
      url: "https://www.robinwieruch.de/postgres-express-setup-tutorial/"
    }
  ]}
/>

Node + Express + PostgreSQL is a powerful tech stack for backend applications to offer CRUD operations. It gives you everything to expose an API (Express routes), to add business logic (Express middleware and logic within Express routes), and to use real data with a database (PostgreSQL). It's perfect for establishing a PERN (PostgreSQL, Express, React, Node), PEAN (PostgreSQL, Express, Angular, Node), or PEVN (PostgreSQL, Express, Vue, Node) tech stack. Everything that would be missing is the frontend application with React, Angular, Vue or something else. But that's up to another section.

This section focuses first on connecting PostgreSQL to Express for our REST API. Previously we have set up PostgreSQL in our Express.js application and seeded the database with initial data, but didn't use it in Express for the RESTful API yet. Now we want to make sure that every CRUD operation going through this REST API reads or writes from/to the PostgreSQL database rather than using sample data as we did before for our Express routes. That's why we need to wire our Express routes to PostgreSQL via Sequelize to marry both worlds.

In our *src/index.js* where we set up and start the Express application with the PostgreSQL database, we already have a Express middleware in place which passes the models as context to all of our Express routes. Previously, these models have been sample data. Now we are using the Sequelize models that connect us to the PostgreSQL database. Since the folder/file data structure is the same as before, nothing changes for passing the models as context to the Express routes.

```javascript
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
```

However, the me user (authenticated user) can be retrieved from the seeded data from the database. There is no `users` array available anymore as sample data on the models object, because the models are our interface to the PostgreSQL database now.

```javascript{9,12}
...

import models from './models';

const app = express();

...

app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin('rwieruch'),
  };
  next();
});

...
```

Even though we don't know the authenticated user yet, because we are not passing any data to the REST API for it from the outside, we just take any user that we know exists in our database because of the previous PostgreSQL database seeding. The `findByLogin` method is available on our model, because we have implemented it previously as custom method for it to retrieve users by username or email.

Let's dive into our Express routes now. We have routes for the session, the user, and the message entity. The session entity comes first. Again, instead of using the sample data which was available previously on the models, we can use the models' interface -- powered by Sequelize -- to interact with the database now. In the *src/routes/session.js* change the following lines of code:

```javascript{5,6,7,8,9,10}
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const user = await req.context.models.User.findByPk(
    req.context.me.id,
  );
  return res.send(user);
});

export default router;
```

The route function becomes an asynchronous function, because we are dealing with an asynchronous request to the PostgreSQL database now. We handle the asynchronous nature of the function with async/await.

Since we passed the models conveniently via the context object to every Express route with an application-wide Express middleware before, we can make use of it here. The authenticated user, which we have taken arbitrarily from the PostgreSQL database before, can be used to retrieve the current session user from the database.

Let's tackle the user routes in the *src/routes/user.js* file which offer RESTful API endpoints for fetching users or a single user by id. Both API requests should lead into read operations for the PostgreSQL database:

```javascript{5,6,7,8,10,11,12,13,14,15}
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.send(users);
});

router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findByPk(
    req.params.userId,
  );
  return res.send(user);
});

export default router;
```

The first API endpoint that fetches a list of users doesn't get any input parameters from the request. But the second API endpoint has access to the user identifier to read the correct user from the PostgreSQL database.

Last but not least, the message routes in the *src/routes/message.js* file. Apart from reading messages and a single message by identifier, we also have API endpoints for creating a message and deleting a message. Both operations should lead to write operations for the PostgreSQL database:

```javascript{5,6,7,8,10,11,12,13,14,15,17,18,19,20,21,22,23,24,26,27,28,29,30,31,32}
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const messages = await req.context.models.Message.findAll();
  return res.send(messages);
});

router.get('/:messageId', async (req, res) => {
  const message = await req.context.models.Message.findByPk(
    req.params.messageId,
  );
  return res.send(message);
});

router.post('/', async (req, res) => {
  const message = await req.context.models.Message.create({
    text: req.body.text,
    userId: req.context.me.id,
  });

  return res.send(message);
});

router.delete('/:messageId', async (req, res) => {
  const result = await req.context.models.Message.destroy({
    where: { id: req.params.messageId },
  });

  return res.send(true);
});

export default router;
```

Basically that's it for connecting PostgreSQL to Express routes with Sequelize. All the models set up with Sequelize can be used as interface to your PostgreSQL database. Once a user hits your REST API, you can do read or write operations in the Express routes to your PostgreSQL database.

### Exercises

* Confirm your [source code](https://github.com/rwieruch/node-express-postgresql-server)
* Check the [source code of the alternative MongoDB with Mongoose implementation](https://github.com/rwieruch/node-express-mongodb-server)
* Experiment with your REST API with CURL operations.
