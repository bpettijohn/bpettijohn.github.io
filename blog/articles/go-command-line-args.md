---
title: Go Command-Line arguments, flags, and subcommands
date: 2024-06-03
description: Programs can change their behavior based parameters, flags, or subcommands that are passed to them.
image: go
---

# Command Line

Programs can change their behavior based parameters, flags, or subcommands that are passed to them.

## Command Line Parameters

Parameters are passed using the **Args** array of the **os** package. The first item in the Args array is the full path of the program.

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	// slice Args so program path is not the first element
	ingredients := os.Args[1:]

	// access individual parameters using indexing
	firstIngredient := ingredients[0]

	fmt.Printf("The first ingredient added was: %v.\n", firstIngredient)

	fmt.Println("The remaining indredients are:")

	// iterate remaining ingredients, slicing out the first element
	for i := range ingredients[1:] {
		fmt.Println(ingredients[i])
	}
}
```

```shellsession
$ go build .
$ ./guacamole salt lime garlic onion
The first ingredient added was: salt.
The remaining indredients are:
salt
lime
garlic
```

## Command Line Flags

Go provides a flag package for declaring Int, Bool, and String flags. Each flag is defined with a name, default value, and description and returns a pointer that stores the value of the flag.

Call flag.Parse() to execute the command-line parsing once all flags are declared. Flags won't work without calling this method.

We can access the value in the pointer by derefering it with the \* character. Otherwise it will print the memory address of the pointer.

Parameters can still be passed with flags using flag.Args()

```go
package main

import (
	"flag"
	"fmt"
)

func main() {
	garlic := flag.Int("garlic", 0, "Garlic Cloves")
	salt := flag.Bool("salt", false, "Salt")
	lime := flag.Bool("lime", false, "Lime")
	onion := flag.String("onion", "", "Onion Type")

	flag.Parse() // don't forget this line
	fmt.Println("The indredients are:")

	if *garlic != 0 {
		fmt.Printf("garlic cloves: %d\n", *garlic)
	}

	if *salt {
		fmt.Println("salt")
	}

	if *lime {
		fmt.Println("lime")
	}

	if *onion != "" {
		fmt.Printf("onion: %v\n", *onion)
	}
}
```

Calling the program with the -help flag will show you the available flags, types, and descriptions.

```shellsession
$ go build .
$ ./guacamole -garlic=3 -salt -lime
The indredients are:
garlic cloves: 3
salt
lime
$ ./guacamole -salt -lime -onion=red
The indredients are:
salt
lime
onion: red
$ ./guacamole -help
Usage of ./guacamole:
  -garlic int
        Garlic Cloves
  -lime
        Lime
  -onion string
        Onion Type
  -salt
        Salt
```

## Command Line Subcommands

Instead of taking parameters or flags, programs can use subcommand. Each can use it's own unique set of flags. For simplicity i've added a onion flag to each but changed the default value for each.

Program's like git have many subcommands: clone, init, add, rebase, merge, restore, mv, show.

You can see which subcommand was use in `os.Args[1]`

```go
package main

import (
	"flag"
	"fmt"
	"os"
)

func main() {
	extraFlag := flag.NewFlagSet("extra", flag.ExitOnError)
	extraOnionType := extraFlag.String("onion", "red", "enable")

	normalFlag := flag.NewFlagSet("normal", flag.ExitOnError)
	normalOnionType := normalFlag.String("onion", "red", "enable")

	noneFlag := flag.NewFlagSet("none", flag.ExitOnError)
	noneOnionType := noneFlag.String("onion", "red", "enable")

	if len(os.Args) < 2 {
		fmt.Println("expected 'extra' or 'normal' or 'none' subcommands")
		os.Exit(1)
	}

	fmt.Println("The indredients are:")

	switch os.Args[1] {
	case "extra":
		extraFlag.Parse(os.Args[2:])
		fmt.Println("garlic cloves: 6")
		fmt.Printf("onion: %v\n", *extraOnionType)
	case "normal":
		normalFlag.Parse(os.Args[2:])
		fmt.Println("garlic cloves: 3")
		fmt.Printf("onion: %v\n", *normalOnionType)
	case "none":
		noneFlag.Parse(os.Args[2:])
		fmt.Printf("onion: %v\n", *noneOnionType)
	}

	fmt.Println("salt")
	fmt.Println("lime")
}
```

```shellsession
$ go build .
$ ./guacamole extra
The indredients are:
garlic cloves: 6
onion: red
salt
lime
$ ./guacamole normal -onion=yellow
The indredients are:
garlic cloves: 3
onion: yellow
salt
lime
$ ./guacamole none -onion=white
The indredients are:
onion: white
salt
lime
```
