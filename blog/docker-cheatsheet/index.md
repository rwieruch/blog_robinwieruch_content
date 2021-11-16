---
title: "Docker Cheatsheet"
description: "All the Docker commands I am using for developing applications with Docker: list all Docker images, list all Docker containers, stop Docker container or remove all Docker containers ..."
date: "2020-02-18T03:55:46+02:00"
categories: ["Docker"]
keywords: ["docker cheatsheet", "docker commands"]
hashtags: ["#Docker"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A collection of all the Docker commands I am using on a regular basis for developing applications with Docker.

# Docker Machine

List all Docker engines:

```text
docker-machine ls
```

Create a Docker engine:

```text
docker-machine create --driver virtualbox default
```

Set environment variables for Docker engine:

```text
docker-machine env default
eval $(docker-machine env default)
```

Start a Docker engine:

```text
docker-machine start default
```

Stop a Docker engine:

```text
docker-machine stop default
```

Retrieve IP address for running Docker engine:

```text
docker-machine ip default
```

# Docker Images

List Docker images:

```text
docker images
```

Remove Docker image:

```text
docker rmi <image_id>
docker image rm <image_id>
```

Create Docker image (requirement: Dockerfile):

```text
docker build -t <dockerhub_username>/<custom_docker_image_name> .
```

# Docker Containers

List Docker containers:

```text
docker ps
docker container ls -a
```

Stop and remove Docker container:

```text
docker stop <container_id>
docker rm <container_id>
```

Remove all stopped Docker containers:

```text
docker container prune
```

Create Docker container (requirement: Docker image):

```text
docker run --name <custom_container_name> -p <new_port>:<defined_port> -d <dockerhub_username>/<custom_docker_image_name>
```

# Docker Compose

If development, build, run and keep running (e.g. `service_id` equals `dev`):

```text
docker-compose build <service_id>
docker-compose up <service_id>
```

If testing, build and run once (e.g. `service_id` equals `test`):

```text
docker-compose build <service_id>
docker-compose run --rm <service_id>
```

<ReadMore label="How to Docker with Node.js" link="/docker-node-js-development/" />

<ReadMore label="How to Docker with React" link="/docker-react-development/" />

<ReadMore label="How to Docker with create-react-app-development" link="/docker-create-react-app-development/" />