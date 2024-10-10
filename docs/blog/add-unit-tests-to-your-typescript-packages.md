# Add unit tests to your TypeScript packages

We can improvide confidence in our code by writing unit tests. Unit tests should resumble how the software is used.

There's a lot of different ways to test modern web applications. I couldn't begin to list all the options. I'm going to walk through how I would setup a Typescript package for unit testing.

We're going to start with unit testing a few simple methods then testing a React JSX component.

## Simple Methods

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

Let's add TypeScript as a dependency and a tsconfig.json file with the following configuration.

```shellsession
$ pnpm add --save-dev typescript
Packages: +1
+
Progress: resolved 277, reused 276, downloaded 1, added 1, done

devDependencies:
+ typescript 5.6.3

Done in 1s
```

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

Let's add some easy source code we can test.

::: code-group

```ts [src/add.ts]
const add = (a: number, b: number) => {
  return a + b;
};

export { add };
```

```ts [src/subtract.ts]
const subtract = (a: number, b: number) => {
  return a - b;
};

export { subtract };
```

:::

Let's add our tests

::: code-group

```ts [src/add.test.ts]
import { add } from "./add";

test("add: 7 + 9 should equal 16", () => {
  expect(add(7, 9)).toBe(16);
});
```

```ts [subtract.test.ts]
import { subtract } from "./subtract";

test("subtract: 5 - 2 should equal 3", () => {
  expect(subtract(5, 2)).toBe(3);
});
```

:::

Let's add a few more dev depenencies to take care of those squiggly red lines in our test files.

```shellsession
$ pnpm add --save-dev jest @types/jest ts-jest
```

**jest** is a JavaScript testing framework and **ts-jest** let's you use Jest in TypeScript projects.

Let's enable ts-jest

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

Before we can test we need to add jest to our test script in the package.json file

::: code-group

```json [package.json]
{
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1" // [!code --]
        "test": "jest" // [!code ++]
    }
}
```

:::

Now we can run our tests. Let's see if they pass.

```shellsession
$ pnpm test
jest

 PASS  src/subtract.test.ts
 PASS  src/add.test.ts

Test Suites: 2 passed, 2 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.666 s, estimated 1 s
Ran all test suites.
```

Success! We got our tests working.

## React JSX component

Next we're going to create a Button component that renders HTML button element, has a text prop and internal state variable **count** that can be incremented. But first we need to add a few dependencies:

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

**@testing-library/dom** is a package for testing DOM nodes

**@testing-library/jest-dom** provides a set of custom jest matchers that you can use to extend jest

**@testing-library/user-event** simulates events that would happen in the browser, like a click event

**jest-environment-jsdom** used by Jest to simulate a DOM environment as if you were in the browser

Update your jest.cofig.js file to use **jest-environment-jsdom**

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

Let's add our new Button component

::: code-group

```tsx [src/button.tsx]
import { useState } from "react";
import { add } from "./add";

type Props = {
  text: string;
};

const Button = ({ text }: Props) => {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <button
        data-testid="my-button"
        onClick={() => {
          setCount(add(count, 1));
        }}
      >
        {text}: {count}
      </button>
    </>
  );
};

export { Button };
```

:::

Let's add some tests for our Button component

::: code-group

```tsx [src/button.test.tsx]
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Button } from "./button";

describe("Button", () => {
  test("should render", () => {
    render(<Button text="Count" />);
    expect(screen.getByTestId("my-button")).toBeTruthy;
  });
  test("should show text Count", () => {
    render(<Button text="Count" />);
    expect(screen.getByTestId("my-button")).toHaveTextContent("Count");
  });
  test("should show text Number", () => {
    render(<Button text="Number" />);
    expect(screen.getByTestId("my-button")).toHaveTextContent("Number");
  });
  test("should increment when clicked", async () => {
    render(<Button text="Number" />);

    await userEvent.click(screen.getByTestId("my-button"));
    expect(screen.getByTestId("my-button")).toHaveTextContent("1");

    await userEvent.click(screen.getByTestId("my-button"));
    expect(screen.getByTestId("my-button")).toHaveTextContent("2");

    await userEvent.click(screen.getByTestId("my-button"));
    expect(screen.getByTestId("my-button")).toHaveTextContent("3");
  });
});
```

:::

Let's see if our tests pass

```shellsession
$ pnpm test
jest

 PASS  src/button.test.tsx
 PASS  src/subtract.test.ts
 PASS  src/add.test.ts

Test Suites: 3 passed, 3 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        1.334 s
Ran all test suites.
```

## Working example

I've created a working example repository at [unit-test-demo](git clone https://github.com/bpettijohn/unit-test-demo.git). Feel free to clone and review.

```shellsession
# clone working example
$ git clone https://github.com/bpettijohn/unit-test-demo.git
Cloning into 'unit-test-demo'...
remote: Enumerating objects: 14, done.
remote: Counting objects: 100% (14/14), done.
remote: Compressing objects: 100% (13/13), done.
remote: Total 14 (delta 0), reused 14 (delta 0), pack-reused 0 (from 0)
Receiving objects: 100% (14/14), 39.29 KiB | 914.00 KiB/s, done.

# change directories
$ cd unit-test-demo

# install depencencies
$ pnpm install
Lockfile is up to date, resolution step is skipped
Packages: +369
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 369, reused 369, downloaded 0, added 369, done

dependencies:
+ react 18.3.1
+ react-dom 18.3.1

devDependencies:
+ @testing-library/dom 10.4.0
+ @testing-library/jest-dom 6.5.0
+ @testing-library/react 16.0.1
+ @testing-library/user-event 14.5.2
+ @types/jest 29.5.13
+ @types/react 18.3.11
+ @types/react-dom 18.3.0
+ jest 29.7.0
+ jest-environment-jsdom 29.7.0
+ ts-jest 29.2.5
+ typescript 5.6.3

Done in 1.3s

# run tests
$ pnpm test
jest

 PASS  src/subtract.test.ts
 PASS  src/add.test.ts
 PASS  src/button.test.tsx

Test Suites: 3 passed, 3 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        1.636 s
Ran all test suites.
```
