---
title: "Next.js with Prisma and SQLite"
description: "Learn how to use Prisma with SQLite in a Next.js application ..."
date: "2024-03-21T08:50:46+02:00"
categories: ["Next"]
keywords: ["next prisma sqlite"]
hashtags: ["#NextJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A short tutorial about setting up a Next.js application with Prisma and SQLite. I decided to write this tutorial, because many of my other Next.js tutorials depend on a database and I want to reference it. Why this ORM and database? Prisma is a great tool to interact with databases and SQLite is a simple database to get started with.

*Currently I am working on a new course called **["The Road to Next"](https://www.road-to-next.com/)** which will hopefully match the popularity of **The Road to React**. We will create a full-stack Next application which goes all the way from fundamental React knowledge to accessing a serverless database. I am more than excited to share all my knowledge about Next.js with you. **If you are interested**, check out the website and join the waitlist.*

# Next.js: Setup

If you don't have a Next.js application yet, you can create one on the command line:

```bash
npx create-next-app@latest
```

Personally I like to use all the defaults when creating a new Next.js application. After your project is created, you can navigate into the project folder:

```bash
cd my-next-app
```

Next change the default page to something more minimalistic:

```tsx
// src/app/page.tsx

const Home = () => {
  return <h2>Home</h2>;
};

export default Home;
```

Finally you can start the Next.js application:

```bash
npm run dev
```

From here we will setup Prisma and SQLite before reading from the database.

# SQLite

SQLite is a database that is often used for its simplicity. Go ahead and install it:

```bash
npm install sqlite3
```

When using SQLite, you don't have to set up an extra database, because SQLite is just a file in your project. This makes SQLite a great choice for starting out with a database.

# Prisma

Prisma is the most popular JavaScript/TypeScript ORM to interact with databases. Go ahead and install it for your project:

```bash
npm install prisma --save-dev
```

We can initialize Prisma with SQLite as the data source provider:

```bash
npx prisma init --datasource-provider sqlite
```

The *prisma/schema.prisma* file in the project should look similar to this one:

```bash
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

There should also be a *.env* file which holds the path to the SQLite database file:

```bash
DATABASE_URL="file:./dev.db"
```

Do not forget to create this database file, because Prisma will not do it for you:

```bash
cd prisma
touch dev.db
```

Essentially this file is the SQLite database.

# Prisma Migrations

Prisma Migrations are needed to introduce new data in the database. For example, when you want to add a new table to the database, you can create it in the Prisma schema file. We will have a `Post` table in this example, but you can choose a different name or properties if you like:

```bash
model Post {
  id      String   @id @default(cuid())
  name    String
}
```

When you want to migrate the database, you can run the following command:

```bash
npx prisma db push
```

Last, you can always check the database with Prisma Studio:

```bash
npx prisma studio
```

There you should see the empty Post table. Optionally you can [seed this database](/prisma-seeding-database/) with some initial data to see it later in your Next.js application.

# Prisma Client

We will need a Prisma Client instance in the application eventually to read and write from/to the database. Therefore, initialize a Prisma Client instance in the project:

```ts
// src/lib/prisma.ts

import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
```

When working with a framework like Next.js, it is important to use a singleton pattern for the Prisma Client instance. Otherwise, you may run into issues with hot reloading and multiple instances of the Prisma Client in development mode. Use the following code snippet to create a singleton for the Prisma Client instance:

```ts
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
```

There are more considerations to take into account when using Prisma in a serverless environment. You can find them in the official Prisma documentation.

# Next.js: Reading from the Database

With Next's App Router, every component is by default a React Server Component. This means that you can use the Prisma Client instance in these components to read from the database. Here is how you would read from the database on the root page:

```tsx
// src/app/page.tsx

import { prisma } from '@/lib/prisma';

const Home = async () => {
  const posts = await prisma.post.findMany();

  return (
    <>
      <h2>Home</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Home;
```

That's it. If you have done the database seeding in between, you should see the seeded data in your Next.js application.

<Divider />

You can find the repository for this tutorial over [here](https://github.com/rwieruch/next-prisma-sqlite). If you want to go beyond this, check out **["The Road to Next"](https://www.road-to-next.com/)** and get on the waitlist!