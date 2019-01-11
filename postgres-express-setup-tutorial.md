+++
title = "Setup PostgreSQL with Sequelize in Express"
description = "A tutorial on how to setup PostgreSQL for Express.js in a Node.js application. It comes with the database installation and how to connect it to Express with Sequelize as ORM. You can choose to use another ORM, if you want to ..."
date = "2019-01-08T13:50:46+02:00"
tags = ["Node", "JavaScript"]
categories = ["Node", "JavaScript"]
keywords = ["postgresql express", "postgres express", "postgres sequelize", "postgresql sequelize", "node postgresql", "node postgres"]
news_keywords = ["postgresql express", "postgres express", "postgres sequelize", "postgresql sequelize", "node postgresql", "node postgres"]
hashtag = "#NodeJs"
card = "img/posts/postgres-express-setup-tutorial/banner_640.jpg"
banner = "img/posts/postgres-express-setup-tutorial/banner.jpg"
contribute = "postgres-express-setup-tutorial.md"
headline = "Setup PostgreSQL with Sequelize in Express"

summary = "A tutorial on how to setup PostgreSQL for Express.js in a Node.js application. It comes with the database installation and how to connect it to Express with Sequelize as ORM."
+++

{{% sponsorship %}}

{{% pin_it_image "postgres express" "img/posts/postgres-express-setup-tutorial/banner.jpg" "is-src-set" %}}

{{% read_before_3 "This tutorial is part 4 of 4 in this series." "Part 1:" "The minimal Node.js with Babel Setup" "https://www.robinwieruch.de/minimal-node-js-babel-setup/" "Part 2:" "How to setup Express.js in Node.js" "https://www.robinwieruch.de/node-js-express-tutorial/" "Part 3:" "How to create a REST API with Express.js in Node.js" "https://www.robinwieruch.de/node-express-server-rest-api/" %}}

Eventually every Node.js project running with Express.js as web application will need a database. Since most server applications are stateless, in order to scale them horizontally with multiple server instances, there is no way to persist data without another third-party (e.g. database). That's why it is fine to develop an initial application with sample data, where it is possible to read and write data without a database, but at some point you want to introduce a database to manage the data. The database would keep the data persistence across servers or even though one of your servers is not running.

The following sections will show you how to connect your Express application to a PostgreSQL database with Sequelize as ORM. If you haven't installed PostgreSQL on your machine yet, head over to this [guide on how to install PostgreSQL for your machine](https://www.robinwieruch.de/postgres-sql-macos-setup). It comes with a MacOS and a Windows setup guide. Afterward come back to the next section of this guide to learn more about using PostgreSQL in Express.

{{% chapter_header "PostgreSQL with Sequelize in Express Installation" "postgres-sequelize-express-installation" %}}

To connect PostgreSQL to your Express application, we will use an {{% a_blank "ORM" "https://en.wikipedia.org/wiki/Object-relational_mapping" %}} to convert information from the database to a JavaScript application without SQL statements. ORM is short for Object Related Mapping, a technique that programmers use to convert data among incompatible types. More specifically, ORMs mimic the actual database so a developer can operate within a programming language (e.g. JavaScript) without using a database query language (e.g. SQL) to interact with the database. The downside is the extra code abstraction, that's why there are developers who advocate against an ORM, but this shouldn't be a problem for many JavaScript applications without complex database queries.

For this application, we'll use {{% a_blank "Sequelize" "https://github.com/sequelize/sequelize" %}} as ORM, as it supports multiple dialects, one of which is PostgreSQL. Sequelize provides a comfortable API to work with PostgreSQL databases from setup to execution, but there are many ORMs (e.g. TypeORM, Objection.js) to choose from for a Node.js application if you want to expand your toolbelt.

Before you can implement database usage in your Node.js application, install sequelize and pg, which is the postgres client for Node.js, on the command line for your Node.js application:

{{< highlight javascript >}}
npm install pg sequelize --save
{{< /highlight >}}

After you have installed both libraries as node packages, we'll plan and implement our database entities with models and schemas.

{{% chapter_header "Database Models, Schemas and Entities" "database-schema-model-entity" %}}

The following case implements a database for your application with two database entities: User and Message. Often a database entity is called database schema or database model as well. You can distinguish them the following way:

* Database Schema: A database schema is close to the implementation details and tells the database (and developer) how an entity (e.g. user entity) looks like in a database table whereas every instance of an entity is represented by a table row. For instance, the schema defines fields (e.g. username) and relationships (e.g. a user has messages) of an entity. Each field is represented as a column in the database. Basically a schema is the blueprint for an entity.

* Database Model: A database model is a more abstract perspective on the schema. It offers the developer a conceptual framework on what models are available and how to use models as interfaces to connect an application to a database to interact with the entities. Often models are implemented with ORMs.

* Database Entity: A database entity is actual instance of a stored item in the database that is created with a database schema. Each database entity uses a row in the database table whereas each field of the entity is defined by a column. A relationship to another entity is often described with an identifier of the other entity and ends up as field in the database as well.

Let's get back to our Express application. Usually, there is a folder in your Node.js application called *src/models/* that contains files for each model in your database (e.g. *src/models/user.js* and *src/models/message.js*). Each model is implemented as a schema that defines the fields and relationships. There is often also a file (e.g. *src/models/index.js*) that combines all models and exports all them as database interface to the Express application.

Before diving into the code for your application, it's always a good idea to map the relationships between entities and how to handle the data that must pass between them. A {{% a_blank "UML (Unified Modeling Language)" "https://en.wikipedia.org/wiki/Unified_Modeling_Language" %}} diagram is a straightforward way to express relationships between entities in a way that can be referenced quickly as you type them out. This is useful for the person laying the groundwork for an application as well as anyone who wants to additional information in the database schema to it. An UML diagram could appear as such:

<div class="row">
  <div class="col-xs-8 col-centered">
    {{% pin_it_image "uml diagram" "img/posts/postgres-express-setup-tutorial/uml.png" "is-src-set" %}}
  </div>
</div>

The User and Message entities have fields that define both their identity within the construct and their relationships as association to each other. Now, we can start with the two models in the *src/models/[modelname].js* files, which could be expressed like the following without covering all the fields from the UML diagram for the sake of keeping it simple. First, the user model in the *src/models/user.js* file:

{{< highlight javascript >}}
const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  return User;
};

export default user;
{{< /highlight >}}

As you can see, the user has a username field which is represented as string type. Also we don't want to have duplicated usernames in our database, hence we add the unique attribute to the field. Next, we may want to associate the user with messages. Since a user can have many messages, we use a 1 to N association:

{{< highlight javascript "hl_lines=9 10 11" >}}
const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  User.associate = models => {
    User.hasMany(models.Message, { onDelete: 'CASCADE' });
  };

  return User;
};

export default user;
{{< /highlight >}}

We can also implement additional methods on our model. Let's assume our user entity ends up with an email field in the future. Then we could add a method that finds a user by their an abstract "login" term, which is the username or email in the end, in the database. That's helpful when users are able to login to your application via username *or* email adress. You can implement it as method for your model. After, this method would be available next to all the other build-in methods that come from your chosen ORM:

{{< highlight javascript "hl_lines=13 14 15 16 17 18 19 20 21 22 23 24 25" >}}
const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  User.associate = models => {
    User.hasMany(models.Message, { onDelete: 'CASCADE' });
  };

  User.findByLogin = async login => {
    let user = await User.findOne({
      where: { username: login },
    });

    if (!user) {
      user = await User.findOne({
        where: { email: login },
      });
    }

    return user;
  };

  return User;
};

export default user;
{{< /highlight >}}

The message model looks quite similar, even though we don't add any custom methods to it and the fields are pretty straightforward with only a text field:

{{< highlight javascript >}}
const message = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    text: DataTypes.STRING,
  });

  Message.associate = models => {
    Message.belongsTo(models.User);
  };

  return Message;
};

export default message;
{{< /highlight >}}

Sequelize is used to define the model with its content (composed of `DataTypes` and optional configuration). Furthermore, additional methods can be added to shape the database interface and the associate property is used to create relations between models. An user can have multiple messages, but a Message belongs to only one user. You can dive deeper into these concepts in the {{% a_blank "Sequelize documentation" "http://docs.sequelizejs.com/" %}}. Next, in your *src/models/index.js* file, import and combine those models and resolve their associations using the Sequelize API:

{{< highlight javascript >}}
import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

const models = {
  User: sequelize.import('./user'),
  Message: sequelize.import('./message'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
{{< /highlight >}}

At the top of the file, you create a Sequelize instance by passing mandatory arguments (database name, database superuser, database superuser's password and additional configuration) to the constructor. For instance, you need to tell Sequelize the dialect of your database, which is postgres rather than mysql or sqlite. In our case, we are using environment variables, but you can pass these variables as strings in the source code too.

Note: If you don't have a superuser or dedicated database for your application yet, head over to the PostgreSQL setup guide to create them. You only have to create a superuser once, but every of your applications should have its own database.

Lastly, use the created Sequelize instance in your Express application. It connects to the database asynchronously and once this is done you can start your Express application.

{{< highlight javascript >}}
import express from 'express';

// Express related imports
// other node package imports
...

import models, { sequelize } from './models';

const app = express();

// additional Express stuff: middleware, routes, ...
...

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Your Server is up and running');
  });
});
{{< /highlight >}}

If you want to re-initialize your database on every Express server start, you can add a condition to your sync method: `sequelize.sync({ force: true }).then(...)`. That's it for defining your database models for your Express application and for connecting everything to the database once you start your application. Once you start your application again, the command line results will show how the tables in your database were created. You can tap into those tables using the psql shell and the Meta-Commands.