---
title: "Authentication in Next.js"
description: "Learn how to roll your own authentication in Next.js ..."
date: "2024-10-29T12:50:46+02:00"
categories: ["Next"]
keywords: ["next authentication"]
hashtags: ["#NextJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

I explored Authentication in Next.js 15 using Next's App Router, React Server Components (RSC), and Server Actions. This comprehensive tutorial covers hand rolling your own authentication for sign up, sign in, sign out, and protected routes.

If you want to go beyond this with the implementation of password change, password reset, forgot password, email verification, organizations, roles, permissions and memberships, check out **"The Road to Next"**.

<LinkCollection label="This tutorial is part 3 of 3 in this series." links={[{ prefix: "Part 1:", label: "Next.js with Prisma and SQLite", url: "/next-prisma-sqlite/" }, { prefix: "Part 2:", label: "How to roll your own Auth in JavaScript & TypeScript", url: "/how-to-roll-your-own-auth/" }]} />

# Authentication in Next.js

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

What's missing is the navigation between both pages. We will use the root layout in Next.js which is the perfect place for a navigation in a header (which you could later extract as a standalone React Server Component):

```tsx{3,8-17,19,24-27}
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
    <html ...>
      <body ...>
        <nav>
          <ul>{appNav}</ul>
          <ul>{authNav}</ul>
        </nav>

        <hr />

        <main>{children}</main>
      </body>
    </html>
  );
}
```

This layout will be shared across all pages for enabling users to navigate between them. We will later add routes for sign up, sign in, and sign out to the navigation. They will conditionally show up, whether as user is logged in or not. In addition, the sign-out button will only be accessible when the user is authenticated.

# Public Routes for Authentication

Next we will also add a sign-up page and a sign-in page to the application which will be accessible without authentication. The sign-out button will be later only accessible when the user is authenticated. First the sign-up page:

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

# Sign Up in Next.js (Registration)

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

We have used a Server Action in this React Server Component in the form's `action` prop for the form submission. Natively in Next.js with Sever Actions the action will be a function that takes the form data and handles the sign-up logic.

Because we won't store the actual password in the database, we will hash the password before. You can verify this later with Prisma Studio. We will also create a user in the database (and would also have to handle the error if a user with this email already exists):

```ts
// src/features/auth/actions/sign-up.ts
'use server';

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/auth/password';
import { generateRandomSessionToken, createSession } from '@/auth/session';
import { setSessionCookie } from '@/auth/cookie';

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

  // TODO: validate formData before proceeding
  // https://www.robinwieruch.de/next-forms/

  try {
    const passwordHash = await hashPassword(formDataRaw.password);

    const user = await prisma.user.create({
      data: {
        firstName: formDataRaw.firstName,
        lastName: formDataRaw.lastName,
        email: formDataRaw.email,
        passwordHash,
      },
    });

    const sessionToken = generateRandomSessionToken();
    const session = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (error) {
    // TODO: add error feedback yourself
    // https://www.robinwieruch.de/next-forms/

    // TODO: add error handling if user email is already taken
    // see "The Road to Next"
  }

  redirect('/dashboard');
};

export { signUp };
```

Furthermore we create a Session in the database with the `createSession` auth function and set a session cookie for the browser the `setSessionCookie` auth function. With Next's built-in `cookies` API, we can set the session cookie within the `setSessionCookie` function. Last we redirect the user to the dashboard page.

After you performed your first sign up in the application, you can check the database with Prisma Studio. You should see a new User and a new Session in the database.

<ReadMore label="Form Validation in Next.js and Server Actions" link="/next-forms/" />

You can check out my other tutorial on form validation in Next.js with Zod for further information about form validation with fine-grained form field errors, toast messages, and form resets.

# Sign In in Next.js (Login)

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

Lastly, we will implement the sign-in logic in the Server Action. We will use the email to find the user in the database and then verify the password with the hashed password in the database. If the password is correct, we will create a new session for the user and set a new session cookie in the browser:

```ts
// src/features/auth/actions/sign-in.ts
'use server';

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { verifyPasswordHash } from '@/auth/password';
import { generateRandomSessionToken, createSession } from '@/auth/session';
import { setSessionCookie } from '@/auth/cookie';

const signIn = async (formData: FormData) => {
  const formDataRaw = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  // TODO: validate formDataRaw (and retrieve typed formData) before proceeding
  // https://www.robinwieruch.de/next-forms/

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // https://www.robinwieruch.de/next-forms/
      throw new Error('Incorrect email or password');
    }

    const validPassword = await verifyPasswordHash(user.passwordHash, password);

    if (!validPassword) {
      // https://www.robinwieruch.de/next-forms/
      throw new Error('Incorrect email or password');
    }

    const sessionToken = generateRandomSessionToken();
    const session = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (error) {
    // TODO: error handling
    // https://www.robinwieruch.de/next-forms/
  }

  redirect('/dashboard');
};

export { signIn };
```

Perhaps it is difficult to test the sign-in logic, because we already have a valid session in the database from the previous sign-up flow. With Prisma Studio, you could delete the session in the database and then try to sign in again. Then you should see a new session in the database after you have signed in.

# Sign Out in Next.js (Logout)

Next we will add a sign-out button to the Root Layout (in the `nav` element). In a React Server Component, we cannot add a handler to the sign-out button, because we would have to have a Client Component for this case:

```tsx
// src/app/layout.tsx
<button onClick={() => {}}>Sign Out</button>
```

Therefore we would have to extract the sign-out logic to a Client Component. However, we can use a trick to call it in a React Server Component by using a [form button](/react-form-button/):

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

We will implement the sign-out logic in the already provided Server Action. We will invalidate the session in the database and create a new session cookie with a blank value that expires immediately. Last we will redirect the user to the sign-in page:

```ts
// src/features/auth/actions/sign-out.ts
'use server';

import { redirect } from "next/navigation";
import { getAuth, deleteSessionCookie } from "@/auth/cookie";
import { invalidateSession } from "@/auth/session";

export const signOut = async () => {
  const { session } = await getAuth();

  if (!session) {
    redirect('/sign-in');
  }

  await invalidateSession(session.id);
  await deleteSessionCookie();

  redirect('/sign-in');
};
```

Check the database with Prisma Studio after you have signed out. You should see that the session got removed in the database. Your authentication flow should be complete now. You can sign up, sign in, and sign out in the application. You can also check the authentication status of the user in the application which we will prove in the next step.

# Protected Routes

With a authentication flow in place, we can now protect routes in the application. We will use the `getAuth` function to check the authentication status of the user. If the user is not authenticated, we will redirect the user to the sign-in page. We will use this function in a new *layout.tsx* for the Dashboard's *page.tsx*:

```tsx
// src/app/dashboard/layout.tsx
import { redirect } from 'next/navigation';
import { getAuth } from "@/auth/cookie";

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

```sh
- src/app/(authenticated)/layout.tsx
```

And move the `AuthenticatedLayout` (or *layout.tsx* file) from before to the new shared layout.tsx file. Then remove the *layout.tsx* from the dashboard folder, because it is now shared across all pages in the `(authenticated)` group route. Now you could have the following project structure:

```sh
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

That's it for the basic authentication flow in a Next.js application with Oslo. You can sign up, sign in, and sign out in the application. You can also protect routes and check the authentication status of the user. Next you may want to add more database models for the actual business domain and assign the `userId` as foreign key to it.

You can find the repository for this tutorial over [here](https://github.com/rwieruch/next-authentication). If you want to go beyond this with the implementation of password change, password reset, forgot password and email verification, check out **["The Road to Next"](https://www.road-to-next.com/)** and get on the waitlist!
