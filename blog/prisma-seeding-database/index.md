---
title: "Seeding a Database with Prisma (TypeScript)"
description: "Learn how to seed a database with Prisma in a TypeScript application ..."
date: "2024-03-21T08:50:46+02:00"
categories: ["Next"]
keywords: ["prisma"]
hashtags: ["#Prisma"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A short tutorial about seeding a database with Prisma in a TypeScript application. I decided to write this tutorial, because many of my other tutorials depend on a database with an initial seeding and I want to reference it.

# Prisma: Seeding with TypeScript

We will assume the following model for our database in the *prisma/schema.prisma** file:

```sh
model Post {
  id      String   @id @default(cuid())
  name    String
}
```

We will create a new TypeScript file called **seed.ts** in the **prisma** folder. This file will contain the code to seed the database. We will use the Prisma Client to interact with the database:

```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialPosts = [
  { name: 'Post 1' },
  { name: 'Post 2' },
  { name: 'Post 3' },
];

const seed = async () => {
  // clean up before the seeding (optional)
  await prisma.post.deleteMany();

  // you could also use createMany
  // but it is not supported for databases
  // e.g. SQLite https://github.com/prisma/prisma/issues/10710
  for (const post of initialPosts) {
    await prisma.post.create({
      data: post,
    });
  }
};

seed();
```

Next we need to execute the seeding from the command line. Because we are dealing with a TypeScript file here, we need to add an extra dependency to our project:

```sh
npm install tsx --save-dev
```

Afterward, include it in your *package.json*:

```json
{
  ...
  "scripts": {
    ...
    "prisma-seed": "tsx prisma/seed.ts"
  }
  ...
}
```

Finally, you can run the seeding with the following command:

```sh
npm run prisma-seed
```

You should see the seeded data in your database:

```sh
npx prisma studio
```

That's it! You have successfully seeded your database with Prisma in a TypeScript application.
