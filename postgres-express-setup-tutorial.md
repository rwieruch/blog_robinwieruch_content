+++
title = "Setup PostgreSQL with Sequelize in Express Tutorial"
description = "The article is a checklist for myself, but for anyone else setting up PostgreSQL 10 on MacOS for having a SQL database in an Express.js application. Leave out the Express part to just set up Postgres on MacOS ..."
date = "2018-05-07T13:50:46+02:00"
tags = ["Node", "JavaScript"]
categories = ["Node", "JavaScript"]
keywords = ["postgres express", "postgresql express", "postgres macos", "postgresql macos", "postgres express sequelize"]
news_keywords = ["postgres express", "postgresql express", "postgres macos", "postgresql macos", "postgres express sequelize"]
hashtag = "#NodeJs"
card = "img/posts/postgres-express-setup-tutorial/banner_640.jpg"
banner = "img/posts/postgres-express-setup-tutorial/banner.jpg"
contribute = "postgres-express-setup-tutorial.md"
headline = "Setup PostgreSQL with Sequelize in Express Tutorial"

summary = "The article is a checklist for myself, but for anyone else setting up PostgreSQL 10 on MacOS for having a SQL database in an Express.js application. You can leave out the Express part to just set up Postgres on MacOS."
+++

{{% sponsorship %}}

{{% pin_it_image "postgres express tutorial" "img/posts/postgres-express-setup-tutorial/banner.jpg" "is-src-set" %}}

The article started as a checklist I put together for myself, which I've decided to share with everyone who needs help setting up PostgreSQL on MacOS, to use SQL database in a Express.js application. If you're just setting up Postgres on MacOS, you can leave out the part about Express. If you attempt to run Postgres on Windows, you should be able to substitute most of the tools here for your machine. You might be wondering why there's a need for another setup guide for Postgres in the first place, since there are a few across the web. I found many tutorials and guides on how to set it up, but found most of them to be unclear and outdated, based on old Postgres versions. The checklist is not comprehensive, though, as it pertains to my own way of doing things, so any feedback on simpler or more universal means is always welcome.

{{% chapter_header "Postgres Setup on MacOS" "postgres-setup-macos" %}}

I recommend {{% a_blank "Homebrew" "https://brew.sh/" %}} for installing and managing applications on MacOS. It is installed using the following command in the MacOS terminal:

{{< highlight javascript >}}
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
{{< /highlight >}}

The terminal will go through a series of installation operations, and will probably create folders in your local machine to accommodate Homebrews storage requirements. You can find more detailed instructions [here](https://www.robinwieruch.de/developer-setup/). After it's installed, update  the Homebrew dependencies and install PostgreSQL on the command line:

{{< highlight javascript >}}
brew update
brew install postgresql
{{< /highlight >}}

Next, check your PostgreSQL version:

{{< highlight javascript >}}
postgres --version
postgres (PostgreSQL) 10.5
{{< /highlight >}}

The version at the time of this publication is PostgreSQL 10.5.  I look forward to continually updating this checklist as more versions are releasded.

{{% chapter_header "Setting up PostgreSQL as physical Database" "postgresql-create-database" %}}

Now you can initialize the physical space on your hard-disk to allocate databases. To do this , create a default postgres database on the command line in case it didn't happen automatically:

{{< highlight javascript >}}
initdb /usr/local/var/postgres
{{< /highlight >}}

You will see the error message: 'initdb: directory "/usr/local/var/postgres" exists but is not empty' if the database was already created when you installed postgreSQL.  It means the folder where you are attempting to create a database already has one.  You can verify this by navigating to to 'usr/local/var/postgres' on your local machine and verifying the folder is not empty, at which point you can move on to the next step.

When you connect to this physical database later on, you will see an {{% a_blank "actual database" "https://stackoverflow.com/questions/50210158/whats-the-difference-between-initdb-usr-local-var-db-and-createdb-db" %}} which is called "postgres" as well. The postgres database is meant to be the default database for any third-party tools that you are using in combination with PostgreSQL. These tools attempt to make the default connection to this default database, so you shouldn't delete it.

You can manually start and stop your Postgres database server with the following commands on the command line:

{{< highlight javascript >}}
pg_ctl -D /usr/local/var/postgres start
pg_ctl -D /usr/local/var/postgres stop
{{< /highlight >}}

The terminal will confirm these operations with `server started` and `server stopped` feedback. You start the server each time you boot up the machine with certain commands, but I like to control over when to start and stop my database server to avoid any complications.

{{% chapter_header "Creating your PostgreSQL Database" "postgres-create-database" %}}

Next, set up the actual database that can be used in applications. Make sure the server is started first, then type this in the command line:

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

An ORM is short for Object Related Mapping, a technique that programmers use to create a sort of "virtual" database, useful for converting data among incompatible types.  More specifically, ORMs mimic the actual database so a developer can operate within a programming language and worry about conversions after the fact.  This reduces the amount of code needed for communication between the Object-Domain Model (ODM) and Relational Models, and decreases runtimes immediately.  The downside is added code abstraction, but this shouldn't be a problem for simple JavaScript applications.

To connect PostgreSQL to your Express application, use an {{% a_blank "ORM" "https://en.wikipedia.org/wiki/Object-relational_mapping" %}} to convert your information from the database to your JavaScript application without performing SQL statements. {{% a_blank "Sequelize" "https://github.com/sequelize/sequelize.git" %}} is an ORM that supports multiple dialects, and PostgreSQL is one of those dialects. In general, Sequelize gives you a comfortable API to work with your actual PostgreSQL database from setup to execution.

Before you can implement database usage in your Node.js application, install sequelize and pg (postgres client for Node.js) on the command line  using npm:

{{< highlight javascript >}}
npm install pg sequelize --save
{{< /highlight >}}

The following case implements a database for a Twitter clone application with two models: Author and Tweet. Usually, there is a folder in your Node.js application called *src/models/* that contains files for each model in your database (e.g. *src/models/author.js* and *src/models/tweet.js*). There is alos a file (e.g. *src/models/index.js*) that combines all models and exports all the necessary information to the Express server.

Let's start with the two models in the *src/models/[modelname].js* files. The Author model could look like the following:

{{< highlight javascript >}}
const author = (sequelize, DataTypes) => {
  const Author = sequelize.define('author', {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  Author.associate = models => {
    Author.hasMany(models.Tweet);
  };

  return Author;
};

export default author;
{{< /highlight >}}

And the Tweet model looks quite similar to it:

{{< highlight javascript >}}
const tweet = (sequelize, DataTypes) => {
  const Tweet = sequelize.define('tweet', {
    text: DataTypes.STRING,
  });

  Tweet.associate = models => {
    Tweet.belongsTo(models.Author);
  };

  return Tweet;
};

export default tweet;
{{< /highlight >}}

Sequelize is used to define the model with its content (composed of `DataTypes` and optional configuration such as the `unique` flag for the username). Furthermore, the associate property is used to create relations between models. An Author can have multiple Tweets, but a Tweet belongs to only one Author. You can dive deeper into these concepts in the {{% a_blank "Sequelize documentation" "http://docs.sequelizejs.com/" %}}. Next, in your *src/models/index.js* file, import and combine those models and resolve their associations using the Sequelize API:

{{< highlight javascript >}}
import Sequelize from 'sequelize';

const sequelize = new Sequelize('twitter', 'postgres', 'postgres', {
  dialect: 'postgres',
});

const models = {
  Author: sequelize.import('./author'),
  Tweet: sequelize.import('./tweet'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
{{< /highlight >}}

At the top of the file, create a Sequelize instance by passing mandatory arguments (database name, username of database superuser, password of database superuser, configuration) to the constructor. For instance, you need to tell Sequelize the dialect of your database, which is postgres rather than mysql or sqlite. You may have to create the superuser with its credentials on the command line in the psql shell as well. Otherwise, you can also try to keep the credentials null.

{{< highlight javascript >}}
CREATE USER postgres WITH SUPERUSER PASSWORD 'postgres';
{{< /highlight >}}

If you haven't the named twitter database yet, you can create it on the command line as well, or you can use any other database you already created. Lastly, use the created Sequelize instance in your Express application:

{{< highlight javascript >}}
import express from 'express';
...
// here you have your express related imports
...

import models from './models';

const app = express();

...
// here you do your express server setup
...

models.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Your Server is up and running');
  });
});
{{< /highlight >}}

Once you start your application again, the command line results will show how the tables in your database were created. You can tap into those tables using the psql shell and the Meta-Commands. If you want to re-initialize your database on every Express server start, you can add a confition to your sync method: `sequelize.sync({ force: true }).then(...)`.

<hr class="section-divider">

That's it for the short checklist. If you have any further tips or improvements for it, I encourage you to leave a comment below, especially if you have improvements for the terminology or additional Meta-Commands you use regularly. Otherwise, I hope this walkthrough helped to set up PostgreSQL with Sequelize (or any other ORM) in your Express application on MacOS.
