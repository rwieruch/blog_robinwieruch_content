---
title: "How to Docker with create-react-app"
description: "A short walkthrough on how to use Docker with create-react-app in a development environment. We will cover how to dockerize your first React app ..."
date: "2020-02-18T03:53:46+02:00"
categories: ["Docker", "React"]
keywords: ["docker react", "docker create-react-app"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection label="This tutorial is part 2 of 2 in the series." links={[{ prefix: "Part 1:", label: "How to install Docker on MacOS", url: "/docker-macos/" }]} />

Just recently I had to use Docker for my create-react-app web application development. Here I want to give you a brief walkthrough on how to achieve it. First of all, we need a React application. Either create a React app with create-react-app yourself, or follow this [React MacOS setup guide](/react-js-macos-setup/) or this [React Windows setup guide](/react-js-windows-setup/).

*Note: If you are using a custom React setup (e.g. React with Webpack) and not create-react-app, check out this [Docker with React](/docker-react-development/) tutorial instead.*

After you have set up your create-react-app project, visit it on `http://localhost:3000` to see the rendered React app. Everything should work as expected. Now, we will ship this React application in a **Docker container** by using **Docker image**. First of all, create a so called **Dockerfile**:

```text
touch Dockerfile
```

And enter the following content to the Dockerfile:

```text
# Docker Image which is used as foundation to create
# a custom Docker Image with this Dockerfile
FROM node:10

# A directory within the virtualized Docker environment
# Becomes more relevant when using Docker Compose later
WORKDIR /usr/src/app

# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./

# Installs all node packages
RUN npm install

# Copies everything over to Docker environment
COPY . .

# Uses port which is used by the actual application
EXPOSE 3000

# Finally runs the application
CMD [ "npm", "start" ]
```

Everything in this Dockerfile is read by the Docker interpreter line by line. In the end, it's the blueprint to create a your custom Docker Image suited for your application. The foundational image (here `FROM`) we are using here makes sure that all Node/npm commands are available in the Dockerfile. Otherwise, if using a non related Node image, we would need to install Node in the Dockerfile ourselves before we could use the [Node specific commands](/npm-crash-course/).

Optionally create a *.dockerignore* file to exclude folders and files from the Docker process. For example, the *node_modules* don't need to be included for the Docker image, because they will be installed in the process with `npm install` (see Dockerfile). Therefore, the content of the *.dockerignore* file could be:

```text
node_modules
```

Next, create an account on the [official Docker Hub](https://hub.docker.com/). Afterward, you should have a Docker Hub username which can be used to build your first **Docker image**:

```text
docker build -t <username>/my-react-app .
```

If the output after this command says *"Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?"*, you need to make sure that [everything Docker related is set up and running](/docker-macos/) properly. Even if it's running properly when printing all Docker engines with `docker-machine ls`, you may need to set the environment variables for the Docker engine again.

If the build for the Docker image runs successfully, you should be able to list your images with the following command:

```text
docker images

REPOSITORY                       TAG                 IMAGE ID            CREATED             SIZE
<username>/my-react-app          latest              036d38e931e4        5 minutes ago       153MB
node                             alpine              532fd65ecacd        9 days ago          113MB
hello-world                      latest              fce289e99eb9        13 months ago       1.84kB
```

This Docker image is everything you need to run a Docker application in a Docker container. One Docker image can be used to start multiple Docker containers which helps to scale application size horizontally or to run applications with different container configuration. For now, we will only run one Docker container based on this Docker image:

```text
docker run --name my-react-app -p 4680:3000 -d <username>/my-react-app
```

This command creates and runs a Docker container with a specific name, a mapping of two ports, and a Docker image. Even though the Dockerfile defines a specific port, we can redirect this to a custom port for this particular Docker container. After creating and running the Docker container based on the Docker image, we should be able to list all Docker containers:

```text
docker ps

CONTAINER ID        IMAGE                       COMMAND                  CREATED             STATUS              PORTS                         NAMES
ab03066fb631        <username>/my-react-app     "docker-entrypoint.s…"   9 minutes ago       Up 9 minutes        0.0.0.0:4680->3000/tcp/tcp   my-react-app
```

Before we can visit our application in the browser, we need to find out the IP address of our running Docker engine:

```text
docker-machine ip default

-> 192.168.99.100
```

Finally you should be able to visit `http://192.168.99.100:4680`. Beware that your IP address and port may vary. Congratulations, you have shipped your first create-react-app web app in a Docker container.

<ReadMore label="Docker Cheatsheet" link="/docker-cheatsheet/" />

<ReadMore label="Docker Compose" link="/docker-compose/" />