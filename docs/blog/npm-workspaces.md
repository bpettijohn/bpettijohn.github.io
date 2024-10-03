# NPM Workspaces

npm workspaces are a great way to create modular reusable code in the javascript ecosystem. npm will automatically link packages in the node_modules folder. Previously you had to manually do that via [npm link](https://docs.npmjs.com/cli/v10/commands/npm-link).

Modular packages means your code is better organized, smaller, easier to test, and have fewer dependencies.

Let's start by adding our workspaces to a **package.json** at the root of the project directory.

```json
{
  "name": "workspaces",
  "workspaces": ["packages/*", "apps/*"]
}
```

Alright, let's create our first package called counter.

```shellsession
$ mkdir packages
$ mkdir packages/counter
$ cd packages/counter

$ npm init --scope=@ben --yes
Wrote to /workspaces/packages/counter/package.json:
{
  "name": "@ben/counter",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}
```

[Scope](https://docs.npmjs.com/cli/v10/using-npm/scope) is a way of grouping related packages together. A lot npm features give you the ability to make changes are for scoped packages.

Next, let's add typescript as a dev dependency and initialize it.

```shellsession
$ npm i -D typescript
added 1 package, and audited 202 packages in 604ms

41 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

$ npx tsc --init
Created a new tsconfig.json with:

  target: es2016
  module: commonjs
  strict: true
  esModuleInterop: true
  skipLibCheck: true
  forceConsistentCasingInFileNames: true

You can learn more at https://aka.ms/tsconfig
```

Let's add some source code.

```shellsession
$ mkdir src
$ touch src/increment.ts
$ touch src/decrement.ts
```

```ts
// src/increment.ts
const increment = (a: number): number => a + 1;

export { increment };
```

```ts
// src/decrement.ts
const decrement = (a: number): number => a - 1;

export { decrement };
```

Next let's update our exports in the package.json file.

```json
{
  "name": "@ben/counter",
  "exports": {
    "./increment": {
      "default": "./src/increment.ts"
    },
    "./decrement": {
      "default": "./src/decrement.ts"
    }
  },
  "devDependencies": {
    "typescript": "^5.6.2"
  }
}
```

Being explicit with package exports will give your code editor better auto-completion and prevent barrel files. Barrel files are files that re-export other files, creating one entrypoint for the entire package. While they might appear convenient, they're difficult for compilers and bundlers to handle and can quickly lead to performance problems.

Avoiding barrel files: Barrel files are files that re-export other files in the same package, creating one entrypoint for the entire package. While they might appear convenient, they're difficult for compilers and bundlers to handle and can quickly lead to performance problems.

More powerful features: exports also has other powerful features compared to the main field like Conditional Exports. In general, we recommend using exports over main whenever possible as it is the more modern option.

IDE autocompletion: By specifying the entrypoints for your package using exports, you can ensure that your code editor can provide auto-completion for the package's exports.

Let's create an app called calculator that uses the counter package.

```shellsession
mkdir apps
cd apps
npm create vite@latest calculator -- --template react-ts

> npx
> create-vite calculator --template react-ts


Scaffolding project in /workspaces/apps/calculator...

Done. Now run:

  cd test
  npm install
  npm run dev

```
