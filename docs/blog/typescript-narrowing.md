# TypeScript Narrowing

TypeScript narrowing is the process of refining types to more specific types within conditional blocks. The TypeScript compiler tracks the flow of your code and narrows types based on type guards, making your code more type-safe and reducing the need for type assertions.

## Type Guards

The most common way to narrow types is using type guards like `typeof`, `instanceof`, and `in` operators.

### Using `typeof`

```ts
function printValue(value: string | number) {
  if (typeof value === "string") {
    // TypeScript knows value is a string here
    console.log(value.toUpperCase());
  } else {
    // TypeScript knows value is a number here
    console.log(value.toFixed(2));
  }
}
```

### Using `instanceof`

```ts
class Dog {
  bark() {
    console.log("Woof!");
  }
}

class Cat {
  meow() {
    console.log("Meow!");
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // TypeScript knows it's a Dog
  } else {
    animal.meow(); // TypeScript knows it's a Cat
  }
}
```

### Using the `in` operator

```ts
interface Bird {
  fly: () => void;
  layEggs: () => void;
}

interface Fish {
  swim: () => void;
  layEggs: () => void;
}

function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    animal.fly(); // TypeScript knows it's a Bird
  } else {
    animal.swim(); // TypeScript knows it's a Fish
  }
}
```

## Truthiness Narrowing

TypeScript can narrow types based on truthiness checks.

```ts
function printName(name: string | null | undefined) {
  if (name) {
    // TypeScript knows name is string here
    console.log(name.toUpperCase());
  } else {
    console.log("No name provided");
  }
}
```

## Discriminated Unions

Using a common property (discriminant) to narrow union types is a powerful pattern.

```ts
interface Success {
  status: "success";
  data: string;
}

interface Error {
  status: "error";
  message: string;
}

type Response = Success | Error;

function handleResponse(response: Response) {
  if (response.status === "success") {
    // TypeScript knows it's Success
    console.log(response.data);
  } else {
    // TypeScript knows it's Error
    console.log(response.message);
  }
}
```

## Custom Type Guards

You can create your own type guard functions using the `is` keyword.

```ts
interface User {
  name: string;
  email: string;
}

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "name" in obj &&
    "email" in obj &&
    typeof (obj as User).name === "string" &&
    typeof (obj as User).email === "string"
  );
}

function greetUser(data: unknown) {
  if (isUser(data)) {
    // TypeScript knows data is User here
    console.log(`Hello, ${data.name}!`);
  } else {
    console.log("Invalid user data");
  }
}
```

## Why Narrowing Matters

Narrowing helps catch bugs at compile time, provides better autocomplete in your editor, and makes your code more maintainable. By leveraging TypeScript's narrowing capabilities, you can write safer code without sacrificing developer experience.
