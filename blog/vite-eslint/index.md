---
title: "Vite with ESLint"
description: "How to use ESLint in Vite with vite-plugin-eslint for a better code style linting ..."
date: "2023-02-04T09:52:46+02:00"
categories: ["React", "Vite"]
keywords: ["vite eslint"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A quick tutorial for setting up ESLint in Vite. We will make the case for using linting (as general programming concept) with ESLint (JavaScript tool for linting) for the following Vite + React project, because it catches errors early. However, you can do it for any other Vite template.

We will start with a basic App component which has an unused variable called `title`:

```javascript{3}
import * as React from 'react';

const title = 'React';

function App() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
```

If there is no Linting/ESLint setup, you will most likely not getting notified in your IDE or on your command line about the unused `title` variable. However, it would be good to catch such issues early, because sooner or later you may end up with lots of unused variables (and other code style issues) in your code base.

Now since we created the project with Vite, we can rely on Vite's plugins to integrate ESLint properly. On the command line, install the respective plugin:

```text
npm install vite-plugin-eslint --save-dev
```

Next we need to integrate the plugin in the project's configuration. Essentially Vite's configuration file, called *vite.config.js*, allows us to customize the development and build process of a Vite-based project. It gives us options such as setting the public path, configure plugins, and modify the build output. Additionally, the configuration file can be used to specify environment variables, set alias paths, and configure linting tools like ESLint. We will do the latter next by using the previously installed plugin:

```javascript{3,7}
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
});
```

Now Vite knows about ESLint, but we do not have the actual ESLint dependency installed yet. We will install it next on the command line:

```text
npm install eslint --save-dev
```

Last but not least, install one of ESLint's many standardized linting configurations for a React project on the command line:

```text
npm install eslint-config-react-app --save-dev
```

If you start your project on the command line again, you may see the following error showing up:

```text
[vite] Internal server error: No ESLint configuration found in
```

Therefore we will create an ESLint configuration file to define our linting rules:

```text
touch .eslintrc
```

While it is possible to define your own rules in this file, we will tell ESLint to use the previously installed standardized set of rules from the eslint-config-react-app dependency:

```text
{
  "extends": [
    "react-app"
  ]
}
```

The *.eslintrc* configuration file essentially specifies linting rules and settings for a project. It allows us to configure the behavior of ESLint, including specifying language version, setting rules, and using plugins. The configuration file can also extend (what we did) or overwrite rules from an extended configuration. Finally when starting the application on the command line, you will see the following warning popping up:

```text
3:7  warning  'title' is assigned a value but never used  no-unused-vars

✖ 1 problem (0 errors, 1 warning)
```

In your IDE (e.g. VSCode), you can also install the ESLint Extension (e.g. by Microsoft). Then you will see the following warning popping up in your file:

```text
const title: "React"
'title' is assigned a value but never used
```

If the warning is not showing in your IDE up after installing the extension, you may want to restart the IDE.

In conclusion, the use of ESLint in React projects is highly recommended for maintaining code quality and consistency. Since React is a widely used JavaScript library, there are a wide range of configurations like eslint-config-react-app (see `react-app` in ESLint configuration file) which you can take off the shelf. Using such a common sense configuration ensures that the written code meets specific coding standards.
