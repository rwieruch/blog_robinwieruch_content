+++
title = "Firebase Login with Twitter"
description = "A tutorial on how to activate Twitter login for Firebase or Firestore where no email is required. After enabling the sign in method in Firebase, you have to create a Twitter App ..."
date = "2018-12-07T07:52:46+02:00"
tags = ["JavaScript"]
categories = ["JavaScript"]
keywords = ["firebase twitter login", "firebase twitter login no email", "firebase login with twitter", "firebase twitter sign in", "firebase twitter login web"]
news_keywords = ["firebase twitter login", "firebase twitter login no email", "firebase login with twitter", "firebase twitter sign in", "firebase twitter login web"]
hashtag = "#Firebase"
card = "img/posts/firebase-twitter-login/banner_640.jpg"
banner = "img/posts/firebase-twitter-login/banner.jpg"
contribute = "firebase-twitter-login.md"
headline = "Firebase Login with Twitter"

summary = "A tutorial on how to activate Twitter login for Firebase or Firestore where no email is required. After enabling the sign in method in Firebase, you have to create a Twitter App."
+++

{{% sponsorship %}}

{{% react-firebase-book %}}

In this short visual guide, I want to show you how to activate the Twitter authentication for your Firebase or Firestore application. It should only take you a couple of minutes to set up the Twitter as web login for your app. Afterward, there is no email needed for your users to authenticate with your application.

First, on your Firebase project's dashboard, navigate to the Authentication/Sign-in method option. There you can enable the Twitter sign in method that enables you to login people via Twitter to your [Firebase application](https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial).

{{% pin_it_image "firebase sign in methods" "img/posts/firebase-twitter-login/banner.jpg" "is-src-set" %}}

When enabling the Twitter login method, where no email is needed to sign in to your application later, you need to provide an API key and API secret. Note that all shown sensible data is fake here, so there is no need to do something with it.
￼
{{% pin_it_image "firebase twitter login web" "img/posts/firebase-twitter-login/firebase-sign-in-method-twitter.jpg" "is-src-set" %}}

You will get both credentials when creating a Twitter App which we will do in the next steps. Also you need to copy the callback URL for later, because this needs to be provided when creating the Twitter App.

Head over to Twitter to {{% a_blank "create a Twitter App" "https://developer.twitter.com/en/apps/create" %}}. If you don't have a Twitter account yet, create one and optionally follow {{% a_blank "my tweets" "https://twitter.com/rwieruch" %}} for other web development tutorials. Next provide an identifiable App name and insightful App description.
￼
{{% pin_it_image "twitter app create name description" "img/posts/firebase-twitter-login/twitter-app-create-name-description.jpg" "is-src-set" %}}

Provide also the callback URL that you get when enabling the Twitter Sign In Method in Firebase. Also provide a description for Twitter to review your application.
￼
{{% pin_it_image "twitter app create callback url" "img/posts/firebase-twitter-login/twitter-app-create-callback-url.jpg" "is-src-set" %}}

{{% pin_it_image "twitter app create description" "img/posts/firebase-twitter-login/twitter-app-create-description.jpg" "is-src-set" %}}

Create your application. Afterward, you can edit the details of your Twitter App. For instance, retrieve your Keys and Tokens for your Twitter App to use them somewhere else. If you setup the Twitter Sign In Method for Firebase, provide Firebase the API key and the API secret key when enabling it.

{{% pin_it_image "twitter app api keys secrets" "img/posts/firebase-twitter-login/twitter-app-api-keys-secrets.jpg" "is-src-set" %}}

You also want to edit the permission of your Twitter App to get access to your user's email address when they sign in with Twitter.

{{% pin_it_image "twitter app permissions" "img/posts/firebase-twitter-login/twitter-app-permissions.jpg" "is-src-set" %}}

You can edit the permission and add the privilege to access a user's email address.

{{% pin_it_image "twitter app permissions email" "img/posts/firebase-twitter-login/twitter-app-permissions-email.jpg" "is-src-set" %}}

You should be able to use the Twitter App in your [Firebase application](https://www.robinwieruch.de/react-firebase-social-login) or any other application now.