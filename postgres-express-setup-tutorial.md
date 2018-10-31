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

The article is a checklist for myself, but for anyone else setting up PostgreSQL on MacOS for having a SQL database in a Express.js application. You can leave out the Express part to just set up Postgres on MacOS. If you attempt to run Postgres on Windows, I believe you can substitute most of the tools here for your machine.

You may wonder: Why is there a need for another setup guide for Postgres in the first place? I found many tutorials and guides on how to set it up, but most of it was kinda blurry, outdated (old Postgres versions) and not to the point. So I wanted to have this little checklist for setting up Postgres 10 on MacOS for myself. If it is useful for you, it is an additional plus. The checklist is not comprehensive at all, maybe needs to be improved by using the correct terms (looking forward to your comments), but I will fill out the gaps along the way of using Postgres in Express myself.

{{% chapter_header "Postgres Setup on MacOS" "postgres-setup-macos" %}}

My personal recommendation is using {{% a_blank "Homebrew" "https://brew.sh/" %}} for installing and managing your applications on MacOS. Over here you can [find some help on how to setup Homebrew](https://www.robinwieruch.de/developer-setup/). Afterward, you can update all your Homebrew dependencies and install PostgreSQL on the command line:

{{< highlight javascript >}}
brew update
brew install postgresql
{{< /highlight >}}

Then you can check your PostgreSQL version on the command line:

{{< highlight javascript >}}
postgres --version
postgres (PostgreSQL) 10.3
{{< /highlight >}}

As you can see, it is all about PostgreSQL 10 in the following checklist. But I am looking forward to update this checklist once Postgres receives another update.

{{% chapter_header "Setting up PostgreSQL as physical Database" "postgresql-create-database" %}}

Now you can initialize the physical space on your hard-disk to allocate databases. Therefore, create the default postgres database on the command line in case it didn't happen automatically for you:

{{< highlight javascript >}}
initdb /usr/local/var/postgres
{{< /highlight >}}

When you connect to this physical database later on, you will see an {{% a_blank "actual database" "https://stackoverflow.com/questions/50210158/whats-the-difference-between-initdb-usr-local-var-db-and-createdb-db" %}} which is called "postgres" as well. The postgres database is meant to be the default database for any third-party tools that you are using in combination with PostgreSQL. These tools attempt to make the default connection to this default database, so you shouldn't delete it.

You can manually start and stop your Postgres database server with the following commands on the command line:

{{< highlight javascript >}}
pg_ctl -D /usr/local/var/postgres start
pg_ctl -D /usr/local/var/postgres stop
{{< /highlight >}}

In case you want to have the database server running once your machine booted, there are commands which you can look up to make it happen. As for me, I want to keep control over when to start and stop the database server.

{{% chapter_header "Creating your PostgreSQL Database" "postgres-create-database" %}}

Now, you will set up your actual database which can be used in your actual applications. On the command line, you have got the shell scripts to create and drop a database:

{{< highlight javascript >}}
createdb mydatabasename
dropdb mydatabasename
{{< /highlight >}}

However, you can also connect to your databases in order to execute SQL statements. Either the `psql` command works for you or you have to specify a database such as the default postgres database in order to connect to it.

{{< highlight javascript >}}
psql postgres
{{< /highlight >}}

Afterward you should be in the psql shell, which you can exit again by typing CTRL + d. Being in the psql shell, you can create and drop databases too:

{{< highlight javascript >}}
CREATE DATABASE mydatabasename;
DROP DATABASE mydatabasename;
{{< /highlight >}}

In order to list all your databases, you can type `\list`. Your new database should show up there, but also your default postgres database and two more default template0 and template1 databases. You shouldn't delete them. Apart from `\list`, you can find more Meta-Commands for {{% a_blank "psql in their documentation for Postgres 10" "https://www.postgresql.org/docs/10/static/app-psql.html" %}}.

* \list - List all of your actual databases.
* \c mydatabasename - Connect to another database.
* \d - List the relations of your currently connected database.
* \d mytablename - Shows information for a specific table.

{{% chapter_header "A minimal Postgres with Sequelize in Express Setup" "postgres-sequelize-express" %}}

In order to connect PostgreSQL to your Express application, you can use a {{% a_blank "ORM" "https://en.wikipedia.org/wiki/Object-relational_mapping" %}} to convert your information from the database to your JavaScript application without performing SQL statements yourself. {{% a_blank "Sequelize" "https://github.com/sequelize/sequelize.git" %}} is such an ORM which supports multiple dialects whereas PostgreSQL is one of those dialects. In general, Sequelize gives you a comfortable API to work with your actual PostgreSQL database from setup to execution.

Before you can implement the database usage in your Node.js application, you have to install sequelize and pg (postgres client for Node.js) on the command line by using npm:

{{< highlight javascript >}}
npm install pg sequelize --save
{{< /highlight >}}

The following use case implements a database for a Twitter clone application where you have the two models Author and Tweet. Therefore, you usually have a folder in your Node.js application called *src/models/*. Its content are files for each model in your database (e.g. *src/models/author.js* and *src/models/tweet.js*). Moreover, there is one file (e.g. *src/models/index.js*) which combines all models and exports all the necessary information to the Express server.

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

Sequelize is used to define the model with its content (composed of `DataTypes` and optional configuration such as the `unique` flag for the username). Furthermore, the associate property is used to create relations between models. Whereas an Author can have multiple Tweets, a Tweet belongs to only one Author. You can dive deeper into these things by reading up the {{% a_blank "Sequelize documentation" "http://docs.sequelizejs.com/" %}}. Next, in your *src/models/index.js* file, you import and combine those models and resolve their associations by using the Sequelize API:

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

At the top of the file, you have to create a Sequelize instance by passing mandatory arguments (database name, username of database superuser, password of database superuser, configuration) to the constructor. For instance, you have to tell Sequelize the dialect of your database which is postgres and not mysql or sqlite. You may have to create the superuser with its credentials on the command line while being in the psql shell too. Otherwise, you can also try to keep the credentials null.

{{< highlight javascript >}}
CREATE USER postgres WITH SUPERUSER PASSWORD 'postgres';
{{< /highlight >}}

If you haven't the named twitter database yet, you can create it on the command line as well. Or you can use any other database which you have created before.

Last but not least, you can use the created Sequelize instance in your Express application:

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

Once you start your application again, you should see on the command line that the tables in your database got created. You can tap into those tables by using the psql shell and the previously mentioned Meta-Commands. If you want to re-initialize your database on every Express server start, you can add a condition to your sync method: `sequelize.sync({ force: true }).then(...)`.

<hr class="section-divider">

That's it for the short checklist. If you have any further tips or improvements for it, you can leave a comment below. Especially if you have improvements for the terminology or additional Meta-Commands which you happen to use on a regular basis. Otherwise I hope the walkthrough helped you to set up PostgreSQL with Sequelize (or any other ORM) in your Express application on MacOS.