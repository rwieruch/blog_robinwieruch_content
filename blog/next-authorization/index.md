---
title: "Authorization in Next.js"
description: "Learn about authorization in Next.js when using React Server Components, Server Actions, and Next's App Router ..."
date: "2025-03-25T12:50:46+02:00"
categories: ["Next"]
keywords: ["next authorization"]
hashtags: ["#NextJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Since it became possible to create full-stack applications with React, the question of authorization has been a recurring topic. In this extensive guide, I want to explore how authorization can be implemented in Next.js when using React Server Components and Server Actions in Next's App Router.

*While this guide follows the event of the recent [security incident](https://nextjs.org/blog/cve-2025-29927) in Next.js, it is not a direct response to it. I have followed the [Next.js team's recommendations](https://nextjs.org/blog/security-nextjs-server-components-actions) for implementing authorization close to the data source in the past, so this guide outlines how I have approached authorization in my Next projects.*

# Table of Contents

<TableOfContents {...props} />

# Authorization for Data Access

The most important place to enforce authorization in a full-stack application acts as a safeguard for both read and write operations before users can access the data source. This is typically done in the API layer, which is responsible for handling requests and responses between the client and the server.

```sh
  +----------------------------+    +---------------------------+
  |  React Server Component    |    |      React Component      |
  +-------------+--------------+    +-------------+-------------+
                |                                 |
                v                                 v
  +----------------------------+    +----------------------------+
  |    custom Query Function   |    |    React Server Action     |
  |       (authorization)      |    |       (authorization)      |
  |         [getPosts]         |    |         [createPost]       |
  +-------------+--------------+    +-------------+--------------+
                |                                 |
                +---------------+-----------------+
                                |
                                v
                  +----------------------------+
                  |         Database           |
                  +----------------------------+
```

In a small sized full-stack application, you may only have React Server Components and Server Actions. Since accessing the database directly from a Server Component is not recommended, you will most likely have a data fetching function in between your Server Component and the database. This is the perfect spot to implement authorization.

```ts
export const getPosts = async () => {
  const { user } = await getAuth();

  if (!user) {
    throw new Error('Unauthorized');
  }

  return await db.query('SELECT * FROM posts');
};
```

You can substitute throwing the error with a human readable feedback mechanism.

<ReadMore label="Toast Feedback in React" link="/react-server-actions-toast/" />

<ReadMore label="Form Validation in React" link="/react-form-validation/" />

The same authorization check should happen in a Server Action for write operations. For example, if you have a Server Action that is responsible for creating a post, check if the user is authorized to create a post before inserting it into the database.

```ts
export const createPost = async (post: Post) => {
  const { user } = await getAuth();

  if (!user) {
    throw new Error('Unauthorized');
  }

  return await db.query('INSERT INTO posts SET ?', [post]);
};
```

The `getAuth` function performs validation of the session cookie against the database. It worth to note that we are using [React's Cache API](https://react.dev/reference/react/cache) here, to memoize the result of the `getAuth` function during one render cycle:

```ts
export const getAuth = cache(async () => {
  const sessionToken =
    (await cookies()).get("session")?.value ?? null;

  if (!sessionToken) {
    return {
      user: null,
      session: null,
    };
  }

  // "expensive" database call
  return await validateSession(sessionToken);
});
```

I also use an authorization function on top of `getAuth` called `getAuthOrRedirect`. This function will redirect the user to a login page if they are not authenticated instead of throwing an error, because the user is not supposed to access the resource:

```ts
export const getAuthOrRedirect = async () => {
  const { user, session } = await getAuth();

  if (!user) {
    redirect('/login');
  }

  return { user, session };
};
```

This function can be used as replacement for the previous `getAuth` function usages.

<Divider />

Once your application grows in size and complexity, you will introduce layers between your API and the database. This is where the Service Layer and the Data Access Layer come into play.

```sh
  +----------------------------+    +---------------------------+
  |  React Server Component    |    |      React Component      |
  +-------------+--------------+    +-------------+-------------+
                |                                 |
                v                                 v
  +----------------------------+    +----------------------------+
  |    custom Query Function   |    |    React Server Action     |
  |   (first line of defense)  |    |   (first line of defense)  |
  |         [getPosts]         |    |         [createPost]       |
  +-------------+--------------+    +-------------+--------------+
                |                                 |
                +---------------+-----------------+
                                |
                                v
                  +--------------------------------+
                  |         Service Layer          |
                  | (role/permission/owner checks) |
                  |         [domain logic]         |
                  +---------------+----------------+
                                |
                                v
                  +----------------------------+
                  |       Data Access Layer    |
                  |    (last line of defense)  |
                  | [ORM, raw SQL, repository] |
                  +-------------+--------------+
                                |
                                v
                  +----------------------------+
                  |         Database           |
                  +----------------------------+
```

In the API Layer, authorization acts as an initial gatekeeper, quickly verifying user authentication and rejecting unauthorized requests before deeper processing.

The Service Layer contains the core authorization logic, applying business-specific rules along with permission-based, owner-based, and role-based access control to ensure that only authorized users can perform read and write operations.

The Data Access Layer acts as a final line of defense for authorization, though its primary focus should be on data manipulation rather than permission checks, which are best handled in the service layer. However, in data-sensitive applications, you may choose to implement an additional layer of security at this stage.

<Divider />

Getting the authorization in front of your Data Access Layer right is the most important part of your application. If you have a solid authorization layer in place, you can be sure that your application is secure and that your data is safe.

From here you will make further authorization improvements to your application, like adding authorization to your routing, UI, and middleware.

# Authorization in Routing

Every entry point component in a Next.js application is a Server Component by default. Therefore, you can apply authorization checks in your page components who have access to the database to prevent unauthorized users from accessing certain routes.

```tsx
export const PostsPage = async () => {
  await getAuthOrRedirect();

  return (
    <div>
      <h1>Posts</h1>
      <PostCreateForm />
      <PostList />
    </div>
  );
};
```

If you don't have this defense mechanism in place, unauthorized users could navigate to the page (bad), but should still not be able to read or write data (good) due to the authorization checks in your API, Service, and Data Access Layers.

However, having it in place makes your application more secure and adds an improved user experience, so it is still strongly recommended to have it.

Keeping up with adding authorization to your routing can be a tedious and error-prone task. To make it easier, you can move the authorization into a Layout component that is shared across sibling and descending pages in your application.

```tsx
export const AuthLayout = ({ children }) => {
  await getAuthOrRedirect();

  return children;
};
```

The Layout component would be placed in a [route group](https://nextjs.org/docs/app/building-your-application/routing/route-groups) (here: `(authenticated)`) folder that contains all the pages that require the first line of defense for authorization.

```sh
- app/
--- page.tsx           <--- public page
--- sign-in/
----- page.tsx         <--- public page
--- sign-up/
----- page.tsx         <--- public page
--- (authenticated)/
----- layout.tsx       <--- AuthLayout
----- posts/
------- page.tsx       <--- protected page
------- [postId]
--------- page.tsx     <--- protected page
----- users/
------- page.tsx       <--- protected page
```

**However:** Consolidating route-based authorization from multiple Page components into a single Layout component prioritizes developer convenience over security.

**Security Risk:** It's is proven that Page components as Server Components can be fetched *independently* from the Layout component when a malicious user wants to access a protected page directly. Therefore, the Layout component is not a reliable place to enforce authorization checks.

**But:** There are reasons why you might still choose to use a Layout component for authorization. Ultimately, the decision depends on you and your team:

* **Human Error Prevention:** Centralizing authorization checks reduces the likelihood of forgetting to implement them in individual Page components.
* **Developer Experience:** Consolidating the authorization logic into one maintainable location makes it easier to manage. By simply reviewing the folder structure, you can immediately identify which pages are protected.

**Critical Caveat:** Layout authorization is a convenience layer, NOT a security solution. The true, comprehensive authorization must occur in API, Service, and/or Data Access Layers.

**Strategy 1:** Use Layout checks as a DX improvement, but implement robust, independent authorization checks in backend layers to ensure profound security.

**Strategy 2:** Implement authorization checks in Page components to ensure security, even if it means sacrificing developer experience and convenience.

**Strategy 3:** Combine both strategies to achieve a balance between security and developer experience (which may be redundant though).

<Divider />

In a growing application, when using Layout components as first line of defense for authorization, you will eventually implement more Layout components for authorization when roles and permissions come into play.

For example, you might have an AdminLayout component that checks if the user is an admin before rendering the children:

```tsx
export const AdminLayout = ({ children }) => {
  await getAdminOrRedirect();

  return children;
};
```

And then you would have a folder structure like this:

```sh
- app/
--- page.tsx           <--- public page
--- sign-in/
----- page.tsx         <--- public page
--- sign-up/
----- page.tsx         <--- public page
--- (user)/
----- layout.tsx       <--- UserLayout
----- posts/
------- page.tsx       <--- protected user-based page
------- [postId]
--------- page.tsx     <--- protected user-based page
----- users/
------- page.tsx       <--- protected user-based page
--- (admin)/
----- layout.tsx       <--- AdminLayout
----- admin/
------- page.tsx       <--- protected admin-based page
```

In conclusion, authorization in routing is a crucial part of your application. It is the first line of defense for the visual parts of application and should be implemented in a way that is secure and maintainable.

# Authorization in UI

Authorization in the UI is mostly there to provide a better user experience. For example, you might want to hide or disable UI elements based on the user's authorization status:

```tsx
export const PostMoreMenu = () => {
  const { user } = useAuth();

  return (
    <Menu>
      <MenuItem>Share</MenuItem>
      {user ? <MenuItem>Delete</MenuItem> : null}
    </Menu>
  );
};
```

However, as said, this serves as a better user experience and not as a security measure, because malicious users can still manipulate the client-side code. Therefore, the authorization checks in the API, Service, and Data Access Layers are the most important part of your application once again.

# Authorization in Middleware

There is also the middleware which many are using as their authorization layer. In Next.js, you can use middleware to protect any page.tsx or route.ts files in the App Router from unauthorized access:

```ts
export async function middleware(request: NextRequest) {
  const isAuthenticated = true;

  const path = request.nextUrl.pathname;

  const isProtectedRoute =
    path.startsWith("/tickets") || path.startsWith("/users");

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
```

However, the big caveat here is that the middleware is executed on every request, which can be a performance bottleneck. Therefore, it is recommended to not use the middleware for authorization checks that would hit a (slow) database.

```ts
// vvv: red flag if database call
const { user } = await getAuth();
const isAuthenticated = !!user;
```

Instead you can perform pre-flight checks in the middleware, like checking if the user has an active session cookie without checking it against the session in the database. This is a good practice for performance reasons.

```ts{7,9}
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isProtectedRoute =
    path.startsWith("/tickets") || path.startsWith("/users");

  const sessionToken = request.cookies.get("session")?.value;

  if (isProtectedRoute && !sessionToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}
```

You could also [refresh the cookie's expiration time](https://lucia-auth.com/sessions/cookies/nextjs) in the middleware, which is a common practice to keep the user logged in for a longer period of time.

But at the end of the day, if you don't want to get into the performance pitfalls of middleware, the middleware is not the place to perform database intensive authorization checks. Instead, you should use the API, Service, and Data Access Layers as the critical line of defense.

Other caveats that make working with middleware more complicated:

* **Edge Runtime Environment:** Next's middleware runs in the edge runtime environment, which is not Node.js and therefore does not allow all Node.js features. For example, running an ORM like Prisma has been a challenge in the past. Whereas Prisma (and other third-parties) have come up with solutions, the Next team is working on a [switch to run Middleware in Node.js](https://nextjs.org/blog/next-15-2#nodejs-middleware-experimental) too.
* **Coarse-Grained Middleware:** You can only have one middleware file in your Next.js application. This can be a challenge if you want to have more fine-grained middlewares for different parts of your application. The Next team is working on a solution called [Interceptors](https://github.com/vercel/next.js/pull/70961).

<Divider />

If you take one thing away from this tutorial, it should be that authorization should be as close as possible to your sensitive data. This means that you should have authorization checks in your API, Service, and Data Access Layers. This is the most important part of your application and should be implemented in a way that is secure and maintainable.
