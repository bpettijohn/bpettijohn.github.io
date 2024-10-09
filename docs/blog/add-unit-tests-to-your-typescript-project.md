# Add unit tests to your Typescript project

Let's initialize a new project using [pnpm](https://pnpm.io/)

```shellsession
$ pnpm init
Wrote to /unit-test-demo/package.json

{
  "name": "testing",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Let's create a tsconfig.json file

::: code-group

```json [tsconfig.json]
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

:::

## Methods

Let's add a few simple methods

::: code-group

```ts [add.ts]
const add = (a: number, b: number) => {
  return a + b;
};

export { add };
```

```ts [subtract.ts]
const subtract = (a: number, b: number) => {
  return a - b;
};

export { subtract };
```

:::

Tests

::: code-group

```ts [add.test.ts]
import { add } from "./add";

test("adds 7 + 9 to equal 16", () => {
  expect(add(7, 9)).toBe(16);
});
```

```ts [subtract.test.ts]
import { subtract } from "./subtract";

test("adds 1 + 2 to equal 3", () => {
  expect(subtract(5, 2)).toBe(3);
});
```

:::

Let's add some libraries inorder to test

```shellsession
$ pnpm add --save-dev jest @types/jest ts-jest
```

**jest** is a JavaScript testing framework and **ts-jest** let's you use Jest in TypeScript projects.

Let's add a config for ts-jest

```shellsession
$ npx ts-jest config:init
```

which will create a jest.config.js file for us

::: code-group

```js [jest.config.js]
/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};
```

:::

No let's run our tests

```shellsession
$ pnpm test

testing@1.0.0 test /Users/bpettijohn/dev/sandbox/testing
jest

 PASS  src/subtract.test.ts
 PASS  src/add.test.ts

Test Suites: **2 passed**, 2 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.666 s, estimated 1 s
Ran all test suites.
```

Sweet! We got our tests working.

Next we're going to create a Button component that renders HTML button element, has text that is passed to it through props and has a count variable that can be increment. But first we need to add a few dependencies:

```shellsession
$ pnpm add react react-dom
$ pnpm add --save-dev @testing-library/react \
    @testing-library/dom \
    @testing-library/jest-dom \
    @testing-library/user-event \
    jest-environment-jsdom \
    @types/react \
    @types/react-dom
```

The [@testing-library](https://testing-library.com/) is a family of packages that help you test UI components.

**@testing-library/react** is a package for testing React components

**@testing-library/react** is a package for testing DOM nodes

**@testing-library/jest-dom** provides a set of custom jest matchers that you can use to extend jest

**@testing-library/user-event** simulates events that would happen in the browser, like a click event

**jest-environment-jsdom** used by Jest to simulate a DOM environment as if you were in the browser

Update your jest.cofig.js file to use jest-environment-jsdom

::: code-group

```js [jest.config.js]
/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};
```

:::
