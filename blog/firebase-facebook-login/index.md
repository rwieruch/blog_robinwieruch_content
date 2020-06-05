---
title: "Firebase Login with Facebook"
description: "A tutorial on how to activate Facebook login for Firebase or Firestore where no email is required. After enabling the sign in method in Firebase, you have to create a Facebook App ..."
date: "2018-12-07T07:52:46+02:00"
categories: ["React", "Firebase"]
keywords: ["firebase facebook login", "firebase facebook login no email", "firebase login with facebook", "firebase facebook sign in", "firebase facebook login web"]
hashtags: ["#100DaysOfCode", "#Firebase"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<ReactFirebaseBook />

In this short visual guide, I want to show you how to activate the Facebook authentication for your Firebase or Firestore application. It should only take you a couple of minutes to set up the Facebook as web login for your app. Afterward, there is no email needed for your users to authenticate with your application.

First, on your Firebase project's dashboard, navigate to the Authentication/Sign-in method option. There you can enable the Facebook sign in method that enables you to login people via Facebook to your [Firebase application](/complete-firebase-authentication-react-tutorial).

![firebase sign in methods](./images/banner.jpg)

When enabling the Facebook login method, where no email is needed to sign in to your application later, you need to provide an API key and API secret. Note that all shown sensitive data is fake here, so there is no need to do something with it.

![firebase facebook login web](./images/firebase-sign-in-method-facebook.jpg)

You will get both credentials when creating a Facebook App which we will do in the next steps. Also you need to copy the callback URL for later, because this needs to be provided when creating the Facebook App.

Head over to Facebook to [create a Facebook App](https://developers.facebook.com/). If you don't have a Facebook account yet, create one and optionally follow [my posts](https://www.facebook.com/rwieruch/) for other web development tutorials. Next provide an identifiable App name and insightful App description.

![facebook app create](./images/facebook-app-create.jpg)

Create your application. Afterward, you can edit the details of your Facebook App. For instance, retrieve your App ID and App Secret for your Facebook App from your Settings/Basic configuration to use them somewhere else. If you setup the Facebook Sign In Method for Firebase, provide Firebase the App ID and the App Secret when enabling it.

![facebook app api id secret](./images/facebook-app-api-id-secret.jpg)

You also want to enable the Login Product for your Facebook App. Navigate to your Dashboard and scroll until you see the Products area. There you can choose the Facebook Login Product.

![facebook app dashboard products](./images/facebook-app-dashboard-products.jpg)

Afterward, under the Settings configuration for the Facebook Login, provide the OAuth redirect URI that you get when enabling the Facebook Sign In Method in Firebase.

![facebook app oauth redirect uri](./images/facebook-app-oauth-redirect-uri.jpg)

You should be able to use the Facebook App in your [Firebase application](/react-firebase-social-login) or any other application now.
