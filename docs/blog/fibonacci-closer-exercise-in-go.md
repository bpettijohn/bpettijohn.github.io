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

All you need to know about the Fibonacci sequence is

The Fibonacci sequence is a sequence of numbers that looks like this: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144. The next value in the sequence is the sum of the two integers behind it. If Fibonacci was a cat, it's tail is the last two numbers following it.

The switch statement can be used instead of multiple if/else statements. It's easier to read and can be used without a condition.

```go
package main

import "fmt"

func fibonacci() func() int {
	var tail []int

	return func() int {
		switch {
		case len(tail) == 0:
			tail = append(tail, 0)
			return 0
		case len(tail) < 2:
			tail = append(tail, 1)
			return 1
		default:
			next := tail[0] + tail[1]
			tail[0] = tail[1]
			tail[1] = next
			return next
		}
	}
}

func main() {
	f := fibonacci()
	for i := 0; i < 10; i++ {
        fmt.Printf("%v, ", f())
	}
}
```

Output:

```shellsession
$ go run main.go
0, 1, 1, 2, 3, 5, 8, 13, 21, 34,
```
