+++
title = "Setup MongoDB with Mongoose in Express Tutorial"
description = "A checklist for a MongoDB on MacOS or Windows setup for having a NoSQL database in an Express.js application. Leave out the Express part to just set up MongoDB on MacOS ..."
date = "2019-01-03T13:50:46+02:00"
tags = ["Node", "JavaScript"]
categories = ["Node", "JavaScript"]
keywords = ["mongodb express", "mongodb macos", "mongodb windows", "mongodb express mongoose"]
news_keywords = ["mongodb express", "mongodb macos", "mongodb windows", "mongodb express mongoose"]
hashtag = "#NodeJs"
card = "img/posts/mongodb-express-setup-tutorial/banner_640.jpg"
banner = "img/posts/mongodb-express-setup-tutorial/banner.jpg"
contribute = "mongodb-express-setup-tutorial.md"
headline = "Setup MongoDB with Mongoose in Express Tutorial"

summary = "The article is a checklist for myself, but for anyone else setting up MongoDB on MacOS for having a NoSQL database in an Express.js application. You can leave out the Express part to just set up MongoDB on MacOS."
+++

{{% sponsorship %}}

{{% pin_it_image "mongodb express tutorial" "img/posts/mongodb-express-setup-tutorial/banner.jpg" "is-src-set" %}}

The tutorial is a checklist for setting up MongoDB on MacOS, with a non-relational database in an Express.js application. Leave out the Express part to just set up MongoDB on MacOS, If you want to run MongoDB on Windows, you will find guidance here as well. You might be wondering why there's a need for another setup guide for MongoDB in the first place since there are a few across the web. I found many tutorials and guides on how to set it up but found most of them to be unclear and outdated, based on old MongoDB versions. The checklist is not comprehensive, though, as it pertains to my own way of doing things, so any feedback on simpler or more universal means is always welcome.

{{% chapter_header "MacOS MongoDB Setup" "mongodb-setup-macos" %}}

I recommend {{% a_blank "Homebrew" "https://brew.sh/" %}} for installing and managing applications on MacOS. It is installed using the following command in the MacOS terminal. Open up the terminal and paste the command:

{{< highlight javascript >}}
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
{{< /highlight >}}

The terminal runs through a series of installation operations, and will probably create folders in your local machine to accommodate Homebrews storage requirements. You can find more detailed instructions [here](https://www.robinwieruch.de/developer-setup/). After it's installed, update the Homebrew dependencies and install MongoDB on the command line:

{{< highlight javascript >}}
brew update
brew install mongodb
{{< /highlight >}}

It will take a few seconds. Once it's done, create a directory so MongoDB can store its data.

{{< highlight javascript >}}
sudo mkdir -p /data/db
{{< /highlight >}}

Now to make sure this data directory have the right permissions, you'll run this command:

{{< highlight javascript >}}
sudo chown -R `id -un` /data/db
{{< /highlight >}}

Now our data directory is ready with right permissions. Next run mongo daemon. Which is a service which runs in the background and listens for connections on a given port. Run this command:

{{< highlight javascript >}}
mongod
{{< /highlight >}}

Now mongo daemon will be running in the background and can be used by your applications. Next, check your MongoDB version:

{{< highlight javascript >}}
mongo --version
MongoDB shell version: 4.0.5
{{< /highlight >}}

The command line results will show the version you have installed on your local machine. I recommend using the latest version of libraries and software whenever possible to avoid compatibility issues with client-side applications.

{{% chapter_header "Windows MongoDB Setup" "mongodb-setup-windows" %}}

For Microsoft Windows, it requires a manual download of the installer (.msi) from the {{% a_blank "MongoDB Download Center" "https://www.mongodb.com/download-center/community" %}}:

* The Download Center should display MongoDB Community Server download information. If not, select Server, then click the MongoDB Community Server tab.
* In the Version dropdown, select the version that corresponds to the latest MongoDB Server.
* In the OS dropdown, Windows 64-bit X64 should be selected.
* In the Package dropdown, MSI should be selected.
* Click Download.
* Go to the directory where you downloaded the MongoDB installer (.msi file) and run it. Accept the license agreement and do a complete installation.

To use MongoDB on Windows, the *bin* folder must be included under thepath in the environmental variables. To do this navigate to System Properties and find the Advanced System Settings tab, where the Environmental Variables button can be seen at the bottom of the Window below Startup and Recovery. Add the directory *C:\Program Files\MongoDB\Server\4.0\binunder* the system variablePath. Here, *4.0* is for the versions *4.x.x* , in the future it can be different depending on your version. You can verify the installation in the command prompt by navigating to the MongoDB installation folder and running this command:

{{< highlight javascript >}}
mongo --version
MongoDB shell version v4.0.5
git version: 3739429dd92b92d1b0ab120911a23d50bf03c412
allocator: tcmalloc
modules: none
build environment:
    distmod: 2008plus-ssl
    distarch: x86_64
    target_arch: x86_64
{{< /highlight >}}

You need to create a directory so MongoDB can store its data.

{{< highlight javascript >}}
md c:\data\db
{{< /highlight >}}

Now you will run mongo daemon. Which is a service which runs in the background and listens for connections on a given port. Run this command:

{{< highlight javascript >}}
mongod
{{< /highlight >}}

Now mongo daemon will be running in the background and can be used by your applications.

You may also need to manually install Node.js for the `npm` operations we'll be using later. Like the MongoDB installation, the link is to a straightforward .exe installer that can be verified with a similar version check (`node --version`) in the command prompt's default directory. If you find that any of these steps are giving errors, try logging out and back in to confirm the environmental variables and registry changes. While the remaining tutorial will focus on MacOS, you should be able to follow along on windows with minimal alterations to satisfy naming conventions.

{{% chapter_header "A minimal MongoDB with Mongoose in Express Setup" "mongodb-mongoose-express" %}}

To connect MongoDB to your Express application, use an ORM to convert information from the database to a JavaScript application. An ORM is short for Object Related Mapping, a technique that programmers use to create a sort of “virtual” database, useful for converting data among incompatible types. More specifically, ORMs mimic the actual database so a developer can operate within a programming language and worry about conversions after the fact. This reduces the amount of code needed for communication between the Object-Domain Model (ODM) and Relational Models, and decreases runtimes dramatically The downside is added code abstraction, but this shouldn't be a problem for simple JavaScript applications.

For this application, we'll use {{% a_blank "Mongoose" "https://github.com/Automattic/mongoose" %}}. Before you can implement database usage in your Node.js application, install Mongoose on the command line using npm:

{{< highlight javascript >}}
npm install mongoose --save
{{< /highlight >}}

Now load the mongoose. First, we need to define a connection. If your app uses only one database, you should use `mongoose.connect`. If you need to create additional connections, use the `mongoose.createConnection` method instead.

{{< highlight javascript >}}
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/my_database')
  .then(
    () => {
      // ready to use
    },
    (error) => {
      // handle initial connection error
    }
  );
{{< /highlight >}}

Note: The *my_database* will be the name of your database. If the database already exists MongoDB will connect your app to that database. Otherwise, it will create a new database for you. You don't need to handle this manually.

To store objects in MongoDB, we need to deﬁne a Mongoose schema ﬁrst. The schema deﬁnes the shape of documents in MongoDB. The following case implements a database for a application with two models: User and Message. Usually, there is a folder in your Node.js application called src/models/ that contains files for each schema in your database (e.g. *src/models/user.js* and *src/models/message.js*).

Before diving into the code for your application, it's always a good idea to map the relationships between entities and how to handle the data that must pass between them. A UML diagram (short for Unified Modeling Language) is a straightforward way to express relationships between entities in a way that can be referenced quickly as you type them out. This is useful for the person laying the groundwork for an application as well as anyone who wants to add to it. For our chat application, the UML diagram would appear as such:

<div class="row">
  <div class="col-xs-8 col-centered">
    {{% pin_it_image "database uml" "img/posts/mongodb-express-setup-tutorial/uml.png" "is-src-set" %}}
  </div>
</div>

Note that the models User and Message have attributes that define both their identity within the construct and their relationships to each other. Now that we have our relationships mapped, we can start with the two models in the src/models/[modelname].js files, which could be expressed like the following:

{{< highlight javascript >}}
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  createdAt: Date,
  username: String,
  email: String,
  passsword: String
});

const User = mongoose.model('User', userSchema);

export default User;
{{< /highlight >}}

The Message model looks quite similar:

{{< highlight javascript >}}
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  createdAt: Date,
  text: String,
  user: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
{{< /highlight >}}

Lastly, use the created mongoose models in your Express application:

{{< highlight javascript >}}
import express from 'express';
import mongoose from 'mongoose';

...
// here you have your express related imports
...

import Message from './models/message';
import User from './models/user';

const app = express();

...
// here you do your express server setup
...

mongoose.connect('mongodb://localhost/my_database')
  .then(() => {
    app.listen(3000, () => {
      console.log('Your Server is up and running at 3000');
    });
  });
{{< /highlight >}}

If you have any further tips or improvements for it, I encourage you to leave a comment below, especially if you have improvements for the terminology. Otherwise, I hope this walkthrough helped to set up MongoDB with Mongoose or any other ODM in your Express application on MacOS and Windows.