---
title: "How to setup MongoDB on Windows"
description: "A installation guide for a MongoDB on Windows setup for having a NoSQL database available on your OS. It comes with everything that's needed to connect a Node.js application to your database in JavaScript ..."
date: "2019-01-25T13:50:46+02:00"
categories: ["Node"]
keywords: ["mongodb windows", "mongodb setup", "mongodb os setup"]
hashtags: ["#NodeJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

This is a tutorial for setting up MongoDB on Windows. You might be wondering why there's a need for another setup guide for MongoDB in the first place, since there are a few across the web. I found many tutorials and guides on how to set it up, but found most of them to be unclear and outdated, based on old MongoDB versions. The checklist is not comprehensive, though, as it is used for several tutorials on my website, I keep it updated with the recent versions of MongoDB. If you spot any flaws in this guide, a comment below would be very helpful to keep it up to date for other developers.

If you want to run MongoDB on MacOS instead, you will find guidance over here: [How to setup MongoDB on MacOS](/mongodb-macos-setup/). Make sure to read it as well, even though you are on Windows, because this guide only shows you the Windows installation for MongoDB but not how to create databases or how to interact with them. That's covered in the MacOS guide instead.

# MongoDB Installation on Windows

For Microsoft Windows, it requires a manual download of the installer (.msi) from the [MongoDB Download Center](https://www.mongodb.com/download-center/community):

* The Download Center should display MongoDB Community Server download information. If not, select Server, then click the MongoDB Community Server tab.
* In the Version dropdown, select the version that corresponds to the latest MongoDB Server.
* In the OS dropdown, Windows 64-bit X64 should be selected.
* In the Package dropdown, MSI should be selected.
* Click Download.
* Go to the directory where you downloaded the MongoDB installer (.msi file) and run it. Accept the license agreement and do a complete installation.

To use MongoDB on Windows, the *bin* folder must be included under thepath in the environmental variables. To do this navigate to System Properties and find the Advanced System Settings tab, where the Environmental Variables button can be seen at the bottom of the Window below Startup and Recovery. Add the directory *C:\Program Files\MongoDB\Server\4.0\binunder* the system variablePath. Here, *4.0* is for the versions *4.x.x* , in the future it can be different depending on your version. You can verify the installation in the command prompt by navigating to the MongoDB installation folder and running this command:

```text
mongo --version
MongoDB shell version v4.0.5
git version: 3739429dd92b92d1b0ab120911a23d50bf03c412
allocator: tcmalloc
modules: none
build environment:
    distmod: 2008plus-ssl
    distarch: x86_64
    target_arch: x86_64
```

You need to create a directory so MongoDB can store its data.

```text
md c:\data\db
```

Now you will run mongo daemon. Which is a service which runs in the background and listens for connections on a given port. Run this command:

```text
mongod
```

Now mongo daemon will be running in the background and can be used by your applications. I recommed using the latest version of libraries and software whenever possible to avoid compatibility issues with client-side applications.

<ReadMore label="MongoDB with Mongoose in Express Tutorial" link="/mongodb-express-setup-tutorial" />
