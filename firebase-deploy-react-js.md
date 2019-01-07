+++
draft = true
title = "How to deploy a React application to Firebase"
description = "The tutorial shows you how to deploy a React.js application to Firebase Hosting. You will use Firebase CLI to perform the deployment for a create-react-app app ..."
date = "2018-12-03T07:52:46+02:00"
tags = ["React", "JavaScript"]
categories = ["React", "JavaScript"]
keywords = ["firebase deploy react", "firebase react js deployment", "create-react-app firebase deploy"]
news_keywords = ["firebase deploy react", "firebase react js deployment", "create-react-app firebase deploy"]
hashtag = "#ReactJs"
card = "img/posts/firebase-deploy-react-js/banner_640.jpg"
banner = "img/posts/firebase-deploy-react-js/banner.jpg"
contribute = "firebase-deploy-react-js.md"
headline = "How to deploy a React application to Firebase"

summary = "The tutorial shows you how to deploy a React.js application to Firebase Hosting. You will use Firebase CLI to perform the deployment for a create-react-app app."
+++

{{% sponsorship %}}

{{% pin_it_image "firebase deploy react" "img/posts/firebase-deploy-react-js/banner.jpg" "is-src-set" %}}

{{% react-firebase-book %}}

{{% read_before_8 "This tutorial is part 9 of 9 in this series." "Part 1:" "A Firebase in React Tutorial for Beginners" "https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial" "Part 2:" "React Firebase Authorization with Roles" "https://www.robinwieruch.de/react-firebase-authorization-roles-permissions" "Part 3:" "React Firebase Auth Persistence with Local Storage" "https://www.robinwieruch.de/react-firebase-auth-persistence" "Part 4:" "React Firebase Social Login: Google, Facebook, Twitter" "https://www.robinwieruch.de/react-firebase-social-login" "Part 5:" "React Firebase: Link Social Logins" "https://www.robinwieruch.de/react-firebase-link-social-logins" "Part 6:" "React Firebase: Email Verification" "https://www.robinwieruch.de/react-firebase-email-verification" "Part 7:" "How to use React Router with Firebase" "https://www.robinwieruch.de/react-firebase-router" "Part 8:" "How to use Firebase Realtime Database in React" "https://www.robinwieruch.de/react-firebase-realtime-database" %}}

After we built a full-fledged Firebase application in React, the final step is deployment, the tipping point of getting your ideas out into the world, from consuming tutorials to producing applications. Since you have already used Firebase extensively for your application, why not choosing Firebase Hosting for the deployment?

In this section, I want to guide you through deploying your React to Firebase. It works for create-react-app too. Also it should work for any other library and framework such as Angular or Vue. First, install the Firebase CLI globally to your node modules:

{{< highlight javascript >}}
npm install -g firebase-tools
{{< /highlight >}}

Using a global installation of the Firebase CLI, you can deploy any application without worrying the dependency in your project. For any global installed node package, remember to update the it occasionally to a newer version with the identical command:

{{< highlight javascript >}}
npm install -g firebase-tools
{{< /highlight >}}

Next associate the Firebase CLI with a Firebase account (Google account):

{{< highlight javascript >}}
firebase login
{{< /highlight >}}

There should be a URL in your command line that opens in a webbrowser. If this doesn't happen, Firebase CLI may open up the URL automatically. Choose your Google account you used earlier to create a Firebase project\, and give Google the necessary permissions. You should see a confirmation for a successful setup. Return to the command line to verify a successful login.

Next, move to the project's folder and execute the following command, which initializes a Firebase project that can be used for the Firebase hosting features:

{{< highlight javascript >}}
firebase init
{{< /highlight >}}

Then, choose the Hosting option. If you are interested in using another tool to host your Firebase application, choose another option:

{{< highlight javascript >}}
? Which Firebase CLI features do you want to setup for this folder? Press Space to select features, then Enter to confirm your choices.
 ◯ Database: Deploy Firebase Realtime Database Rules
 ◯ Firestore: Deploy rules and create indexes for Firestore
 ◯ Functions: Configure and deploy Cloud Functions
❯◯ Hosting: Configure and deploy Firebase Hosting sites
 ◯ Storage: Deploy Cloud Storage security rules
{{< /highlight >}}

Since Google knows about Firebase projects associated with your account after logged in, you are able to select your Firebase project from a list of projects from the Firebase platform:

{{< highlight javascript >}}
First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add,
but for now we'll just set up a default project.

? Select a default Firebase project for this directory:
-> react-firebase-authentic-d12f8 (react-firebase-authentication)
i  Using project react-firebase-authentic-d12f8 (react-firebase-authentication)
{{< /highlight >}}

There are a few other configuration steps to define. Instead of using the default *public/* folder, we want to use the *build/* folder for create-react-app. If you set up the bundling with a tool like Webpack, you can choose the appropriate name for the build folder:

{{< highlight javascript >}}
? What do you want to use as your public directory? build
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? File public/index.html already exists. Overwrite? No
{{< /highlight >}}

The create-react-app application creates a *build/* folder after you perfrom the`npm run build` for the first time. There you will find all the merged content from the *public/* folder and the *src/* folder. Since it is a single page application, we want to redirect the user always to the *index.html* file. From there React Router takes over for the client-side routing.

Now your Firebase initialization is complete. This step created a few configuration files for Firebase Hosting in your project's folder. You can read more about them in {{% a_blank "Firebase's documentation" "https://firebase.google.com/docs/hosting/full-config" %}} for configuring redirects, a 404 page, or headers. Finally, deploy your React application with Firebase on the command line:

{{< highlight javascript >}}
firebase deploy
{{< /highlight >}}

After a successful deployment, you should see a similar output with your project's identifier:

{{< highlight javascript >}}
Project Console: https://console.firebase.google.com/project/react-firebase-authentic-d12f8/overview
Hosting URL: https://react-firebase-authentic-d12f8.firebaseapp.com
{{< /highlight >}}

Visit both pages to observe the results. The former link navigates to your Firebase project's dashboard. There, you should have a new panel for the Firebase Hosting. The latter link navigates to your deployed React application.

If you only see a blank page for your deployed React application, see if the `public` key/value pair in the *firebase.json* is set to `build`. That's the case if your build folder has the name *build*. If it has another name, set the value to this. Second, check if you have ran the build script of your React app with `npm run build`. After you have done both steps, try another deployment with `firebase deploy`. That should get your recent React build up and running for Firebase Hosting.

### Exercises

* Read more about {{% a_blank "Firebase Hosting Features" "https://firebase.google.com/docs/hosting/" %}}.
* Read more about {{% a_blank "how to host with Firebase Hosting" "https://firebase.google.com/docs/hosting/quickstart" %}}.
* {{% a_blank "Connect your domain to your Firebase deployed application" "https://firebase.google.com/docs/hosting/custom-domain" %}}.