---
title: "Environment Variables in Deno"
description: "Learn how to use environment variables in Deno with .env and dotenv for sensitive data (e.g. API keys, credentials) which shouldn't be visible in version control (e.g. Git) ..."
date: "2020-06-07T09:52:46+02:00"
categories: ["Deno"]
keywords: ["deno environment variables"]
hashtags: ["#Deno"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Environment variables are great for hiding sensitive information about your Deno application. This can be API keys, passwords, or other data which shouldn't be visible to others. That's why there exists the *.env* file, which you would have to create, to hide sensitive information. We will create this file and pass some sensitive information to it:

```text
PASSWORD=Geheimnis
```

In your source code files, you can use this environment variable with the dotenv third party library:

```javascript
import { config } from 'https://deno.land/x/dotenv/mod.ts';

const password = config()['PASSWORD'];

console.log(password);
// "Geheimnis"
```

The utility function returns an object with all the key/value pairs from the *.env* file. Now the information isn't exposed in the source code anymore, but only available in the environment variables file.

Once you start your Deno application, you should see a permission error showing up on the command line: *"Uncaught PermissionDenied: read access to "/Users/mydspr/Developer/Repos/deno-example", run again with the --allow-read flag"*. You can allow the access on environment variables with a permission flag in Deno:

```text
deno run --allow-read index.ts
```

It's important to note that the *.env* file shouldn't be shared in a public repository where everybody can see it. If you make your source code public, for example on GitHub, consider adding the *.env* file to a *.gitignore* file.