---
title: "Host a single or multiple applications on Digital Ocean"
description: "An extensive walkthrough on how to host your application on Digital Ocean. It showcases how multiple static websites can be hosted in one Droplet by using server blocks and how to deploy multiple APIs or node.js applications side by side in one Droplet with Dokku ..."
date: "2017-10-31T13:50:46+02:00"
categories: ["JavaScript", "Web Development"]
keywords: ["single multiple applications digital ocean"]
hashtags: ["#DigitalOcean"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

There a various tutorials showing you how to host your web applications with a couple of lines on any hosting solution. But that's it. You are able to host your application somewhere, but there are a lot of open questions. What about using an own domain? What about securing it with SSL? What about hosting multiple applications side by side yet keeping it cost efficient by not taking up to much resources? This article should fill the void and provide you a solution on how to host multiple applications on Digital Ocean. Disclaimer: I am not payed by Digital Ocean to write the article, but I enjoy using their product and I hope to give you guidance to setup your applications on their platform as well.

So what is the definition of an "application" for this article? In my cases, I host static websites, node.js applications with server-side rendered applications and node.js applications as pure APIs on Digital Ocean. It might be something different for you, but if you know the basic steps to setup a static website or node application on your hosting provider's platform, I believe that you can host any type of "application" on it.

All of my static websites, node applications and standalone APIs are hosted on Digital Ocean's Droplets. In the end of this article, you should be able to do the same for your applications. It should be horizontally scalable and you should be able to take ownership of it. Digital Ocean gave me a perfect start in the world of hosting and taking control of it, because it is a pleasant experience to use their platform. They have a handful of out of the box solutions to bootstrap your virtual machine and there are plenty of high quality tutorials guiding you through the most common scenarios. Most of the time, you can just copy and paste their instructions to the command line of your local machine or remote server, but if you need elaborated explanations for these commands, you will surely find them in their tutorials. Furthermore, I find it is a cost efficient way to host applications on their platform. For instance, I host a bunch of websites side by side on a single 5$ Droplet and you can do the same with your applications.

The article is a checklist, because it doesn't explain every step from scratch, but refers to all the necessary tutorials written by Digital Ocean for the whole setup. Furthermore, the article describes the whole process for macOS users, because I use it myself. However, I believe you can substitute most of the things for Windows and Linux.

If you find any mistakes, pitfalls or potential improvements for the article, please write it in the comments. The article may not be 100% complete, but I hope to give you the foundations to setup everthing yourself. If there is something missing, please write it down in the commtents as well.

The following walkthrough will guide you through the setup process of hosting a single or multiple applications on one Digital Ocean Droplet. The setup between (1) static websites and (2) node applications differs, so depending on your use case, keep an eye open for these numbers. A chapter without any numbering should be applied to both use cases, a chapter with an (1) should be applied for a single or multiple static websites on one Droplet and a chapter with a (2) should be applied for a single or multiple node applications on one Droplet. So if you are only here for the node applications, you can skip all the (1) parts. If you are only here for the static websites, you can skip all the (2) parts.

In the end, there will be a couple of dedicated articles, following up after this article, about

* [Hosting Hugo on Digital Ocean](/own-website-in-five-days/) (1)
* (Soon) Hosting create-react-app on Digital Ocean (1)
* (Soon) Hosting gatsby.js on Digital Ocean (1)
* (Soon) Hosting next.js on Digital Ocean (2)
* (Soon) Hosting a Sripe Payment Server on Digital Ocean (2)

whereas the (1)s could share a Digital Ocean Droplet and the (2)s could share another Digital Ocean Droplet. After all, this article should be sufficient to understand the fundamentals of how it works.

Note that the approach for (2) is opinionated. There are many ways to host your node applications. This article will use [Dokku](https://github.com/dokku/dokku) as platform as a service to manage effortless your node applications on one Droplet. They will be accessible side by side, but share the same domain. You can access them independently by using subdomains. Dokku might not be the newest and coolest kid on the block, but it comes with all the neccessary building blocks. There are other alternatives (e.g. Flynn) as well that are not covered in this article.

If I didn't loose your attention by now, let's start with the walkthrough. Before you start, check if you have [most of the essential developer tools](/developer-setup/) which are needed in the following article.

# Sign Up, Droplet Creation and Initial Setup

Sign up at [Digital Ocean](https://m.do.co/c/fb27c90322f3) and earn a $10 referral bonus. It would allow you to try a Droplet to host all of your applications on their platform for 2 months. If you like it, stay with them and I earn a little bonus as well. If you don't like it, you can always try a different hosting solution.

Next you are going to create a Droplet on their platform. It is basically a server that is hosted somewhere else for you. When creating the Droplet, you can make decisions for a couple of properties: image, size and datacenter region. All the other properties aren't that important in the beginning and you can keep their default settings. You don't need to add anything for the SSH properties as well, because you will do it from scratch later on.

* **Image:** The image can either be a Linux distribution or a pre-configured Linux distribution by using a one-click app. I recommend to use Ubuntu as Linux distribution to get you started from scratch for (1). By going this path, you will understand every step that you take along the way and learn about hosting your own application(s). If you want to setup your node applications for (2), choose the Dokku one-click app instead of a plain Linux Distribution.

* **Size:** The smallest Droplet size should be everything you need to get you started in hosting your own applications. Later on, you can always resize your Droplet. It makes sense if you need the performance and storage benefits comming with it. Personally I never ran into problems using 5$ or $10 Droplets even though more than 100 visitors are simultanously on your website.

* **Datacenter Region:** The datacenter region should be located not far away from the greater part of your audience. If your application users will be from the US, choose a datacenter region that is closest to the US. But don't worry too much about it now, because there are solutions to serve your audience in every region well by using services such as Cloudfare later on.

Here you will find everything in a detailed version: [How To Create Your First DigitalOcean Droplet](https://www.digitalocean.com/community/tutorials/how-to-create-your-first-digitalocean-droplet). After your Droplet has been created, you can access your Droplet dashboard on Digital Ocean where you can find your Droplet and its IP address. By having the IP address, you can access it on the command line by using [SSH](https://en.wikipedia.org/wiki/Secure_Shell).

What's SSH? SSH is a network protocol that allows you to access your server remotely. It can be used on the command line and you would access your remote server by using a username and password. In addition, you can secure it by setting up a SSH key which allows you to skip the part of providing your username and password every time when you log in to your remote server. No worries, you will do everything from scratch in this article.

Fortunately, macOS comes with a pre-installed SSH client on the command line. When you open your terminal, you can access your Droplet (remote server) by using your IP address. On the command line type `ssh root@your_server_ip`. If you log in for the first time by using SSH, you need to provide your password that was emailed to you when you created your Droplet. Continue to follow the more detailed instructions from this article to access your Droplet for the first time: [How To Create Your First DigitalOcean Droplet](https://www.digitalocean.com/community/tutorials/how-to-create-your-first-digitalocean-droplet)

You created your Droplet and logged in to it with SSH successfully for the first time! Now you need to do a couple of initial configuration for your remote server. Follow this guide, [Initial Server Setup with Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04), to setup a user with privileges, to secure your login with SSH by generating a SSH key (after that you can login to your remote server without providing username and password every time), to disable the default password authentication and to setup a basic firewall. When applying the SSH key part, refer to this article too as cross reference: [How To Set Up SSH Keys](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2). In the end, you should be able to login to your Droplet by using `ssh username@your_server_ip` without providing a password.

# Server Blocks for multiple websites on Digital Ocean (1)

Now you can start to host your applications on the configured Droplet. Follow the next article provided by Digital Ocean, [How To Set Up Nginx Server Blocks (Virtual Hosts) on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-16-04), to setup two simple websites that are served by the nginx web server in your one Droplet side by side. Take your time to finish this step. Afterward, the foundation is laid out to serve multiple static websites.

# Use your Domain on Digital Ocean

Before continuing serving your applications, you can buy and use your own domain. It will be mapped to your IP address of your Droplet. On Digital Ocean it's not possible to buy a domain, but there are several places where you can buy one and on of the two following tutorials will demonstrate you how to use different domain registrars. Follow the more in depth articles by Digital Ocean to map your own domain to your Droplet's IP address: [How to Point to DigitalOcean Nameservers From Common Domain Registrars](https://www.digitalocean.com/community/tutorials/how-to-point-to-digitalocean-nameservers-from-common-domain-registrars) and [How To Set Up a Host Name with DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-host-name-with-digitalocean).

# Git and GitHub to Synchronize your Applications (1)

You are ready to serve your own applications. Before you have created server blocks for two sample websites. Now you can reuse those for your applications or create new server blocks for them. The next question is: how do you get your application to your Digital Ocean server? The simplest way to transfer your application from your local machine to your remote server is using Git. If you are not familiar with Git and haven't installed it on your local machine yet, follow this [Git and GitHub essentials](/git-essential-commands/) article to setup Git on the command line and your own GitHub account. Next login to your remote server and check if Git is installed by typing: `git --version`. If there is no Git installed, follow this article to install it: [How To Install Git on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-16-04). Afterward, you are able to synchronize your local applications as repositories to your GitHub account and thus you are able to transfer your applications to your remote server.

# Host your static website(s) on Digital Ocean (1)

Before you continue to read, checkout if you are using on the earlier mentioned dedicated solutions, such as Gatsby.js or create-react-app, and use the article to complement it with the following paragraphs.

Various web application projects are using a build tool. That way, you are able to build your application on the command line and get all files to host it on a web server excluding the source code files. Often the command is simply `npm run build` and you will get a *public/* folder with all your build files. I will refer to the *public/* folder as build folder in the next parts of this post. Keep in mind, the name of the build folder can be something different in your case. The `npm run build` command will be used as well in the next part, even though it might differ for you too.

Next you have to make a decision: You can either decide to build your application on your local machine and only synchronize the build folder with Git to your remote server or synchronize the whole application to your remote server and build it there. The article will use the former option. If you have only a $5 Droplet, you should do it as well, because the Droplet isn't powerful enough to build your application on the remote server. If you have a more powerful Droplet than 5$, you could take the latter option and build your application on your remote server. But keep in mind that you may have to install [node and npm](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04) on your remote server. Check if those are installed there by using `node -v` and `npm -v` on the remote sever's command line.

So how to get the build folder to your remote server and serve it as website? First, make sure to run your build once on the command line with `npm run build` or the command that is used for your application type. Afterward, all the build files should be available in the build folder. On GitHub, create a new repository with your application name (e.g. my-foo-bar). Then follow the GitHub instructions to connect your application from your local machine with your new repository. Now you can push the whole application to your GitHub repository. Before you do so, make sure that the build folder shows up when you type `git status` on the command line. If it doesn't show up, remove it from your `.gitignore` file to be able to synchronize it. Afterward, push everything to your centralized GitHub account.

```javascript
git add .
git commit -m "some comment"
git push origin master
```

That's it for the local machine part. Now login to your remote server by using SSH. Per default, you should end up in your home folder of your remote server. There you can git clone your previously synced application from GitHub.

```javascript
git clone git@github.com:username/my-application-foo-bar.git
```

Previously, when you have set up your server blocks with your simple websites, you only had an *index.html* file in your */var/www/mydomain.com/html* folder. Your build folder of your application should have an *index.html* file as entry point as well. You can check it on the command line coming from your home folder.

```javascript
cd my-application-foo-bar/public
ls
```

Now, you only need to put the build folder somehow in the */var/www/mydomain.com/html* folder. Afterward, your website would already be served for your mapped domain or plain IP address. The naive way would be to copy the whole build folder into the */var/www/mydomain.com/html* folder. However, if you want to keep an updated application that you can easily synchronized with GitHub, you would always have to move the build folder to the *html/* folder once you have pulled a new update from GitHub in your application folder. Therefore, it is more efficient to symlink your build folder with your */var/www/mydomain.com/html* folder. A symbolic link is only a reference to this folder and thus both destinations stay updated once you pull an updated version from  GitHub. On the command line, on your remote server, it is only one command to symlink both folders:

```javascript
sudo ln -s /home/username/my-application-foo-bar/public /var/www/mydomain.com/html
```

Make sure to replace the placeholder username, mydomain.com, my-application-foo-bar and the public folder name (in case you have a different one). Now when you naviagte on the command line to your */var/www/mydomain.com/html*, you should be able to see the *public/* folder in it with the `ls` command. Before your application can be seen online, you need to adjust one part in your server block. Open your server block file with `sudo nano /etc/nginx/sites-available/mydomain.com` and add the public folder to the extended path.

```javascript{5}
server {
  listen 80;
  listen [::]:80;

  root /var/www/mydomain.com/html/public;
  index index.html index.htm index.nginx-debian.html;

  server_name mydomain.com www.mydomain.com;

  location / {
    try_files $uri $uri/ =404;
  }
}
```

Check again if your configuration is correct on the command line and restart your nginx web server.

```javascript
sudo nginx -t
sudo systemctl restart nginx
```

Now visit your domain and, if everything went flawless, you should see your application. Every time you need to deploy an updated version of your application from GitHub, make sure that you have built the application before. Afterward, pull it on your remote server in the application folder from GitHub: `git pull --rebase origin master`. Your application should be updated when visiting your domain afterward without restarting anything.

That's it for the whole setup of one or multiple static websites on Digital Ocean. There are a couple of furhter improvements when you continue to read the article. But you should know about the basic idea now. If you take one of the application specific dedicated articles from the beginning of this article, you may find as well valuable information.

## Secure your applications with SSL (HTTPS) (Optional) (1)

If your applications goes into production, you should secure it with SSL. Thus you could make HTTPS your default URL by redirecting from http:// to https:// in your server block. Read up the follow article, [How To Secure Nginx with Let's Encrypt on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04), to create a free SSL certificate by using Let's Encrypt. If you do it for your first application on your Droplet, you have to apply all the intructions of the article. If you want to add SSL for another application but not the first application, it is sufficient to optain and apply the SSL certificate only. After all, don't forget to a the cron job for an auto renewal for your certificates.

Afterward, your application should be accessible for HTTP and HTTPS. However, if you want to redirect all traffic from HTTP to HTTPS, you need to add the redirecting in your server block file. In case you need guidance for the redirecting server block, here is mine that I use for my websites. It redirects www.mydomain.com to mydomain.com as well.

```javascript
server {
  listen 80;
  listen [::]:80;

  expires $expires;

  server_name mydomain.com www.mydomain.com;
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  include snippets/ssl-mydomain.com.conf;
  include snippets/ssl-params.conf;

  server_name mydomain.com;
  return 301 https://www.$server_name$request_uri;
}

server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  include snippets/ssl-mydomain.com.conf;
  include snippets/ssl-params.conf;

  root /var/www/mydomain.com/html/public;

  index index.html index.htm index.nginx-debian.html;

  server_name www.mydomain.com;

  location ~ /.well-known {
    allow all;
  }

  location / {
    # First attempt to serve request as file, then
    # as directory, then fall back to displaying a 404.
    try_files $uri $uri/ =404;
 }

  error_page  404  /404.html;
}
```

Afterward, check if your configuration is alright and restart your nginx web server.

```javascript
sudo nginx -t
sudo systemctl restart nginx
```

# Host your node applications on Digital Ocean (2)

If you have choosen Dokku as your image for your Droplet creation to host your node applications, you can continue to read here after you have finished the initial setup and perhaps your domain setup. Basically you only have to follow one guide, [How to Use the DigitalOcean Dokku Application](https://www.digitalocean.com/community/tutorials/how-to-use-the-digitalocean-dokku-application), which covers 3 essential steps (plus the deployment of your application).

* Browsing to your IP address
* Add your public SSH key that you created in a previous step
* Configure your domain, if you have obtained one, otherwise keep using the IP address

Afterward, you are able to deploy your application directly form your local machine. You will need Git on the command line to synchronize your application from your local machine with your Droplet. If you haven't installed Git and GitHub yet, follow this article: [GitHub and Git essentials](/git-essential-commands/).

Now on the command line, you can add your remote Dokku instance to your Git project on your local machine.

```javascript
git remote add dokku dokku@mydomain.com:my-application-foo-bar
git push dokku master
```

Make sure to read the linked article which will step you through the whole process in more detail. After you have finished everything said in the article, you should be able to find your application with the used subdomain on your IP address and domain if you have used one. You can read more about Dokku in their [official documentation](http://dokku.viewdocs.io/dokku/getting-started/installation/).

You can use subdomains to distribute your applications horizontally on your Dokku instance. Personally I use these to create various personal APIs (e.g. a [Stripe payment server](/react-express-stripe-payment/) or an authentication server with Passport.js) or to create one application with multiple instances (e.g. test, staging, production) in one Dokku Droplet.

For instance, this way I could end up with the following applications distributed along multiple subdomains in one Dokku instance.

* **Stripe Payment Server as standalone API:** stripe-payment.mydomain.com
* **Passport.js Authentication Server as standalone API:** authentication-passport.mydomain.com
* **Email Server as standalone API:** email.mydomain.com
* **Application (Test):** 02-test.mydomain.com
* **Application (Staging):** 01-staging.mydomain.com
* **User Facing Application (Production):** 00-production.mydomain.com

I could even add other public facing applications next to it, where the domain isn't crucial. I did it to [automate the Slack invitation](https://slack-the-road-to-learn-react.wieruch.com/) for people learning React.js.

Because the subdomains are ordered in an alphabetical order on Dokku, the first subdomain showing up, in this case 00-production, is used as default when browsing to the mydomain.com domain. Essentially I did the same when [I have built my own course paltform](/how-to-build-your-own-course-platform/) to teach about React. It uses one Dokku instance to host all the infrastructure in various microservices.

## Secure Dokku applications with SSL (2)

Dokku has a great ecosystem of plugins. You can find the installation guidelines in [Dokku's official documentation](https://github.com/dokku/dokku/blob/master/docs/advanced-usage/plugin-management.md). For instance, you can easily add SSL for your applications on the command line by using [dokku-letsencrypt](https://github.com/dokku/dokku-letsencrypt). After you have installed the plugin, you can obtain a SSL certifacte for each application on the command line:

```javascript
dokku config:set --no-restart myapp DOKKU_LETSENCRYPT_EMAIL=your@email.tld
dokku letsencrypt myapp
```

Dokku will automatically take care of the redirection to HTTPS only. Afterward, you shouldn't forget to setup once a recurring certificate renewal by using a cron task: `dokku letsencrypt:cron-job --add`

## Other Plugins for Dokku (2)

There are plenty of plugins available for Dokku. For insatnce, one [plugin provides you a mongoDB](https://github.com/dokku/dokku-mongo). This way you can use your own in-house database. If you are going to outsource your database, you could use solutions such as [mLab](https://mlab.com/) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

# Swap File (Optional)

If any of your Droplets runs into out of memory problems, but you don't want to upgrade the Droplet size, you could try to add a swap file which is used as in memory space. It is not recommended to use it, but sometimes it helps to improve your Droplets performance just a bit. Follow the intructions from this article: [How To Add Swap Space on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-16-04).

<Divider />

Is there a step missing? Did you run into any pitfalls? Or could the article be improved at some place? Please leave your feedback in the comments. Otherwise I hope the walkthrough gave you a couple of entry points and guidance on how to host your own static websites, node applications or APIs. The article doesn't attempt to be comprehensive, but at least it should have summarized all the crucial points.
