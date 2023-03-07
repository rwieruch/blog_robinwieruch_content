---
title: "Full-Stack TypeScript with tRPC and React"
description: "How to use tRPC with React for full-stack type safety with TypeScript ..."
date: "2023-03-06T08:50:46+02:00"
categories: ["Node", "TypeScript"]
keywords: ["trpc react"]
hashtags: ["#ReactJS"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

tRPC allows developers to create fully type safe APIs with TypeScript in full-stack applications. While the server application produces a type safe router with type safe functions (e.g. CRUD operations: create user, get user by identifier, get all users), the client application can call these functions directly on the inferred type safe router. Under the hood, HTTP is still used to communicate between client and server.

[tRPC](https://trpc.io/) requires having TypeScript on the client and server. Since the client has to import the type safe router from the server, it kinda makes sense to have both applications in shared environment (from folder to [Monorepo](https://www.robinwieruch.de/javascript-monorepos/) everything is possible). Due to the router being the glue between client and server, we get fully typed APIs without any schemas (e.g. REST with [OpenAPI](https://www.openapis.org/)) or code generation (e.g. GraphQL with [GraphQL Code Generator](https://the-guild.dev/graphql/codegen)).

While GraphQL and [REST](https://www.robinwieruch.de/node-express-server-rest-api/) can both create type safe APIs, they always need an intermediate step to create these types in an extra generated file. For example, GraphQL Code Generator creates a new type safe schema file. With tRPC you get type safe functions for your client application that put simply run the code on the server.

Compared to GraphQL and REST, tRPC is mainly used (so far) for smaller projects where not many services need to be orchestrated (e.g. GraphQL) or we do not work necessarily on resources with a standardized RESTful approach. However, it's possible to migrate any time from tRPC to GraphQL/REST, because tRPC in the end is just functions on the server which can be directly used in a REST router or GraphQL resolvers.

The following tutorial is a walkthrough of creating a smallish CRUD application with Node + Express on the server and React on the client. We will use tRPC to establish the communication between both worlds. The shown folder structure will be partly created in the next steps, but you can start with creating the root folder:

```text
- my-project/
--- client/
--- server/
```

# Full-Stack Node with tRPC

In this section of the tutorial, we'll create the server application with Node, tRPC and Express. First, create a new folder for the server in your project on the command line:

```text
mkdir server
```

Next, create a minimal JavaScript project and upgrade it to a TypeScript project:

<LinkCollection label="This tutorial is part 3 of 3 in the series." links={[{ prefix: "Part 1:", label: "How to set up a modern JavaScript project", url: "/javascript-project-setup-tutorial/" }, { prefix: "Part 2:", label: "TypeScript with Node.js", url: "/typescript-node/" }]} />

After you have a running TypeScript application, we can start with the actual tRPC implementation for the server which will expose a fully type safe API to the client eventually. First, we will install the tRPC server dependencies on the command line:

```text
npm install @trpc/server
```

Second, we will also install [Zod](https://github.com/colinhacks/zod) for having a type safe schema validation. For example, Zod will allow us to validate the input from a user that reaches the API on the server:

```text
npm install zod
```

Now an overview of what we are building from a bird's eye perspective:

```text
- client/
- server/
--- src/
----- index.ts
----- context.ts
----- router.ts
----- trpc.ts
----- user/
------- router.ts
------- types.ts
------- db.ts
```

You can create all the folders/files along the way. As you can see, the server application will have a *user/* folder. There we will implement all the CRUD operations (e.g. create a user) for the user domain. Let's start with the User type definition in the *src/user/types.ts* file. First each user will only have an `id` and a `name`:

```ts
export type User = {
  id: string;
  name: string;
};
```

Second, we will fill a pseudo database file called *src/user/db.ts* with two users:

```ts
import { User } from './types';

export const users: User[] = [
  {
    id: '0',
    name: 'Robin Wieruch',
  },
  {
    id: '1',
    name: 'Neil Kammen',
  },
];
```

And third, we will create the core of this tutorial where we will implement the [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) API with tRPC for the user domain in the *src/user/router.ts* file. We'll create functions for `getUsers`, `getUserById` and `createUser` with a query (read) or mutation (write). Feel free to add functions for `updateUserById` and `deleteUserById` yourself:

```ts
import { z } from 'zod';

import { router, publicProcedure } from '../trpc';

import { users } from './db';
import { User } from './types';

export const userRouter = router({
  getUsers: publicProcedure.query(() => {
    return users;
  }),
  getUserById: publicProcedure
    .input((val: unknown) => {
      if (typeof val === 'string') return val;
      throw new Error(`Invalid input: ${typeof val}`);
    })
    .query((req) => {
      const { input } = req;

      const user = users.find((user) => user.id === input);

      return user;
    }),
  createUser: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation((req) => {
      const { input } = req;

      const user: User = {
        id: `${Math.random()}`,
        name: input.name,
      };

      users.push(user);

      return user;
    }),
});
```

The last file creates a `userRouter` which exposes all the user related functions to the client application eventually. This domain specific router will be used in a root router which aggregates all domain specific routers of the application later.

Furthermore, we are using the `User` type definition and the pseudo database which we have created earlier. When we look closer at the `createUser` function and its chained `input` function, we can see how Zod is used to validate the input as `name` of the data type string. Even though Zod is perfect for schema validations in TypeScript projects, we can use any validation (e.g. [Yup](https://github.com/jquense/yup)) in tRPC.

Next, we need to implement the actual tRPC `router` and the `publicProcedure` which we already used in the previous `userRouter`. Create a new *src/trpc.ts* file and add the following implementation:

```ts
import { initTRPC, inferAsyncReturnType } from '@trpc/server';

import { createContext } from './context';

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const middleware = t.middleware;
export const router = t.router;

/**
 * Public procedures
 **/
export const publicProcedure = t.procedure;
```

Essentially we created the foundation for a type safe router and a public procedure without any restrictions. This is kinda the default tRPC setup. It would also be the place where you could add *protected procedures* (e.g. authentication) with middlewares (e.g. checking the authenticated user) eventually. What's missing is the *src/context.ts* file:

```ts
import * as trpcExpress from '@trpc/server/adapters/express';

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return {};
};
```

Again, a basic foundation for the context which is used for every API call. However, here we already specified that we want to use [Express](https://expressjs.com/) with tRPC. Other adapters like [Fastify](https://www.fastify.io/) are available too. We did not pass anything in the returned context yet, but this would be the place to add the authenticated user when there is a valid session token coming from the request. Then a middleware from the previous file could check the authenticated user for protected procedures.

Earlier we created a user specific router with tRPC. Next we will create the root router in a new *src/router.ts* file which consolidates all domain specific routers. Here you may add other domain specific routers eventually:

```ts
import { router } from './trpc';
import { userRouter } from './user/router';

export const appRouter = router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
```

Last, we need to setup the actual server. We will be using Express here, because we already used the tRPC + Express adapter for the context, however, there are [other options](https://trpc.io/docs/adapters) available. Let's install Express first:

```text
npm install express cors
npm install @types/express @types/cors --save-dev
```

And second, use it together with the router and context that we created earlier in a top-level *src/index.ts* file:

```ts
import cors from 'cors';
import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';

import { appRouter } from './router';
import { createContext } from './context';

const app = express();

app.use(cors());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(4000);

export type AppRouter = typeof appRouter;
```

The implementation is not much different from a standalone Express server. The only two differences is the Express aware integration of tRPC. Furthermore, we export the type `AppRouter` which will be used by the client application eventually. Note that the `AppRouter` is not the implementation of the router, but only its type definitions.

Start your server with `npm start` and verify that there are no errors showing up. Next we will continue with the client application which will make use of the exported `AppRouter` type definitions and its typed functions (e.g. `createUser`).

# Full-Stack React with tRPC

Disclaimer: The frontend application in React will be using Vite instead of Next.js, because I usually teach client-side routing over server-side routing for beginners in my books like **The Road to React** as well. For readers of my content, this will be the perfect continuing content after learning the [fundamentals of frontend and backend development](/web-applications/) with React and Node.

We will start by using [Vite](https://vitejs.dev/) for creating a React with TypeScript frontend application. On the command line, move into the project's folder. There create a *client/* folder with the following instructions on the command line (next to the *server/* folder):

```text
npm create vite@latest client -- --template react-ts
```

Vite takes care of creating a minimal frontend application with React and TypeScript. After you have entered the last command, you should see a folder/file structure in the *client/* folder. Next, move into the new *client/* folder, install all dependencies, and start the application. You should find a barebones web application in the browser:

```text
cd client
npm install
npm run dev
```

From here we will start the tRPC specific implementation for this React/TypeScript application. Therefore, you have to install these two dependencies to your frontend project. First, the tRPC client which helps us to make requests to the tRPC server. And second, the tRPC server, which we will not use directly as dependency in the frontend, but which is a necessary peer dependency of the tRPC client:

```text
npm install @trpc/client @trpc/server
```

The ultimate goal here is creating an end-to-end type safety with TypeScript throughout the full stack of frontend and backend application. Therefore we will create a file called *src/trpc.ts* where this magic happens:

```ts
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

import type { AppRouter } from '../../server/src/index';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000/trpc',
    }),
  ],
});
```

Essentially we are instantiating the tRPC client here -- which takes as a bare minimum of an URL for the API of the server application. However, the magic lies in the imported `AppRouter` type which gets imported from the *server/* project into the *client/* project. Next the `AppRouter` type can be used as [TypeScript generic](/typescript-generics/) for creating the client-side tRPC instance. As result, we inherit all the types from the backend in the frontend. In other words, we achieved end-to-end type safety with TypeScript.

We will prove the previous statement in a React component now. The following implementation shows how the *src/App.tsx* file imports the tRPC client instance from the previous file. It gets used in [React's useEffect Hook](/react-useeffect-hook/) where it fetches an actual user from the server when the component renders. What's important is that everything on the `trpc` client is type safe and therefore can be auto completed (e.g. `user` and `getUserById`) in your IDE (e.g. VSCode):

```tsx
import * as React from 'react';

import { trpc } from './trpc';

const App = () => {
  const fetchUser = async () => {
    const user = await trpc.user.getUserById.query('0');

    console.log(user);
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  return <></>;
};

export default App;
```

When you open the browser, you should see the user getting logged over there. Nothing gets rendered though due to the use of React fragments. If you cannot see the logging and see an error instead, make sure to start your *server/* project on the command line, because otherwise it's not available for the client application.

# tRPC with React Query

When it comes to data fetching in React, one cannot get around [React Query](https://www.npmjs.com/package/react-query), because it comes with powerful features like caching, refetching, and retries on failure. But it already starts with a loading state which we don't have to manage ourselves all the time. Fortunately, tRPC comes with a React Query integration that we will set up next. First, install React Query (RQ) and tRPC's React Query integration for it:

```text
npm install @tanstack/react-query @trpc/react-query
```

Next go into your *src/trpc.ts* file and include the new tRPC to React Query adapter there. Do not forget to export both tRPC instances from this file:

```typescript{1,5,7}
import { createTRPCReact, httpBatchLink } from '@trpc/react-query';

import type { AppRouter } from '../../server/src/index';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000/trpc',
    }),
  ],
});
```

In your *src/main.tsx* file, provide both React Query and tRPC globally:

```tsx{3-6,8,11,16-17,19-20}
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { trpc, trpcClient } from './trpc';
import App from './App';

const queryClient = new QueryClient();

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </trpc.Provider>
);
```

Finally you can use tRPC with React Query. On the tRPC instance, you can access the `user` router, from there the `getUserById` procedure, and finally from there React Query's `useQuery` Hook. The returned result is native to React Query and fully typed. You can access all the properties on `trpc` and `data` with your IDE's auto complete:

```tsx{6,8,10}
import * as React from 'react';

import { trpc } from './trpc';

const App = () => {
  const { data, isLoading } = trpc.user.getUserById.useQuery('0');

  if (isLoading) return <div>Loading ...</div>;

  return <div>{data?.name}</div>;
};

export default App;
```

Changing the method from `getUserById` to `getUsers` yields an immediate type error:

```tsx{6}
import * as React from 'react';

import { trpc } from './trpc';

const App = () => {
  const { data, isLoading } = trpc.user.getUsers.useQuery();

  if (isLoading) return <span>Loading ...</span>;

  return <div>{data?.name}</div>;
  // Property 'name' ^ does not exist on type 'User[]'.
};

export default App;
```

We can fix this with an appropriate implementation which renders a [list](/react-list-component/) of users:

```tsx{11-17}
import * as React from 'react';

import { trpc } from './trpc';

const App = () => {
  const { data, isLoading } = trpc.user.getUsers.useQuery();

  if (isLoading) return <span>Loading ...</span>;

  return (
    <div>
      <ul>
        {(data ?? []).map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
```

We have used the `getUserById` and `getUsers` functions. Last, we will use the `createUser` function that we defined on the server's router to create a user from the UI. We will implement a [form in React](https://www.robinwieruch.de/react-form/) which enables a user to input a name and to send the request. See again how the tRPC instance enables us to access the user domain and its functions (here `getUsers` and `createUser`) and their respective query/mutation functions which are native to React Query and fully typed:

```tsx{6,8,10-12,14-18,20-24,36-46}
import * as React from 'react';

import { trpc } from './trpc';

const App = () => {
  const [name, setName] = React.useState('');

  const { data, isLoading, refetch } = trpc.user.getUsers.useQuery();

  const mutation = trpc.user.createUser.useMutation({
    onSuccess: () => refetch(),
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setName('');
    mutation.mutate({ name });
    event.preventDefault();
  };

  if (isLoading) return <span>Loading ...</span>;

  return (
    <div>
      <ul>
        {(data ?? []).map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={handleChange}
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default App;
```

That's it. We have implemented a server and client application with tRPC. While the server uses Express, the client uses React and React Query. We implemented only a few type safe API endpoints here, however, you can imagine how this scales with having more domain specific routers (e.g. Post, Comment) and more query/mutation functions within the router (e.g. `deleteUserById`).

<Divider />

tRPC is a great solution for full-stack type safe applications which are using TypeScript on both client and server and which share a codebase. It can be the perfect fit for bootstrapping a new project, because once the barebones are set up, it offers an incredible developer experience for scaling a type safe API. Later, only if needed, one can migrate to GraphQL or REST and reuse the functions over there.