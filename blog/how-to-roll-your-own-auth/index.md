---
title: "Authentication in JavaScript & TypeScript"
description: "Learn how to roll your own authentication in JavaScript & TypeScript ..."
date: "2024-10-29T12:50:46+02:00"
categories: ["JavaScript", "TypeScript"]
keywords: ["javascript authentication"]
hashtags: ["#JavaScript"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Authentication is an important topic of any application. It's the gatekeeper that ensures only the right people can access the right resources. But **how do you roll your own authentication in JavaScript & TypeScript**? In this tutorial, we'll explore how to build a session-based authentication system where a database is used to store users and their sessions. We'll also cover how to manage cookies and passwords securely.

# Why to roll your own auth?

Creating your own authentication system helps you really understand the nuts and bolts of security. When you grasp the basics, it's easier to keep your JavaScript application secure and spot potential risks before they become serious problems.

When you handle authentication yourself, you're in control of everything. You don't have to rely on external services that could change their terms or go down. This way, you have more flexibility and can ensure your app stays secure on your terms.

Setting up your own authentication system might take some extra effort upfront, but it pays off in the long run. If you build it properly from the beginning, you can take it with you from project to project, and you'll have a better understanding of how it works.

# Session-Based Authentication

In this tutorial, we will implement a session-based authentication system. This means that when a user signs up or signs in, we create a session for them. This session is stored in a database and a cookie with a session token is set in the user's browser. Whenever the user sends a request to the server, we validate the session and if everything is fine, we return the session and the user.

First of all, you need to set up a JavaScript or TypeScript project where you are in control of the backend, e.g. with Express.js or Next.js. Since we are storing users and their sessions in a database, whatever database you are using you need to define the user and session schema. For example, in Prisma it would look like this:

```sh
model User {
  id           String    @id @default(cuid())
  sessions     Session[]
  firstName    String
  lastName     String
  email        String    @unique
  passwordHash String
}

model Session {
  id        String   @id
  expiresAt DateTime
  userId    String
  user      User     @relation(references: [id], fields: [userId], onDelete: Cascade)
}
```

Each user can have multiple sessions, but only one session is active at a time. The session has an expiration date and a reference to the user it belongs to.

Furthermore, we are not storing the password in plain text, but a hashed version of it. This way, even if the database is compromised, the passwords are not leaked.

# Session Management for Authentication

We will implement all the necessary functions for session management in separate files to keep them framework agnostic. This way, you can use them in any JavaScript or TypeScript project where you are in control of the backend.

First, install the necessary dependencies. Here we will be using [Oslo.js](https://www.npmjs.com/package/oslo), maintained by Lucia's author, which provides foundational cryptographic and encoding functions:

```sh
npm install @oslojs/crypto @oslojs/encoding
```

Next create an *auth/* folder where you will implement the framework agnostic auth logic. Inside this folder, create first a *session.ts* file. First, we are importing the dependencies:

```ts
// src/auth/session.ts
import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";

import { prisma } from "@/lib/prisma";
// or your ORM of choice
// for demonstration purposes we are using Prisma
```

Second, we need a function which creates a random session token which will be used for the cookie and as a one way hashed version for the actual session's `id` in the DB:

```ts
// src/auth/session.ts
export const generateRandomSessionToken = () => {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  return encodeBase32LowerCaseNoPadding(bytes);
};
```

Third, we need a function which creates a session for a user when a user signs up/in. The function takes a sessionToken generated from `generateRandomSessionToken` and the userId of the user which allows us to create a session for the user:

```ts
// src/auth/session.ts
const SESSION_REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 24 * 15; // 15 days
const SESSION_MAX_DURATION_MS = SESSION_REFRESH_INTERVAL_MS * 2;  // 30 days

const fromSessionTokenToSessionId = (sessionToken: string) => {
  return encodeHexLowerCase(sha256(new TextEncoder().encode(sessionToken)));
};

export const createSession = async (sessionToken: string, userId: string) => {
  const sessionId = fromSessionTokenToSessionId(sessionToken);

  const session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + SESSION_MAX_DURATION_MS),
  };

  // or your ORM of choice
  await prisma.session.create({
    data: session,
  });

  return session;
};
```

Further, we already extracted a reusable function for later use, which hashes the sessionToken to create the session's `id`, so that the token and the id are not the same. This way, even if the sessionToken is leaked, the session id is not.

Fourth, we need a function which validates a user's session whenever the user sends a request to the server. The gist: we check if the session exists, if it's expired, if it needs to be refreshed, and if everything is fine, we return the session and the user:

```ts
// src/auth/session.ts
export const validateSession = async (sessionToken: string) => {
  const sessionId = fromSessionTokenToSessionId(sessionToken);

  // or your ORM of choice
  const result = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  });

  // if there is no session, return null
  if (!result) {
    return { session: null, user: null };
  }

  const { user, ...session } = result;

  // if the session is expired, delete it
  if (Date.now() >= session.expiresAt.getTime()) {
    // or your ORM of choice
    await prisma.session.delete({
      where: {
        id: sessionId,
      },
    });

    return { session: null, user: null };
  }

  // if 15 days are left until the session expires, refresh the session
  if (Date.now() >= session.expiresAt.getTime() - SESSION_REFRESH_INTERVAL_MS) {
    session.expiresAt = new Date(Date.now() + SESSION_MAX_DURATION_MS);

    // or your ORM of choice
    await prisma.session.update({
      where: {
        id: sessionId,
      },
      data: {
        expiresAt: session.expiresAt,
      },
    });
  }

  return { session, user };
};
```

Fifth, we need a function which deletes a user's session when the user signs out:

```ts
// src/auth/session.ts
export const invalidateSession = async (sessionId: string) => {
  // or your ORM of choice
  await prisma.session.delete({
    where: {
      id: sessionId,
    },
  });
};
```

Essentially, this is the foundation of our session-based authentication system where we interact with the database. We are storing the user's sessions in a database and whenever the user sends a request to the server, we validate the session and return the session and the user if everything is fine. If the session is expired, we delete it.

# Cookie Management for Authentication

What's missing is the cookie management. We need to set a cookie with the session token when the user signs up/in and delete the cookie when the user signs out. Only this way the information about the session is stored in the user's browser and can be send with every request to the server.

```ts
// src/auth/cookie.ts
import { cookies } from "next/headers";
// or your framework's cookie API

export const SESSION_COOKIE_NAME = "session";

export const setSessionCookie = async (sessionToken: string, expiresAt: Date) => {
  const cookie = {
    name: SESSION_COOKIE_NAME,
    value: sessionToken,
    attributes: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: expiresAt,
    },
  };

  (await cookies()).set(cookie.name, cookie.value, cookie.attributes);
  // or your framework's cookie API
};

export const deleteSessionCookie = async () => {
  const cookie = {
    name: SESSION_COOKIE_NAME,
    value: "",
    attributes: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
    },
  };

  (await cookies()).set(cookie.name, cookie.value, cookie.attributes);
  // or your framework's cookie API
};
```

With every request the user sends to the server, which attempts to access a protected resource, we need to validate the session cookie. If the cookie exists, we extract the session token from it and validate the session from the database. If the session is valid, we return the session and the user. Otherwise we delete the session in the database and return null for the session and the user:

```ts
// src/auth/cookie.ts
export const getAuth = () => {
  const sessionToken =
    (await cookies()).get(SESSION_COOKIE_NAME)?.value ?? null;
  // or your framework's cookie API

  if (!sessionToken) {
    return { session: null, user: null };
  }

  return validateSession(sessionToken);
};
```

If this function is called many times from your framework, you could memoize the result if your framework/library of choice offers this feature. For example, with [full-stack React](/react-full-stack-framework/) you can cache it the following way on the backend:

```ts{2,4,6}
// src/auth/cookie.ts
import { cache } from "react";

export const getAuth = cache(async () => {
  ...
});
```

Here you could already add another helper function on top, e.g. `getAuthOrRedirect`, which calls `getAuth`, and either redirects the user to the sign in page or returns the session and the user. This way you can protect resources (e.g. data layer).

# Password Management for Authentication

Here we are implementing password-based authentication. First, we will install the necessary dependency. Here we will be using [Argon2](https://www.npmjs.com/package/@node-rs/argon2), which is a secure password hashing algorithm:

```sh
npm install @node-rs/argon2
```

Second, we create two utility functions which hash a password and verify a password against a hash:

```ts
// src/auth/password.ts
import { hash, verify } from "@node-rs/argon2";

export const hashPassword = async (password: string) => {
  return await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1
  });
};

export const verifyPasswordHash = async (hash: string, password: string) => {
  return await verify(hash, password);
};
```

Now we are able to hash a password when a user signs up and verify the password when a user signs in. This way we are not storing the password in plain text in the database.

# Using Authentication in your Framework

Keeping this section framework agnostic is not easy, but I will try to give you a rough idea how you can implement the authentication in your framework of choice. Here are some examples for sign up, sign in, and sign out.

First, the sign up function which runs on the server when a user signs up. It receives the form data from the client, hashes the password, creates a user and a session in the database, sets the session cookie in the user's browser, and redirects the user to the home page:

```ts
export const signUp = async (formData: FormData) => {
  const formDataRaw = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  // TODO: validate and retrieve typed formData before proceeding

  const passwordHash = await hashPassword(password);

  // TODO: ORM/Database
  // create a user with the following fields:
  // firstName, lastName, email, passwordHash
  // return the user for the user's id

  const sessionToken = generateRandomSessionToken();
  const session = await createSession(sessionToken, user.id);

  await setSessionCookie(sessionToken, session.expiresAt);

  // TODO: use your framework
  // to redirect the user to the home page
};
```

What's missing in the code is the server-side form validation and the general error handling if something (e.g. database operation) goes wrong. Also the ORM layer is kept abstract, so you need to replace it with your ORM of choice.

<ReadMore label="Authentication in Next.js" link="/next-authentication/" />

Second, the sign in function which runs on the server when a user signs in. It receives the form data from the client, retrieves the user by email, verifies the password, creates a session for the user, sets the session cookie in the user's browser, and redirects the user to the home page:

```ts
export const signIn = async (formData: FormData) => {
  const formDataRaw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // TODO: validate and retrieve typed formData before proceeding

  // TODO: ORM/Database
  // get user by email

  // TODO: if user does not exist, return error
  // if (!user) {
  //   throw new Error('Incorrect email or password');
  // }

  const validPassword = await verifyPasswordHash(user.passwordHash, password);

  // TODO: if password is invalid, return error
  // if (!validPassword) {
  //   throw new Error('Incorrect email or password');
  // }

  const sessionToken = generateRandomSessionToken();
  const session = await createSession(sessionToken, user.id);

  await setSessionCookie(sessionToken, session.expiresAt);

  // TODO: use your framework
  // to redirect the user to the home page
};
```

And last, the sign out function. It retrieves the session from the cookie, invalidates the session in the database, deletes the session cookie in the user's browser, and redirects the user to the sign in page:

```ts
export const signOut = async () => {
  const { session } = await getAuth();

  if (!session) {
    // TODO: use your framework
    // to redirect the user to the sign in page
  }

  await invalidateSession(session.id);
  await deleteSessionCookie();

  // TODO: use your framework
  // to redirect the user to the sign in page
};
```

This is a rough idea how you can implement the authentication in your application. The code snippets are kept abstract, so you need to replace the ORM layer and the framework specific code with your ORM of choice and your framework of choice.

# Protecting Resources with Authorization

Last, whenever you want to access a protected route or resource, you can use the `getAuth` function to get the session and the user:

```ts
const { session } = await getAuth();

if (!session) {
  // TODO: use your framework
  // to redirect the user to the sign in page
}
```

If there is no session, you can redirect the user to the sign in page. If there is a session, you can use the user entity to access the protected resource. This way you can protect resources in your application.

<Divider />

Rolling your own auth does not have to be complicated. Once you get the basics down (and found all of the crucial bugs and edge cases), you can reuse your authentication system across all of your projects or even extend it with OAuth, JWT, or other authentication methods.