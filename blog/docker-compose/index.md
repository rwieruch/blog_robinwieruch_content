---
title: "How to Docker Compose"
description: "Everything I have learned about Docker Compose for creating Docker images and multiple Docker containers as services with various purposes for one application ..."
date: "2020-02-18T03:56:46+02:00"
categories: ["Docker"]
keywords: ["docker compose"]
hashtags: ["#Docker"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Docker Compose helps you to run multi-container applications. In this tutorial, we will expand a Docker project which has only a Dockerfile with Docker Compose. Before you continue, make sure that you have [set up Docker properly](/docker-macos/). If you haven't installed the docker-compose dependency, you can do it with Homebrew on MacOS with the following instruction on the command line:

```text
brew install docker-compose
```

We will use the following Dockerfile [from a Node.js with Docker project](/docker-node-js-development/) as base. But feel free to use a Dockerfile from another project (e.g. [React with create-react-app](/docker-create-react-app-development/) or [custom React with Webpack](/docker-react-development/)). Our Dockerfile should look like the following:

```text
FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
```

Notice how we have no `EXPOSE` or `CMD` statements in this Dockerfile anymore. The Dockerfile is only there for creating the application as Docker image. There are no ports exposed nor any commands to run it. That's where Docker Compose comes into play. First, create a *docker-compose.yml* file in your project's root directory from the command line:

```text
touch docker-compose.yml
```

Then give it the following content:

```text
version: '3'

services:
  dev:
    build:
      context: .
    ports:
      - 4680:3000
    command: npm start
```

In a Docker Compose file you can define so-called **services**. Our first service will only start the application and expose it to a new port by re-mapping the origin port. Run the next commands on the command line to build the Docker service with the base image from the Dockerfile and to run the service eventually.

```text
docker-compose build dev
docker-compose up dev
```

Before we can visit our application in the browser, we need to find out the IP address of our running Docker engine:

```text
docker-machine ip default

-> 192.168.99.100
```

Finally you should be able to visit `http://192.168.99.100:4680`. Beware that your IP address and port may vary. Congratulations, you have shipped your first application in a Docker container with Docker Compose.

However, there is not much different from the previous Docker setup. Instead of relying only on a Dockerfile, we are using Docker Compose to build and run our container. But it's still only one container (here as a service) running. Let's change this by adding another Docker Compose service in our *docker-compose.yml* file:

```text{11-16}
version: '3'

services:
  dev:
    build:
      context: .
    ports:
      - 4680:3000
    command: npm start

  test:
    build:
      context: .
    environment:
      - CI=true
    command: npm test
```

Note: If you haven't setup any test script in your Node.js project yet, or any tests at all, you may want to follow one of these Node.js testing tutorials: [Mocha, Chai, and Sinon](/node-js-testing-mocha-chai/) or [Jest](/node-js-jest/). Otherwise you may want to use any other script that you have at your hands for the second service in the Docker Compose file.

We used the CI=true flag to run all our tests only once, because some test runners (e.g. Jest) would run the tests in watch mode and thus would never exit the process. Finally, you can start this service as a Docker container. It's only there for testing purposes; which is why it's clearly separated from the `dev` service which starts your application for development purposes. We are using the `--rm` flag to remove the container automatically after this service terminates.

```text
docker-compose build test
docker-compose run --rm test
```

All your tests should run through. In addition, sometimes you want to be able that your Docker container is writing back to your **Docker host**. Meaning: Everything that happens in the Docker container and generates new files should be replicated in your project's source code. That's where volumes come into play:

```text{17-18}
version: '3'

services:
  dev:
    build:
      context: .
    ports:
      - 4680:3000
    command: npm start

  test:
    build:
      context: .
    environment:
      - CI=true
    command: npm test
    volumes:
      - './:/usr/src/app'
```

Now, everything that happens in the Docker container (`./usr/src/app`) is written to the Docker host (`./`) and vice versa. The relative path for the Docker container should match the `WORKDIR` from the Dockerfile. Personally I had to use this technique for simulating [visual regression testing in React](/visual-regression-testing-react-storybook/) in a Docker container while being able to write the result back into my source code.

<Divider />

Congratulations, you are able to run two Docker services based on one Dockerfile with Docker Compose. Whereas one service simulates the development environment from within a Docker environment, the other service runs all your tests in a Docker environment. Now you are able to scale your services horizontally. In the end, your CI could take over and execute test services, linting services and other services in parallel.

