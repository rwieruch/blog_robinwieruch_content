---
title: "Migrate to Vite from Create React App (CRA)"
description: "How to migrate to Vite from Create React App (CRA) with environment variables, testing, SVG, ESLint, TypeScript ..."
date: "2023-03-29T09:52:46+02:00"
categories: ["React", "Vite"]
keywords: ["vite"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A quick migration guide to Vite from Create React App, because (apart from Next.js) Vite is the natural successor of CRA for creating a [modern React application as SPA](/react-starter/).

First, install Vite and all React related libraries (here: Vite's React Plugin) as development dependencies:

```sh
npm install vite @vitejs/plugin-react --save-dev
```

Second, uninstall create-react-app's dependency:

```sh
npm uninstall react-scripts
```

Third, adjust your *package.json* to use the following new scripts:

```json
"scripts": {
  "start": "vite",
  "build": "vite build",
  "serve": "vite preview"
},
```

Fourth, rename all extensions of files which are using JSX from ".js" to ".jsx", because Vite is explicit with file extensions. If you are using TypeScript, perform the same task from ".ts" to ".tsx". The following demonstrates it with the App.js file on the command line:

```sh
mv src/App.js src/App.jsx
mv src/index.js src/index.jsx
```
Or 

to renames all ".js" files into "jsx" at once you can use this command. This will change all ".js" extensions into ".jsx": 

```sh
find ./src -name "*.js" -exec sh -c 'mv "$0" "${0%.js}.jsx"' {} \;
```

If you are not renaming all your React/JSX related files this way, essentially all files that are using angle brackets, you may get the following or a similar error:

* The JSX syntax extension is not currently enabled
* The esbuild loader for this file is currently set to "js" but it must be set to "jsx" to be able to parse JSX syntax. You can use "loader: { '.js': 'jsx' }" to do that.

Fifth, create a vite.config.js file in your Vite + React project's root directory:

```sh
touch vite.config.js
```

And add the following implementation details to it. Essentially we want to keep the same output directory for the build as we had before with create-react-app. In addition, we want to use Vite's React Plugin:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react()],
  };
});
```

Sixth, move the *public/index.html* into the project's root folder, because Vite expects it there:

```sh
mv public/index.html .
```

Afterward, remove all `%PUBLIC_URL%` occurrences in the *index.html* file.

```html
- <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
+ <link rel="icon" href="/favicon.ico" />

<!-- do this for all occurrences  -->
```

Last, link the *src/index.js* file in your moved *index.html* file the following way:

```html{3}
<body>
  <div id="root"></div>
  <script type="module" src="/src/index.jsx"></script>
</body>
```

That's it. If you have been using a create-react-app project without any further configuration (e.g. a fresh create-react-app installation), you are ready to start your new Vite based React application with `npm start`.

However, there may be additional steps needed which I want to outline next in case your create-react-app uses more configurations.

<Divider />

* If you want to keep using ESLint in Vite as you have used it in create-react-app, follow this [Vite + React + ESLint tutorial](/vite-eslint/).
* If you want to keep using TypeScript in Vite as you have used it in create-react-app, follow this [Vite + React + TypeScript tutorial](/vite-typescript/). Optionally follow this [ESLint + Prettier](/prettier-eslint/) tutorial afterward.
* If you want to keep using react-testing-library in Vite as you have used it in create-react-app, follow this [Vite + React + React Testing Library tutorial](/vitest-react-testing-library/).
* If you are using create-react-app's (CRA's) environment variables, you need to replace all `REACT_APP` occurrences with `VITE`.
* If you are using `process.env` in your React project, replace it with `import.meta.env`.

## Troubleshooting create-react-app to Vite migration ...

* If you get `ReferenceError: process is not defined` from a library, check if it runs with the following [workaround](https://github.com/vitejs/vite/issues/1973#issuecomment-787571499):

```javascript{6-9}
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    // https://github.com/vitejs/vite/issues/1973#issuecomment-787571499
    define: {
      'process.env': {},
    },
    build: {
      outDir: 'build',
    },
    plugins: [react()],
  };
});
```

* If you want to keep using SVGs in your Vite project, install `vite-plugin-svgr` as development dependency. Then include it in Vite's configuration file:

```javascript{3,12-13,18-19}
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [
      react(),
      // svgr options: https://react-svgr.com/docs/options/
      svgr({ svgrOptions: { icon: true } }),
    ],
  };
});

// which allows you to import SVGs as React components
// import { ReactComponent as MyIcon } from './my-icon.svg';
```

* If you want to use alias imports in your Vite project, define them the following way:

```javascript{1,8-12,20-21}
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'build',
    },
    plugins: [react()],
  };
});

// which allows you to import from folders under the /src folder
// import Button from '~/components/Button';
```

* If you have to support [Emotion](https://www.npmjs.com/package/emotion) in your Vite project:

```javascript{10-15}
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
    ],
  };
});
```

* If you want to open the browser upon server start, use the following Vite config:

```javascript{6-8}
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    server: {
      open: true,
    },
    build: {
      outDir: 'build',
    },
    plugins: [react()],
  };
});
```

That's essentially it from my side. If you happen to know any other essential troubleshooting hints, let me know!
