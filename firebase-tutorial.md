+++
title = "A visual Firebase Tutorial"
description = "A short visual Firebase tutorial should help you to create your first Firebase application that can be used with any web framework/library such as React, Angular or Vue ..."
date = "2018-12-07T07:52:46+02:00"
tags = ["JavaScript"]
categories = ["JavaScript"]
keywords = ["firebase tutorial", "firebase authentication", "firebase cloud firestore", "firestore", "firebase realtime database", "firebase hosting"]
news_keywords = ["firebase tutorial", "firebase authentication", "firebase cloud firestore", "firestore", "firebase realtime database", "firebase hosting"]
hashtag = "#Firebase"
card = "img/posts/firebase-tutorial/banner_640.jpg"
banner = "img/posts/firebase-tutorial/banner.jpg"
contribute = "firebase-tutorial.md"
headline = "A visual Firebase Tutorial"

summary = "A short visual Firebase tutorial should help you to create your first Firebase application that can be used with any web framework/library such as React, Angular or Vue."
+++

{{% sponsorship %}}

{{% react-firebase-book %}}

This short visual Firebase tutorial should help you to create your first Firebase application that can be used with any web framework/library such as React, Angular or Vue. For instance, you can use it for this [extensive Firebase in React tutorial](https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/) that uses all the features we will discuss in this visual guide.

Let's start by {{% a_blank "creating a Firebase application with your Google Account" "https://console.firebase.google.com" %}}. Therefore, hit the "Add Project" button to create a new Firebase project: 

{{% pin_it_image "firebase tutorial" "img/posts/firebase-tutorial/banner.jpg" "is-src-set" %}}
￼
Then give your project a remarkable name.

{{% pin_it_image "firebase project" "img/posts/firebase-tutorial/firebase-project.jpg" "is-src-set" %}}
￼
It is up to you to share analytical insights in form of data with Google.

{{% pin_it_image "firebase create project analytics" "img/posts/firebase-tutorial/firebase-create-project-analytics.jpg" "is-src-set" %}}
￼
Afterward it takes a couple of seconds to setup your Firebase project. Then you should find yourself on your Firebase project's dashboard.

{{% pin_it_image "firebase dashboard" "img/posts/firebase-tutorial/firebase-dashboard.jpg" "is-src-set" %}}
￼
Above of the "Add an app to get started" you find three icons whereas the last one would be for a web application. Click the button and find your Firebase Configuration that should be used to connect your application to the Firebase API.
￼
{{% pin_it_image "firebase configuration" "img/posts/firebase-tutorial/firebase-configuration.jpg" "is-src-set" %}}

It is recommended to keep this sensible data in your environment variables in your project to configure your application. Even though this information is accessible in your client-side application, it's okay to have them publicly available. You need to project your Firebase application later with other mechanisms (.e.g Read/Write Rules, Domain Restrictions). That's it for the Firebase setup with a configuration. You should be able to get along with the initial steps of setting up a Firebase application. 

{{% chapter_header "Firebase Authentication" "firebase-authentication" %}}

If you want to use authentication mechanisms with your Firebase application, to enable users to sign up, sign in and sign out, you need to head over to the Authentication option.

{{% pin_it_image "firebase authentication" "img/posts/firebase-tutorial/firebase-authentication.jpg" "is-src-set" %}}
￼
You can either set up a sign in method here or by clicking the Sign-in method option above.
￼
{{% pin_it_image "firebase sign in methods" "img/posts/firebase-tutorial/firebase-sign-in-methods.jpg" "is-src-set" %}}

Let's enable the Email/Password sign in method so that users can login with a email and password in your application.
￼
{{% pin_it_image "firebase login email password" "img/posts/firebase-tutorial/firebase-login-email-password.jpg" "is-src-set" %}}

That's it. You can implement email/password authentication flows in your application now. If you click the Users option above, and users have actually signed up in your application, you can see these users in a list with their authentication methods.
￼
{{% pin_it_image "firebase authentication social logins" "img/posts/firebase-tutorial/firebase-authentication-social-logins.jpg" "is-src-set" %}}

If you want to setup social sign in methods such as Google, Facebook and Twitter, head over to [this tutorial that guides you through the process of setting up Facebook and Twitter Apps, but also through the necessary source code implementation](https://www.robinwieruch.de/react-firebase-social-login/). Otherwise you can also follow these visual guides on how to setup [Facebook](https://www.robinwieruch.de/firebase-facebook-login/) and [Twitter](https://www.robinwieruch.de/firebase-twitter-login/).

Firebase authentication comes with more advanced features that go beyond the login of a user to your application. What about password reset/change, email change or email verification features? Firebase helps you with these things. In case you want to adjust email templates for these features, for instance for a email verification that a user receives to confirm their email, you can do it in the Templates option.
￼
{{% pin_it_image "firebase authentication templates" "img/posts/firebase-tutorial/firebase-authentication-templates.jpg" "is-src-set" %}}

You can find more about the implementation details in the Firebase in React tutorial referenced in the beginning of this visual guide.

{{% chapter_header "Firebase Database" "firebase-database" %}}

If you navigate to the Database option, you will be presented with two database options for Firebase: the newer Cloud Firestore and the Firebase Realtime Database.
￼
{{% pin_it_image "firebase cloud firestore" "img/posts/firebase-tutorial/firebase-cloud-firestore.jpg" "is-src-set" %}}

You need to find out yourself which {{% a_blank "matches the requirements of your application" "https://firebase.google.com/docs/database/rtdb-vs-firestore" %}}.
￼
{{% pin_it_image "firebase realtime database" "img/posts/firebase-tutorial/firebase-realtime-database.jpg" "is-src-set" %}}

The Firebase in React tutorial from the beginning shows you how to implement the older Firebase Realtime Database, but also shows you how to migrate over to Cloud Firestore in the end. Choosing one doesn't mean to use it forever. If you would use the Cloud Firestore, your Database could look like the following in your Firebase project's dashboard.
￼
{{% pin_it_image "firebase firestore database" "img/posts/firebase-tutorial/firebase-firestore-database.jpg" "is-src-set" %}}

While Firebase manages users that are created from authentication sign up/in methods with email/password or social logins such as Google, Facebook or Twitter, you are in charge to create the user entities yourself in the database. Next to the users you can create other entities such as messages for a chat application or projects for a project management software.

**Careful:** While Firebase Realtime Database can be used on the free plan, Cloud Firestore is charged by usage. That's why you can {{% a_blank "set monthly quotas" "https://firebase.google.com/docs/firestore/quotas" %}} and {{% a_blank "budget alerts" "https://cloud.google.com/billing/docs/how-to/budgets" %}}. You can always see the pricing plan, and adjust it, in the bottom left corner of your Firebase project's dashboard.

{{% pin_it_image "firebase quota" "img/posts/firebase-tutorial/firebase-quota.jpg" "is-src-set" %}}
￼
For the sake of completion, the Indexes option for Realtime Database and Cloud Firestore can be used to make your database queries faster. For instance, if you query a list of items ordered by property X, it makes sense to index the items by property X and not only there default identifier. Then it's more effortless for Firebase to retrieve the data indexed by the query property.

{{% chapter_header "Firebase Hosting" "firebase-hosting" %}}

Finally you can use Firebase to host your project on top of Google's infrastructure. When you navigate to the Hosting option, you can get started to deploy your application.
￼
{{% pin_it_image "firebase hosting" "img/posts/firebase-tutorial/firebase-hosting.jpg" "is-src-set" %}}

First you need to install the necessary node packages on the command line.
￼
{{% pin_it_image "firebase hosting npm" "img/posts/firebase-tutorial/firebase-hosting-npm.jpg" "is-src-set" %}}

Then you can login with your Google account, initialize a Firebase application, and finally deploy it.
￼
{{% pin_it_image "firebase hosting setup" "img/posts/firebase-tutorial/firebase-hosting-setup.jpg" "is-src-set" %}}

I have written about this in greater detail for [deploying a React application with Firebase Hosting](https://www.robinwieruch.de/firebase-deploy-react-js/). Otherwise, it's worth to mention that Firebase Hosting comes with all the essential features (e.g. analytics, domain support) other hosting provider would offer you as well.

That's it for my visual guide through setting up Firebase with authentication, database and hosting. If you want to go through the implementation of all these features, checkout the referenced React in Firebase tutorial from the beginning of this guide. Otherwise explore your Firebase project's dashboard a bit more to learn more about Firebase Cloud gor hosting files such as images, audio and video, and Cloud Functions for serverless business logic.