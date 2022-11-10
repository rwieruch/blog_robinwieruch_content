---
title: "How to use Postgres with Docker"
description: "How to set up Postgres inside of Docker with docker-compose by example ..."
date: "2020-02-18T03:45:46+02:00"
categories: ["Docker"]
keywords: ["docker postgres", "docker compose postgres"]
hashtags: ["#Docker"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

- run docker desktop

In your project or in a new project, create a *docker-compose.yml* file with the following content:

```yml
version: '3.8'

services:
  postgres:
    image: postgres:14.2-alpine
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-postgres}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-postgres}
      POSTGRES_DB: mydatabase
      PGDATA: /data/mydatabase
    volumes:
      - pgstore:/var/lib/postgresql/data
    ports:
      - '5432:5432'
    networks:
      - postgres
    restart: unless-stopped

  pgadmin:
    image: dpage/pgadmin4:6.5
    environment:
      PGADMIN_DEFAULT_EMAIL: ${PGADMIN_DEFAULT_EMAIL:-admin@admin.com}
      PGADMIN_DEFAULT_PASSWORD: ${PGADMIN_DEFAULT_PASSWORD:-admin}
    volumes:
      - pgadmin:/root/.pgadmin
    ports:
      - '5050:80'
    networks:
      - postgres
    depends_on:
      - postgres
    restart: unless-stopped

networks:
  postgres:
    driver: bridge

volumes:
  pgstore:
  pgadmin:
```

- start todo

```text
docker-compose up
```

- psql:

```text
docker exec -it node-express-server-rest-api-postgres-1 psql -U <username> <database>
```

- pgadmin4

http://localhost:5050/
use your email password combination

