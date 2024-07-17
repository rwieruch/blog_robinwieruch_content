---
title: "Server Actions in Next.js"
description: "Learn how to use Server Actions in Next.js in React Server Components to create a full-stack application ..."
date: "2024-04-09T08:50:46+02:00"
categories: ["Next"]
keywords: ["next server actions"]
hashtags: ["#NextJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

I explored Server Actions in Next.js 14 using Next's App Router and React Server Components (RSC). This comprehensive tutorial shows how to use Server Actions to create, read, update, and delete (CRUD) entities.

*Currently I am working on a new course called **["The Road to Next"](https://www.road-to-next.com/)** which will hopefully match the popularity of **The Road to React**. We will create a full-stack Next application which goes all the way from fundamental React knowledge to accessing a serverless database. I am more than excited to share all my knowledge about Next.js with you. **If you are interested**, check out the website and join the waitlist.*

<LinkCollection label="This tutorial is part 2 of 2 in this series." links={[{ prefix: "Part 1:", label: "Next.js with Prisma and SQLite", url: "/next-prisma-sqlite/" }]} />

# React Server Components: Read

If you have done the previous tutorial (including the database seeding), you should already render the initial data directly from a Prisma query in a React Server Component. This will be the starting point for this tutorial:

```tsx
// src/app/page.tsx

import { prisma } from '@/lib/prisma';

const Home = async () => {
  const posts = await prisma.post.findMany();

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <h2>Home</h2>

      <ul className="flex flex-col gap-y-2">
        {posts.map((post) => (
          <li key={post.id}>{post.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

Next you also want to read a single post. Therefore we will use Next's Link component to navigate to a new page which should show the individual post:

```tsx{13-18}
import Link from 'next/link';
...

const Home = async () => {
  const posts = await prisma.post.findMany();

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <h2>Home</h2>

      <ul className="flex flex-col gap-y-2">
        {posts.map((post) => (
          <li key={post.id} className="flex items-center gap-x-4">
            <div>{post.name}</div>
            <div>
              <Link href={`/posts/${post.id}`}>Go To</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

On this new page, you can access the `postId` from the URL and fetch the post data from the database. Again we are using a React Server Component to await the data fetching before rendering the component:

```tsx
// src/app/posts/[postId]/page.tsx

import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

type PostPageProps = {
  params: {
    postId: string;
  };
};

const PostPage = async ({ params }: PostPageProps) => {
  const post = await prisma.post.findUnique({
    where: {
      id: params.postId,
    },
  });

  if (!post) {
    return notFound();
  }

  return <h2>{post.name}</h2>;
};

export default PostPage;
```

From here we want to add the ability to create, update, and delete posts. We will use Server Actions to achieve this and not have to convert any Server Component into a Client Component.

# Server Actions: Create

In this tutorial, we will create all server actions next to the server components. However, in a real-world application, you would likely extract these server actions into a separate file. I like to use feature folders for this purpose.

Anyway, we will start with the create action. We will add a form to the Home component to create a new post. The form will use a Server Action to create the post in the database and then revalidate the home page to show the new post:

```tsx{1,4-16,25-28}
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

const createPost = async (formData: FormData) => {
  'use server';

  const name = formData.get('name') as string;

  await prisma.post.create({
    data: {
      name,
    },
  });

  revalidatePath('/');
};

const Home = async () => {
  const posts = await prisma.post.findMany();

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <h2>Home</h2>

      <form action={createPost} className="flex flex-col gap-y-2">
        <input type="text" name="name" placeholder="Name" />
        <button type="submit">Create</button>
      </form>

      <ul className="flex flex-col gap-y-2">
        ...
      </ul>
    </div>
  );
};

export default Home;
```

The tutorial will not show how to enhance these forms with validation, error handling, loading states, and user feedback (e.g. toast messages). If you want to learn more about this, check out [how to handle Forms in Next with Server Actions](/next-forms/).

# Server Actions: Update

Next, we will add the ability to update a post. Therefore we will need a new page for editing an individual post. Let's enabled our users to navigate to this page from the home page:

```tsx{7-9}
// src/app/page.tsx

<ul className="flex flex-col gap-y-2">
  {posts.map((post) => (
    <li key={post.id} className="flex items-center gap-x-4">
      <div>{post.name}</div>
      <div className="flex items-center">
        <Link href={`/posts/${post.id}`}>Go To</Link> |{' '}
        <Link href={`/posts/${post.id}/edit`}>Edit</Link>
      </div>
    </li>
  ))}
</ul>
```

On this new page, we will add a form to edit the post. Note how we use a hidden input to send the post's id too, because we need it to identify the post in the database:

```tsx
// src/app/posts/[postId]/edit/page.tsx

import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

type PostPageProps = {
  params: {
    postId: string;
  };
};

const PostPage = async ({ params }: PostPageProps) => {
  const post = await prisma.post.findUnique({
    where: {
      id: params.postId,
    },
  });

  if (!post) {
    return notFound();
  }

  return (
    <form action={updatePost}>
      <input type="hidden" name="id" value={post.id} />
      <input
        type="text"
        name="name"
        placeholder="Name"
        defaultValue={post.name}
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default PostPage;
```

The server action will be declared in the same file. It reads the `id` and `name` from the formData and updates the post in the database. Then revalidate the home page and redirect to it:

```tsx
import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const updatePost = async (formData: FormData) => {
  'use server';

  const id = formData.get('id') as string;
  const name = formData.get('name') as string;

  await prisma.post.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  revalidatePath('/');
  redirect('/');
};

...
```

The one gotcha from this example is that we are using a hidden input to send the post's id with the server action. There are alternative to it though.

# Server Actions: Delete

For deleting a post, we need a HTML button in the UI. However, with only a button, how would we execute the server action? In the case of a Client Component, we could use an event handler for the button which would execute the server action. But we want to make it happen without using a Client Component.

Here is a little trick to make it happen. We can use a form with only a button. In addition, in order to get the post's id to delete, we can [bind](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) the server action to the identifier. This way, the server action will receive the post's id as an argument:

```tsx{5-15,31-33}
// src/app/page.tsx

...

const deletePost = async (id: string) => {
  'use server';

  await prisma.post.delete({
    where: {
      id,
    },
  });

  revalidatePath('/');
};

const Home = async () => {
  const posts = await prisma.post.findMany();

  return (
    <div className="p-4 flex flex-col gap-y-4">
      ...

      <ul className="flex flex-col gap-y-2">
        {posts.map((post) => (
          <li key={post.id} className="flex items-center gap-x-4">
            <div>{post.name}</div>
            <div className="flex items-center">
              <Link href={`/posts/${post.id}`}>Go To</Link> |{' '}
              <Link href={`/posts/${post.id}/edit`}>Edit</Link> |{' '}
              <form action={deletePost.bind(null, post.id)}>
                <button type="submit">Delete</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
```

That's it. After deleting a post, we are revalidating the home page to show the updated list of posts.

<Divider />

This tutorial showed how to use Server Actions in Next.js to create, read, update, and delete entities. We used React Server Components to render the initial data from the database and Server Actions to interact with the database. We were not required to convert any Server Component into a Client Component to achieve this.

You can find the repository for this tutorial over [here](https://github.com/rwieruch/next-server-actions). If you want to go beyond this tutorial, check out **["The Road to Next"](https://www.road-to-next.com/)** and get on the waitlist!