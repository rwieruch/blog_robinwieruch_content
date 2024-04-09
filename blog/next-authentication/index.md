---
title: "Authentication in Next.js"
description: "Learn how to add authentication to your Next.js application with Lucia Auth for sign up, sign in, sign out and protected routes ..."
date: "2024-04-02T08:50:46+02:00"
categories: ["Next"]
keywords: ["next authentication"]
hashtags: ["#NextJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

I delved deep into exploring Authentication in Next.js 14 using Next's App Router, React Server Components (RSC), and Server Actions. This comprehensive tutorial covers using Lucia Auth for sign up, sign in, sign out, and protected routes. If you want to go beyond this with the implementation of password change, password reset, forgot password, email verification, organizations, roles, permissions and memberships, check out **"The Road to Next"**.

*Currently I am working on a new course called **["The Road to Next"](https://www.road-to-next.com/)** which will hopefully match the popularity of **The Road to React**. We will create a full-stack Next application which goes all the way from fundamental React knowledge to accessing a serverless database. I am more than excited to share all my knowledge about Next.js with you. **If you are interested**, check out the website and join the waitlist.*

<LinkCollection label="This tutorial is part 2 of 2 in this series." links={[{ prefix: "Part 1:", label: "Next.js with Prisma and SQLite", url: "/next-prisma-sqlite/" }]} />

# Using Authentication in Next.js

We will only use React Server Components with Server Actions and no Client Components at all for this authentication tutorial. In other words: We will not use any client-side JavaScript for the authentication flow. Instead, we will use React Server Components and Server Actions to handle the authentication logic on the server.

We'll start with a fresh Next.js application and add authentication to it step by step. Let's adjust the root page that we get with a new Next.js installation:

```tsx
// src/app/page.tsx

const PublicHomePage = () => {
  return <h2>Home Page (Public)</h2>;
};

export default PublicHomePage;
```

The wording already suggests that we will have a public home page which will be accessible without authentication. We will add a dashboard page in the next step which will later be protected and only accessible when the user is authenticated. If a user is not authenticated, we will implement a redirect to a public page:

```tsx
// src/app/dashboard/page.tsx

const ProtectedDashboardPage = () => {
  return <h2>Dashboard Page (Protected)</h2>;
};

export default ProtectedDashboardPage;
```

What's missing is the navigation between both pages. We will use the Root Layout which is the perfect place for a navigation in a header (which you could extract as a standalone React Server Component):

```tsx
// src/app/layout.tsx

...
import Link from 'next/link';

...

export default function RootLayout( ... ) {
  const appNav = (
    <>
      <li>
        <Link href="/">LOGO</Link>
      </li>
      <li>
        <Link href="/dashboard">Dashboard</Link>
      </li>
    </>
  );

  const authNav = null; // TODO

  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="p-4 flex justify-between">
          <ul className="flex gap-x-4 items-center">{appNav}</ul>
          <ul className="flex gap-x-4 items-center">{authNav}</ul>
        </nav>

        <hr />

        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
```

This layout will be shared across all pages for enabling users to navigate between them. We will later add routes for sign up, sign in, and sign out to the navigation. They will conditionally show up, whether as user is logged in or not. In addition, the sign-out button will only be accessible when the user is authenticated.

# Routes for Authentication

Next we will also add a sig-nup page and a sign-in page to the application which will be accessible without authentication. The sign-out button will be later only accessible when the user is authenticated. First the sig-nup page:

```tsx
// src/app/sign-up/page.tsx

const SignUpPage = () => {
  return <h2>Sign Up Page</h2>;
};

export default SignUpPage;
```

And second the sign-in page:

```tsx
// src/app/sign-in/page.tsx

const SignInPage = () => {
  return <h2>Sign In Page</h2>;
};

export default SignInPage;
```

We will add both pages to the navigation in addition to the sign-out button:

```tsx
// src/app/layout.tsx

const authNav = (
  <>
    <li>
      <Link href="/sign-up">Sign Up</Link>
    </li>
    <li>
      <Link href="/sign-in">Sign In</Link>
    </li>
    <li>
      <button>Sign Out</button>
    </li>
  </>
);
```

That's it for all the pages needed for a basic authentication flow. Later you may want to add more pages for password forgot, password reset, email verification, and so on. But for now, we will focus on the basic sign up, sign in, and sign out flow.

# Feature Folder for Authentication

We will create a feature folder for authentication in the application. This feature folder will contain all the logic for authentication. We will start with the sign-up flow and then move on to the sign-in flow. The sign-out flow will be the last step in this tutorial.

Create the following folders in your project:

```bash
- src/features/auth/
- src/features/auth/actions/
- src/features/auth/components/
```

If you are using Tailwind CSS, you may have to add the feature folder to your Tailwind configuration. Otherwise, you may not see your styles applied for components in the feature folder. You can do this by adding the feature folder in your Tailwind configuration or by just including everything that's in your src folder:

```bash
content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
```

Apart from minor Tailwind styles for layouts, there will be no aesthetic styling involved in this tutorial. We'll focus solely on the functionality and logic of the authentication flow. You can style the components as you see fit. For the sake of completion, you may want to add this base style for the HTML elements in the *globals.css*:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h2 {
    @apply text-2xl font-bold;
  }

  input {
    @apply text-slate-800 border border-slate-800 p-2 rounded-md;
  }

  button, button[type="submit"] {
    @apply bg-slate-800 text-white p-2 rounded-md;
  }
}
```

But you can also use the Tailwind CSS classes directly in your components.

# Sign Up Form and Server Action

We will start with the sign-up flow in this step. There we will use a new SignUpForm component on the sign-up page which we will implement in the next step in the feature folder for everything related to authentication:

```tsx
// src/app/sign-up/page.tsx

import { SignUpForm } from '@/features/auth/components/sign-up-form';

const SignUpPage = () => {
  return (
    <>
      <h2>Sign Up Page</h2>
      <SignUpForm />
    </>
  );
};

export default SignUpPage;
```

The sign-up form will be a simple form with a few input fields and a submit button. Not all of the fields are necessary for a sign-up, because having an email and password should be sufficient, however, we will add a few more fields for the sake of completion.

```tsx
// src/features/auth/components/sign-up-form.tsx

import { signUp } from '../actions/sign-up';

const SignUpForm = () => {
  return (
    <form action={signUp} className="p-4 flex flex-col gap-y-2">
      <input name="firstName" type="text" placeholder="First Name" />
      <input name="lastName" type="text" placeholder="Last Name" />
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export { SignUpForm };
```

We have used a Server Action in this React Server Component in the form's `action` prop for the form submission. Natively in Next.js with Sever Actions the action will be a function that takes the form data and handles the sign-up logic:

```ts
// src/features/auth/actions/sign-up.ts

'use server';

const signUp = async (formData: FormData) => {
  const formDataRaw = {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  };

  if (formDataRaw.password !== formDataRaw.confirmPassword) {
    throw new Error('Passwords do not match');
  }

  // TODO: add validation yourself
  // https://www.robinwieruch.de/next-forms/

  // TODO: implement sign up logic
  // we will do this later
  console.log(formDataRaw);
};

export { signUp };
```

There is not much logic yet, since we will implement it later. What's there is simply outputting the form data to the console. In addition, there is also no proper validation and error handling, because it's not the focus of this tutorial.

<ReadMore label="Form Validation in Next.js and Server Actions" link="/next-forms/" />

You can check out my other tutorial on form validation in Next.js with Zod for further information about form validation with fine-grained form field errors, toast messages, and form resets.

# Sign In Form and Server Action

We will add a sign-in form to the sign-in page in the next step. The sign-in form will be a simple form with an email and password input field and a submit button. We will also use a Server Action in the form's `action` prop for the form submission:

```tsx
// src/app/sign-in/page.tsx

import { SignInForm } from '@/features/auth/components/sign-in-form';

const SignInPage = () => {
  return (
    <>
      <h2>Sign In Page</h2>
      <SignInForm />
    </>
  );
};

export default SignInPage;
```

Notice how we haven't used any Client Components in this tutorial. We have only used React Server Components and Server Actions for the authentication flow. And we will keep it this way:

```tsx
// src/features/auth/components/sign-in-form.tsx

import { signIn } from '../actions/sign-in';

const SignInForm = () => {
  return (
    <form action={signIn} className="p-4 flex flex-col gap-y-2">
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Sign In</button>
    </form>
  );
};

export { SignInForm };
```

Lastly, we will implement the sign-in logic in the Server Action. We will use the form data to output the email and password to the console:

```ts
// src/features/auth/actions/sign-in.ts

'use server';

const signIn = async (formData: FormData) => {
  const formDataRaw = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  // TODO: add validation yourself
  // https://www.robinwieruch.de/next-forms/

  // TODO: implement sign in logic
  // we will do this later
  console.log(formDataRaw);
};

export { signIn };
```

Again we have not used any proper validation and error handling, because it's not the focus of this tutorial. We also expect everything as string which would not happen in a real-world application where we would have to protect the server action against these cases.

# Sign Out Button and Server Action

Next we will add a sign-out button to the Root Layout (in the `nav` element). In a React Server Component, we cannot add a handler to the sign-out button, because we would have to have a Client Component for this case:

```tsx
// src/app/layout.tsx

<button onClick={() => {}}>Sign Out</button>
```

Therefore we would have to extract the sign-out logic to a Client Component. However, we can use a trick to call it in a React Server Component by using a form:

```tsx
// src/app/layout.tsx

<form action={signOut}>
  <button type="submit">Sign Out</button>
</form>
```

And import the a new action that we will define in the next step

```ts
// src/app/layout.tsx

import { signOut } from '@/features/auth/actions/sign-out';
```

We will implement the sign-out logic in the already provided Server Action. We will just output something to verify that the sign-out button is working:

```ts
// src/features/auth/actions/sign-out.ts

'use server';

const signOut = async () => {
  // TODO - Implement sign out logic
  console.log('Sign Out');
};

export { signOut };
```

Keep in mind that Server Actions run on the server and therefore you will not see the logging output in the browser's console. You would have to check the server logs in the terminal for the output.

# Database and ORM for Authentication

Before you continue here, please refer to the following tutorial to set up a database and ORM for authentication in Next.js. We will use Prisma as the ORM and SQLite as the database.

<ReadMore label="Prisma with SQLite in Next.js" link="/next-prisma-sqlite/" />

We will use two database models for the authentication flow. The first one is the User model which holds the user data and the second one is the Session model which holds the session data. The User model will have a one-to-many relationship with the Session model, because a user can have many sessions. The Session model will have a many-to-one relationship with the User model, because a session can only belong to one user.

```bash
model User {
  id              String    @id
  sessions        Session[]
  firstName       String
  lastName        String
  email           String    @unique
  hashedPassword  String
}

model Session {
  id        String   @id
  expiresAt DateTime
  userId    String
  user      User     @relation(references: [id], fields: [userId], onDelete: Cascade)
}
```

The User model has a unique `email` field which will be used for the sign-up and sign-in logic. The `hashedPassword` field will hold the hashed password of the user and not the plain password. Last, the `expiresAt` field will hold the expiration date of the session.

Finally we will apply a database migration with Prisma to create the database tables for the User and Session models:

```bash
npx prisma db push
```

Afterward you should see both tables in the database with Prisma Studio.

# Prisma Client DB access in Server Actions

We will need a Prisma Client instance in the application eventually to read and write from/to the database. Therefore, initialize a Prisma Client instance in the project:

```ts
// src/lib/prisma.ts

import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
```

When working with Next.js, it is important to use a singleton pattern for the Prisma Client instance. Otherwise, you may run into issues with hot reloading and multiple instances of the Prisma Client in development mode. Use the following code snippet to create a singleton for the Prisma Client instance:

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

# Lucia Auth for Next.js

We will use Lucia Auth for the authentication flow in the application. Lucia Auth is a lightweight authentication library which is not opinionated about the database for the user and session management. It just provides all the primitives for authentication and session management. No [JWTs](https://en.wikipedia.org/wiki/JSON_Web_Token) are used here, instead we are storing the session in the database.

Note: The following implementations for Lucia Auth are taken from Lucia's documentation. Essentially this tutorial complements everything that's on Lucia's website about authentication for Next.js applications.

First, install Lucia and Oslo to the project:

```bash
npm install lucia oslo
```

Important: At the time of writing, Lucia does not support `oslo` with enabled Turbopack in Next.js. If you are using with `--turbo` in your *package.json* file, you may want to remove it.

Then add a new file for Lucia's configuration in the project. Again this implementation is taken from Lucia's documentation, so if anything is unclear, you can always refer to it:

```ts
// src/lib/lucia.ts

import { Lucia } from 'lucia';

const adapter = undefined; // TODO

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      email: attributes.email,
    };
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  email: string;
}
```

What's missing is the adapter for using Lucia with Prisma:

```bash
npm install @lucia-auth/adapter-prisma
```

Next use it in the Lucia configuration that we have implemented in the previous step:

```ts{4,7}
// src/lib/lucia.ts

import { Lucia } from 'lucia';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { prisma } from './prisma';

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  ...
});
```

Last adjust Next's configuration to play nice with Lucia Auth:

```ts
// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push('@node-rs/argon2', '@node-rs/bcrypt');
    return config;
  },
};

export default nextConfig;
```

That's it. Lucia Auth can be used for the authentication flow in the application. We will use it in the next step for the sign-up, sign-in, and sign-out logic.

# Sign Up with Server Action

Finally we will implement the sign-up logic with Lucia Auth. Because we won't store the actual password in the database, we will hash the password before. You can verify this later with Prisma Studio. We will also create a User in the database (and would also have to handle the error if a user with this email already exists):

```ts
// src/features/auth/actions/sign-up.ts

'use server';

import { generateId } from 'lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Argon2id } from 'oslo/password';
import { lucia } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';

const signUp = async (formData: FormData) => {
  ...

  // console.log(formDataRaw); <- remove

  try {
    const hashedPassword = await new Argon2id().hash(
      formDataRaw.password
    );
    const userId = generateId(15);

    await prisma.user.create({
      data: {
        id: userId,
        firstName: formDataRaw.firstName,
        lastName: formDataRaw.lastName,
        email: formDataRaw.email,
        hashedPassword,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    // TODO: add error feedback yourself
    // https://www.robinwieruch.de/next-forms/
    // TODO: add error handling if user email is already taken
    // The Road to Next
  }

  redirect('/dashboard');
};

export { signUp };
```

Furthermore we create a Session in the database with Lucia's helper function `createSession` and create a session cookie for the browser with Lucia's helper function `createSessionCookie`. With Next's built-in `cookies` helper function we can set the session cookie. Last we redirect the user to the dashboard page.

Important: We have been using one of several hashing algorithms for the password hashing. You can also use `Bcrypt` or `Scrypt` for the password hashing. You can find more information about algorithms in the official documentation of Oslo.

After you performed your first sign up in the application, you can check the database with Prisma Studio. You should see a new User and a new Session in the database.

# Sign In with Server Action

Next we will implement the sign-in logic with Lucia Auth. We will use the email to find the user in the database and then verify the password with the hashed password in the database. If the password is correct, we will create a new session for the user and set a new session cookie in the browser:

```ts
// src/features/auth/actions/sign-in.ts

'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Argon2id } from 'oslo/password';
import { lucia } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';

const signIn = async (formData: FormData) => {
  ...

  // console.log(formDataRaw); <- remove

  try {
    const user = await prisma.user.findUnique({
      where: { email: formDataRaw.email },
    });

    if (!user) {
      // https://www.robinwieruch.de/next-forms/
      throw new Error('Incorrect email or password');
    }

    const validPassword = await new Argon2id().verify(
      user.hashedPassword,
      formDataRaw.password
    );

    if (!validPassword) {
      // https://www.robinwieruch.de/next-forms/
      throw new Error('Incorrect email or password');
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    // TODO: add error feedback yourself
    // https://www.robinwieruch.de/next-forms/
  }

  redirect('/dashboard');
};

export { signIn };
```

Perhaps it is difficult to test the sign-in logic, because we already have a valid Session in the database from the previous sign-up flow. With Prisma Studio, you could delete the Session in the database and then try to sign in again. Then you should see a new Session in the database after you have signed in.

# Authentication Status

Before we can move on to the sign-out logic, we need to implement a function to check the authentication status of the user. We will also use this function later more often in the application to protect routes and to show different navigation items based on the authentication status of the user:

```ts
// src/features/auth/queries/get-auth.ts

import { cookies } from 'next/headers';
import { cache } from 'react';

import type { Session, User } from 'lucia';
import { lucia } from '@/lib/lucia';

export const getAuth = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId =
      cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);

    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(
          result.session.id
        );
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch {}
    return result;
  }
);
```

First we retrieve the `sessionId` from the session cookie. If there is no session cookie, we return `null` for the user and the session. If there is a session cookie, we validate the session with Lucia's helper function `validateSession`. If the session is fresh, we create a new session cookie in the browser. If there is no session, we create a new cookie with a blank value that expires immediately and therefore deletes the existing session cookie.

# Sign Out with Server Action

Finally we will implement the sign-out logic with Lucia Auth. We will invalidate the session in the database and create a new session cookie with a blank value that expires immediately. Last we will redirect the user to the sign-in page:

```ts
// src/features/auth/actions/sign-out.ts

'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { lucia } from '@/lib/lucia';
import { getAuth } from '../queries/get-auth';

export const signOut = async (_formData: FormData) => {
  const { session } = await getAuth();

  if (!session) {
    redirect('/sign-in');
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  redirect('/sign-in');
};
```

Check the database with Prisma Studio after you have signed out. You should see that the session got removed in the database. Your authentication flow should be complete now. You can sign up, sign in, and sign out in the application. You can also check the authentication status of the user in the application which we will prove in the next step.

# Protected Routes

With a authentication flow in place, we can now protect routes in the application. We will use the `getAuth` function from one of the previous steps to check the authentication status of the user. If the user is not authenticated, we will redirect the user to the sign-in page. We will use this function in a new *layout.tsx* for the Dashboard's *page.tsx*:

```tsx
// src/app/dashboard/layout.tsx

import { redirect } from 'next/navigation';
import { getAuth } from '@/features/auth/queries/get-auth';

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getAuth();

  if (!user) {
    redirect('/sign-in');
  }

  return <>{children}</>;
}
```

Now we cannot access the dashboard anymore without being authenticated. Eventually you want to protect more than the Dashboard page (e.g. Account page) and do not want to repeat the same logic for every page in its *layout.tsx* file. Therefore add a new Group Route folder:

```bash
- src/app/(authenticated)/layout.tsx
```

And move the `AuthenticatedLayout` (or *layout.tsx* file) from before to the new shared layout.tsx file. Then remove the *layout.tsx* from the dashboard folder, because it is now shared across all pages in the `(authenticated)` group route. Now you could have the following project structure:

```bash
- src/app/(authenticated)/layout.tsx
- src/app/(authenticated)/dashboard/page.tsx
- src/app/(authenticated)/account/page.tsx
// and more ...
```

It's worth mentioning that we haven't used the authorization in Next's middleware. There is no 100% right or wrong way to do it. You can use Next's middleware for the authorization, but you can also use React Server Components. For example, a Next core developer [tweeted](https://twitter.com/sebmarkbage/status/1765414733820129471) against using Next's middleware for the authorization and also the creator of Lucia Auth says to use React Server Components for the authorization.

# Authorization in UI

Last we want to show different navigation items based on the authentication status of the user. Again we will use the `getAuth` function from one of the previous steps:

```tsx
// src/app/layout.tsx
import { getAuth } from '@/features/auth/queries/get-auth';
```

Then the RootLayout needs to become an asynchronous function, which works because it is a React Server Component by default, and thus allows us to fetch the user before rendering the layout:

```tsx
export default async function RootLayout( ... ) {
  const { user } = await getAuth();

  ...
};
```

If the user is authenticated, we will show the dashboard link and the sign-out button. If the user is not authenticated, we will show the sign-up and sign-in links:

```tsx
const appNav = (
  <>
    <li>
      <Link href="/">LOGO</Link>
    </li>
    {user && (
      <li>
        <Link href="/dashboard">Dashboard</Link>
      </li>
    )}
  </>
);

const authNav = user ? (
  <li>
    <form action={signOut}>
      <button type="submit">Sign Out</button>
    </form>
  </li>
) : (
  <>
    <li>
      <Link href="/sign-up">Sign Up</Link>
    </li>
    <li>
      <Link href="/sign-in">Sign In</Link>
    </li>
  </>
);
```

The interesting part is that even though we used `getAuth` at two places, it runs only once (and hits the cache for the second time), because we are using React's `cache` function. This is a powerful feature of React Server Components with cached data fetching, because it allows us to fetch the same data at multiple places without worrying about the performance implications.

<Divider />

That's it for the basic authentication flow in a Next.js application with Lucia Auth. You can sign up, sign in, and sign out in the application. You can also protect routes and check the authentication status of the user. Next you may want to add more database models for the actual business domain and assign the `userId` as foreign key to it.

You can find the repository for this tutorial over [here](https://github.com/rwieruch/next-authentication). If you want to go beyond this with the implementation of password change, password reset, forgot password and email verification, check out **["The Road to Next"](https://www.road-to-next.com/)** and get on the waitlist!
