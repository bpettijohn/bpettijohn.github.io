# What is a barrel file

A barrel file is a file that re-exports from other files. It is usually a `index.ts` or `index.js` that looks like this:

```ts filename="index.ts"
import * from 'add';
export * from 'subtract';
```

It's purpose is to provide a single entrypoint for a package.

```ts filename="calculator.ts"
import { add, subtract } from "@abc/math";
```

instead of

```ts filename="calculator.ts"
import { add } from "@abc/calculator/add";
import { subtract } from "@abc/calculator/subtract";
```

There are a few issues with barrel files:

Circular imports

During development you might have a component that imports from a local barrel file creating a circular import. This could happen when you auto import in your editor. I would recommend ESLint plugin [import/no-cycle](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-cycle.md) if your project has issues with dependency cycles.

Performance issues

You might have a barrel file that
&nbsp;&nbsp;imports from another barrel file that
&nbsp;&nbsp;&nbsp;&nbsp;imports from another barrel file that
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;imports from 3rd party lib that has a lot of modules.

JavaScript will load every module inside the index.ts synchronously. Imagine a scenario where a package only needs to import one component but gets everything instead. Like drinking out of a firehose. Unit tests will crawl because they're not concerned with bundle optimization. Removing barrels will minimize bundle size and improve performance.

Solution

The export field in the `package.json` file allows you to define entry points of a package. It is recommended to use `export` over `main`. Defining entrypoints for your package exports will ensure your editor can provide auto-completion.

```json filename="package.json"
{
  "name": "@abc/counter",
  "exports": {
    "./add": {
      "default": "./src/add.ts"
    },
    "./subtract": {
      "default": "./src/subtract.ts"
    }
  },
  "devDependencies": {
    "typescript": "^5.6.2"
  }
}
```
