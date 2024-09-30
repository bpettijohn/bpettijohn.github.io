# NPM Workspaces

npm workspaces are a great way to create modular reusable code in the javascript ecosystem. npm will automatically link packages in the node_modules folder. Previously you had to manually do that via [npm link](https://docs.npmjs.com/cli/v10/commands/npm-link).

Modular packages means your code is better organized, easier to test, and has fewer dependencies.

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

Workspaces in npm can be configured in the package.json

```json
{
  "name": "workspaces",
  "workspaces": ["packages/*", "apps/*"]
}
```
