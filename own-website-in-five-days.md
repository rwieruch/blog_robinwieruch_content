+++
title = "Technical Cheatsheet: 5 days to your own Website"
description = "Technical cheatsheet to create and host your own website in five days. You will learn how to use Hugo and DigitalOcean to publish your website online. Hugo is a static website generator to..."
date = "2016-11-09T13:50:46+02:00"
tags = ["website"]
keyword = "website in five days"
news_keywords = ["website in five days"]
contribute = "own-website-in-five-days.md"
type = "promo"
headline = "Technical Cheatsheet: 5 days to your own Website"
+++

{{% read_before "This tutorial is part 2 of a series." "Part 1:" "Day One - Technical Cheatsheet: Setup your development environment" "https://www.robinwieruch.de/developer-setup/" %}}

The following document is only a cheatsheet which summarises the steps you need to take to setup your own website. On purpose it's called technical, because you will not use a content management system (CMS) like Wordpress. It doesn't claim to be complete nor to guide you exhaustively through the whole process. After all it should only give you guidance on the way to publish your website. Additionally since you will put all the technical effort into it, you will have more control over your website than in a CMS. It addresses Mac users, but you could substitute some tools and instructions with something equivalent for Windows or Linux.

{{% chapter_header "Table of Contents" "toc" %}}

* [Day Two: Hugo](#hugo)
* [Day Three: DigitalOcean](#digitalOcean)
* [Day Four: Create your Website](#createWebsite)
* [Day Five: Publish It!](#publishIt)

{{% chapter_header "Day Two: Hugo" "hugo" %}}

We will use the open source website generator Hugo.

Personally I decided to move from Wordpress to Hugo some time ago. Wordpress can be very fragile at some point. I felt to have too little control. A plugin could crash my whole site. It was always a mess to roll back. I missed the local sandbox to experiment and the control over a theme. In general I like to write own HTML and CSS when I need to.

In Hugo you don't need to write HTML and CSS at all. You can simply use a theme like in Wordpress. But once you need to change something, it simple with some basic website knowledge. You can take a theme and adjust it to your needs.

Read more about {{% a_blank "Hugo" "https://gohugo.io/" %}} and its features before you continue.

Now you can install Hugo with Homebrew:

{{< highlight javascript >}}
brew update && brew install hugo
{{< /highlight >}}

You can create your first basic website by following the {{% a_blank "quickstart guide" "https://gohugo.io/overview/quickstart/" %}}. Give yourself a bit of time to understand Hugo. The quickstart guide covers how to scaffold your project and its content. Additionally you get to know how to apply a theme and how to experiment with your local website.

The quickstart guide already provides you with a solution to publish your website with {{% a_blank "GitHub Pages" "https://pages.github.com/" %}}. It's great for your first website. If that's enough, you can stop here. But I want to go a bit further. I will continue the cheatsheet by providing you the breadcrumbs to host your Hugo website on {{% a_blank "DigitalOcean" "https://m.do.co/c/fb27c90322f3" %}}.

{{% chapter_header "Day Three: DigitalOcean" "digitalOcean" %}}

Good things about hosting on DigitalOcean:

* maximum flexibility
* scalable infrastructure
* great user interface and experience
* multiple websites on one instance

You can Sign Up on {{% a_blank "DigitalOcean" "https://m.do.co/c/fb27c90322f3" %}}. After that you can create your first Droplet to host your website(s). Choose Ubuntu from the selection of Distributions.

You can get more guidance in the following step by step tutorial:

* {{% a_blank "How To Create Your First DigitalOcean Droplet Virtual Server" "https://www.digitalocean.com/community/tutorials/how-to-create-your-first-digitalocean-droplet-virtual-server" %}}

### Ubuntu + Hugo

Now you will have to follow two DigitalOcean tutorials in a row. First to setup your infrastructure and second to install Hugo on your Ubuntu machine. Since I provide only the cheatsheet, I will save you the time to summarize the steps myself.

* {{% a_blank "Initial Server Setup with Ubuntu" "https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-14-04" %}}
* {{% a_blank "How To Install and Use Hugo, a Static Site Generator" "https://www.digitalocean.com/community/tutorials/how-to-install-and-use-hugo-a-static-site-generator-on-ubuntu-14-04" %}}

The second tutorial will partly show you again how to build an own website with Hugo. You could skip the part, but also could do it once again to get used to it. Additionally it will give you some more learnings in using your Ubuntu machine.

### Nginx

Locally you use `hugo server` to serve your website. On the Ubuntu machine you will use Nginx. The next tutorial shows you how to install Nginx and how to serve multiple websites. Later it’s fine if you have only one website or multiple websites.

* {{% a_blank "How To Set Up Nginx Server Blocks" "https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-14-04-lts" %}}

### Domain

DigitalOcean doesn't give the option to buy domains. But they give advice how to apply your bought domain on your Droplet from a wide range of domain registrars.

* {{% a_blank "How to Point to DigitalOcean Nameservers From Common Domain Registrars" "https://www.digitalocean.com/community/tutorials/how-to-point-to-digitalocean-nameservers-from-common-domain-registrars" %}}

Basically you only have to set the nameservers and wait some time until the changes apply. When you have followed the Nginx chapter, you should test your domain with one of your two server blocks. It should work before you continue.

Once it works, delete the `index.html` file you created in `/var/www/yourdomain.com/html` but keep the html directory. Keep in mind that you will use the directory to put your website in later on.

{{% chapter_header "Day Four: Create your Website" "createWebsite" %}}

Now let's get back to your local machine. You already experiment with Hugo, but now its time to build your website. That's on you. At some earlier stage you already used themes from GitHub for your website. There are {{% a_blank "a lot of great themes" "http://themes.gohugo.io/" %}} out there were you only have to fill in the content.

In your `config.toml` of your Hugo website make sure to use your domain address:

{{< highlight javascript >}}
baseurl = "http://www.mywebsiteurl.com/"
{{< /highlight >}}

Otherwise Nginx will have problems to resolve the path to your website.

{{% chapter_header "Day Five: Publish It!" "publishIt" %}}

Once you are content with your website on your local machine you can publish it. Before you have to make sure that `hugo server` doesn't throw any errors in your command line when you start it locally.

You can upload your Hugo website to GitHub by creating a new repository.

* {{% a_blank "GitHub: Create A Repo" "https://help.github.com/articles/create-a-repo/" %}}

When your website is on GitHub, you can clone it to your Ubuntu machine:

First you have to login to your Ubuntu machine again. In an earlier step you already created an User on your Ubuntu server which is not the root user. When you connect to your machine you will end up in your home directory:

{{< highlight javascript >}}
/home/myusername/
{{< /highlight >}}

Now you can clone your Hugo website Repository:

{{< highlight javascript >}}
git clone https://github.com/mygithubname/myhugowebsiterepository.git
{{< /highlight >}}

You should see the directory of your website by typing:

{{< highlight javascript >}}
ls
{{< /highlight >}}

Navigate into your repository `cd myhugowebsiterepository` and type `hugo` to build your website. There shouldn’t be any errors when you build the website. Once again with `ls` you should see a folder named public in your website directory. The public folder is all you need to serve your website with Nginx.

The last step is to link the public folder to your Nginx server. Remember when you have set up the server blocks and deleted the index.html file from the `/var/www/yourdomain.com/html`? Now you can symlink the content of the public folder to the empty html folder:

{{< highlight javascript >}}
sudo ln -s /home/yourusername/yourrepositoryname/public/* /var/www/yourdomain.com/html
{{< /highlight >}}

That's it. You should be able to visit `yourdomain.com` now.
