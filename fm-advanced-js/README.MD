## Scope

### Scope and the JavaScript Compiler
Scope is where you go to look for things. The ES5 version only has function scope.

Example of code :
```js
var foo = "bar";

function bar(){
  var foo = "baz";
}

function baz(foo){
  foo  = "bam";
  bam = "yay";
}
```

Js is compile every single time that it run. It do :
* Do one pass to the code.
* Do a final pass to execute the code.

Important stuff that compiler phase do:
* <b>First pass</b>: Finding declarations of variables and function and put it into the appropriate scope.
* <b>Second pass</b>: After it has been compile, find out where it will be executed.

To the compiler, this is not a single statement:
```js
var foo = "bar";
```

This is done in two steps :

1. Declaration operation : `var foo`
  1. I see a variable declaration for an identifier foo, witch current scope i am ?
  2. The answer is the global scope.
  3. Ok i want register the foo identifier into my current scope (the global scope)
2. Initialisation operation : `foo = "bar"`

### Execution phase
In the execution phase, they is no `var` anymore. What is left is the assignement in the execution phase.

```js
foo = "bar"
```
If the code have two declaration with var, they ignore the var because it does not exist in the execution phase.

```js
var foo = ...
var foo = ...
```

To a function, that recursively decend into the function and compile inside the function, it look for declaration `var foo` and put into the scope of function bar.
```js
function bar(){
	var foo = "baz";
}
```
### Left Hand Side (LHS) and Right Hand Side (HRS)
```js
foo = "bar";
```

* <b>LHS</b> : left hand side (target)
* <b>RHS</b> : right hand side (source)

In that case, `foo` is LHS reference and `"bar"` is the RHS of an assignement (=)

> ** NOTE : when we pass variable to a function call they is an assignement without the = (target, source)



### Execution of function Code

Hey scope of bar function, do you have foo identifier in your table ?
yes, so it execute "baz"

```js
function bar(){
	var foo = "baz";
}
```


### Leakage of global variable

In that function exmaple :

```js
function baz(foo){
	var foo  = "bam";
	bam = "yay";
}
```

the chat of the compiler will be like :

1. Hey scope of baz do you have foo declaration ?
  * yes so execute "bam"

2. Hey scope of baz do you have bam declaration ?
  * No Strict Mode :
    * No : Hey global scope i have `lhs` reference for bam have you ever heard of them ?
      * Yes : i just created for you (because not in strict mode)
        * We have leakage of global variable.
        * If it was an rhs, it will be different.

  * Strict mode :
    * No : in strict mode we get a state of undeclared variable
      * we are unable to find `lhs` in each scope.





	Undefined is not = of undeclared.
		Undeclared : call when is no present declaration in any of the scope we have access to.
		Undefined :  he was declared but it unitialize
			Undefined is a proper value



/*
	when we call rhs that is not found in the scope.
		No identifier in any scope
		reference error for both strict and unstrict.

	In non strict mode :
		Reference error result from unfufiled or undeclared rhs reference.
	In strict mode :
		They both result of reference error.
*/


// Function declaration vs Function expression.
var foo = function bar() {
	var foo = "baz";

	function baz(foo) {
		foo = bar;
		foo;  // function
	}
	baz();
};

foo();
bar(); // Error !

// function expression (anonymous function expression)
var foo = function bar() {
/*
	That bar name does not declared in to the global scope.
		the name of the function expression is enclosed in it is own scope.
		the name bar is accessible inside itself.
*/

// Function declaration
function baz(){ ...
/*
	The first word in the statement
*/

// Why use function expression with name vs anonymous function

/*
	1) You can access inside the function and doing recursive.
	2) Is useful for debugging because the statck trace error give the name of the function.
	3) Give it the name like handeler => it handeling some event, is self documented code.
		More

*/

// eval key word

/*
	It screw up the optimisation of lexical.
	It run slower.
	but in strict mode, it create a new scope so
		It run faster.
		More optimized code.
	Don't use eval unless you have no choise.
