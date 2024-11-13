# Fibonacci closure exercise in Go

A closure is a function that uses variables outside its body.

Most examples i've seen have a function with state return a callback function that uses the state.

Let's see a simple example

```go
import "fmt"

func counter() func() int {
	sum := 0
	return func() int {
		sum += 1
		return sum
	}
}

func main() {
	count := counter()
	for i := 0; i < 10; i++ {
		fmt.Printf("%v, ", count())
	}
}
```

Output:

```shellsession
$ go run main.go
1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
```

To solve the [fibonacci exercise](https://go.dev/tour/moretypes/26) on go.dev we can use a closure and switch statement.

The Fibonacci sequence is a sequence of numbers that looks like this: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144. The next value in the sequence is the sum of the two integers behind it. We can use a closure to track the state of the sequence for every iteration.

```go
package main

import "fmt"

func fibonacci() func() int {
	x, y := 0, 1

	return func() int {
		a := x
		x, y = y, x+y
		return a
	}
}

func main() {
	fib := fibonacci()
	for i := 0; i < 10; i++ {
		fmt.Printf("%v, ", fib())
	}
}
```

Output:

```shellsession
$ go run main.go
0, 1, 1, 2, 3, 5, 8, 13, 21, 34,
```
