+++
title = "Setup PostgreSQL with Sequelize in Express Tutorial"
description = "A comprehensive checklist for a  PostgreSQL on MacOS or Windows setup for having a SQL database in an Express.js application. Leave out the Express part to just set up Postgres on MacOS ..."
date = "2018-11-21T13:50:46+02:00"
tags = ["Node", "JavaScript"]
categories = ["Node", "JavaScript"]
keywords = ["postgres express", "postgresql express", "postgres macos", "postgresql macos", "postgres windows", "postgresql windows", "postgres express sequelize"]
news_keywords = ["postgres express", "postgresql express", "postgres macos", "postgresql macos", "postgres windows", "postgresql windows", "postgres express sequelize"]
hashtag = "#NodeJs"
card = "img/posts/postgres-express-setup-tutorial/banner_640.jpg"
banner = "img/posts/postgres-express-setup-tutorial/banner.jpg"
contribute = "postgres-express-setup-tutorial.md"
headline = "Setup PostgreSQL with Sequelize in Express Tutorial"

summary = "The article is a checklist for myself, but for anyone else setting up PostgreSQL 10 on MacOS for having a SQL database in an Express.js application. You can leave out the Express part to just set up Postgres on MacOS."
+++

{{% sponsorship %}}

{{% pin_it_image "postgres express tutorial" "img/posts/postgres-express-setup-tutorial/banner.jpg" "is-src-set" %}}

The article is a checklist for setting up PostgreSQL 10/11 on MacOS, with an SQL database in an Express.js application. Leave out the Express part to just set up Postgres on MacOS, If you want to run Postgres on Windows, you will find guidance here as well. You might be wondering why there's a need for another setup guide for Postgres in the first place, since there are a few across the web. I found many tutorials and guides on how to set it up, but found most of them to be unclear and outdated, based on old Postgres versions. The checklist is not comprehensive, though, as it pertains to my own way of doing things, so any feedback on simpler or more universal means is always welcome.

{{% chapter_header "MacOS Postgres Setup" "postgres-setup-macos" %}}

I recommend {{% a_blank "Homebrew" "https://brew.sh/" %}} for installing and managing applications on MacOS. It is installed using the following command in the MacOS terminal:

{{< highlight javascript >}}
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
{{< /highlight >}}

The terminal runs through a series of installation operations, and will probably create folders in your local machine to accommodate Homebrews storage requirements. You can find more detailed instructions [here](https://www.robinwieruch.de/developer-setup/). After it's installed, update  the Homebrew dependencies and install PostgreSQL on the command line:

{{< highlight javascript >}}
brew update
brew install postgresql
{{< /highlight >}}

Next, check your PostgreSQL version:

{{< highlight javascript >}}
postgres --version
postgres (PostgreSQL) 11.1
{{< /highlight >}}

The command line results will show the version you have installed on your local machine. I recommed using the latest version of libraries and software whenever possible to avoid compatibility issues with client-side applications.

{{% chapter_header "Windows Postgres Setup" "postgres-setup-windows" %}}

For Microsoft Windows, it is possible to run an unattended install using the command prompt or PowerShell. However, since it will still require a manual download of the installation files, it's easier to [download the .exe from the PostgreSQL Development Group]   (https://www.postgresql.org/download/windows/).  It comes with an installation wizard that covers the base setup, and you can still perform command-line operations on the directory after its installed.

To use PosgresQL on Windows, two of its directories must be included under the `path` in the environmental variables: the *bin* folder and the *lib* folder.  To do this navigate to System Properities and find the Advanced tab, where the Environmental Variables button can be seen at the bottom of the Window below Startup and Recovery.  Add the directories `C:\Program Files\PostgreSQL\11\bin` and `C:\Program Files\PostgreSQL\11\lib` under the system variable `Path`, next to to the default paths, and separate them by a semicolon (;).  You can verify the installation in the command prompt by navigating to the PostgreSQL installation folder and entering the same version check as before.

You may also need to manually install [Node.js](https://nodejs.org) for the `npm` operations we'll be using later.  Like the PosgreSQL installation, the link is to a straightforward .exe installer that can be verified with a similar version check (`node --version`) in the command prompt's default directory. If you find that any of these steps are giving errors, try logging out and back in to confirm the environmental variables and registry changes. While the remaining tutorial will focus on MacOS, you should be able to follow along on windows with minimal alterations to satisfy naming conventions.

{{% chapter_header "Setting up PostgreSQL as physical Database" "postgresql-create-database" %}}

Now you can initialize the physical space on your hard-disk to allocate databases. To do this , create a default postgres database on the command line in case it didn't happen automatically:

{{< highlight javascript >}}
initdb /usr/local/var/postgres
{{< /highlight >}}

You will see the error message: 'initdb: directory "/usr/local/var/postgres" exists but is not empty' if the database was already created when you installed PostgreSQL.  It means the folder where you are attempting to create a database already has one.  You can verify this by navigating to to 'usr/local/var/postgres' on your local machine and verifying the folder is not empty, at which point you can move on to the next step.

When you connect to this physical database later, you will see an {{% a_blank "actual database" "https://stackoverflow.com/questions/50210158/whats-the-difference-between-initdb-usr-local-var-db-and-createdb-db" %}} which is called "postgres" as well. The postgres database is meant to be the default database for any third-party tools that you are using in combination with PostgreSQL. These tools attempt to make the default connection to this default database, so you shouldn't delete it.

Manually start and stop your Postgres database server with the following commands:

{{< highlight javascript >}}
pg_ctl -D /usr/local/var/postgres start
pg_ctl -D /usr/local/var/postgres stop
{{< /highlight >}}

The terminal will confirm these operations with `server started` and `server stopped` feedback. You start the server each time you boot up the machine, but I like to control over when to start and stop my database server to avoid complications.

{{% chapter_header "Creating your PostgreSQL Database" "postgres-create-database" %}}

Next, set up the database you will use for applications. Make sure the server is started first, then type this in the command line:

{{< highlight javascript >}}
createdb mydatabasename
dropdb mydatabasename
{{< /highlight >}}

You can also connect to databases to execute SQL statements. Either use the `psql` command, or specify a database such as the default postgres database to connect.

{{< highlight javascript >}}
psql postgres
{{< /highlight >}}

The command leads you to the psql shell, which you can exit by typing CTRL + d. In the psql shell, you can create and drop databases as well:

{{< highlight javascript >}}
CREATE DATABASE mydatabasename;
DROP DATABASE mydatabasename;
{{< /highlight >}}

To list all your databases, you can type `\list`. Your will see any new databases listed, as well as two default databases that come with postgreSQL called `template0` and `template1`. The templates should remain in your database list even if you aren't using them, as they may be useful later. You can find more Meta-Commands for {{% a_blank "psql in their documentation for Postgres 10" "https://www.postgresql.org/docs/10/static/app-psql.html" %}}.

* \list - List all of your actual databases.
* \c mydatabasename - Connect to another database.
* \d - List the relations of your currently connected database.
* \d mytablename - Shows information for a specific table.

{{% chapter_header "A minimal Postgres with Sequelize in Express Setup" "postgres-sequelize-express" %}}

To connect PostgreSQL to your Express application, use an {{% a_blank "ORM" "https://en.wikipedia.org/wiki/Object-relational_mapping" %}} to convert information from the database to a JavaScript application without SQL statements. An ORM is short for Object Related Mapping, a technique that programmers use to create a sort of "virtual" database, useful for converting data among incompatible types.  More specifically, ORMs mimic the actual database so a developer can operate within a programming language and worry about conversions after the fact.  This reduces the amount of code needed for communication between the Object-Domain Model (ODM) and Relational Models, and decreases runtimes dramatically  The downside is added code abstraction, but this shouldn't be a problem for simple JavaScript applications.

For this application, we'll use {{% a_blank "Sequelize" "https://github.com/sequelize/sequelize.git" %}}, as it supports multiple dialects, one of which is PostgreSQL. Sequelize provides a comfortable API to work with PostgreSQL databases from setup to execution, but there are [many ORMs to choose](https://en.wikipedia.org/wiki/List_of_object-relational_mapping_software) from if you want to expand your toolbelt.

Before you can implement database usage in your Node.js application, install sequelize and pg (postgres client for Node.js) on the command line  using npm:

{{< highlight javascript >}}
npm install pg sequelize --save
{{< /highlight >}}

The following case implements a database for a chat application with two models: User and Message.: User and Message. Usually, there is a folder in your Node.js application called *src/models/* that contains files for each model in your database (e.g. *src/models/user.js* and *src/models/message.js*). There is also a file (e.g. *src/models/index.js*) that combines all models and exports all the necessary information to the Express server.

Before diving into the code for your application, it's always a good idea to map the relationships between objects and how to handle the data that must pass between them.  A UML diagram (short for Unifified Modeling Language) is a straightforward way to express relationships between entities in a way that can be referenced quickly as you type them out. This is useful for the person laying the groundwork for an application as well as anyone who wants to add to it. For our chat application, the UML diagram would appear as such:

<div class="row">
  <div class="col-xs-8 col-centered">
    {{% pin_it_image "database uml" "img/posts/postgres-express-setup-tutorial/uml.png" "is-src-set" %}}
  </div>
</div>

Note that the models User and Message have attributes that define both their identity within the construct and their relationships to each other.

Now that we have our relationships mapped, we can start with the two models in the *src/models/[modelname].js* files, which could be expressed like the following:

{{< highlight javascript >}}
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

The Message model looks quite similar:

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

Sequelize is used to define the model with its content (composed of `DataTypes` and optional configuration such as the `unique` flag for the username). Furthermore, the associate property is used to create relations between models. An user can have multiple Messages, but a Message belongs to only one user. You can dive deeper into these concepts in the {{% a_blank "Sequelize documentation" "http://docs.sequelizejs.com/" %}}. Next, in your *src/models/index.js* file, import and combine those models and resolve their associations using the Sequelize API:

{{< highlight javascript >}}
import Sequelize from 'sequelize';

const sequelize = new Sequelize('chat', 'postgres', 'postgres', {
  dialect: 'postgres',
});

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

At the top of the file, create a Sequelize instance by passing mandatory arguments (database name, username of database superuser, password of database superuser, configuration) to the constructor. For instance, you need to tell Sequelize the dialect of your database, which is postgres rather than mysql or sqlite. You may have to create the superuser with its credentials on the command line in the psql shell as well. Otherwise, you can also try to keep the credentials null.

{{< highlight javascript >}}
CREATE USER postgres WITH SUPERUSER PASSWORD 'postgres';
{{< /highlight >}}

If you haven't named the chat database yet, you can create it on the command line as well, or you can use any other database you already created. Lastly, use the created Sequelize instance in your Express application:

{{< highlight javascript >}}
import express from 'express';
...
// here you have your express related imports
...

import models, { sequelize } from './models';

const app = express();

...
// here you do your express server setup
...

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Your Server is up and running');
  });
});
{{< /highlight >}}

Once you start your application again, the command line results will show how the tables in your database were created. You can tap into those tables using the psql shell and the Meta-Commands. If you want to re-initialize your database on every Express server start, you can add a condition to your sync method: `sequelize.sync({ force: true }).then(...)`.

<hr class="section-divider">

If you have any further tips or improvements for it, I encourage you to leave a comment below, especially if you have improvements for the terminology or additional Meta-Commands you use regularly. Otherwise, I hope this walkthrough helped to set up PostgreSQL with Sequelize or any other ORM in your Express application on MacOS and Windows.