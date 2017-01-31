# Scope

- [Scope and the JavaScript Compiler](#scope-and-the-javascript-compiler)
  * [Execution phase](#execution-phase)
- [Compiling Function Scope](#compiling-function-scope)
- [Execution of Function Code](#execution-of-function-code)
  * [Leakage of global variable](#leakage-of-global-variable)
  * [Undefined vs Undeclared](#undefined-vs-undeclared)
- [Scope and Execution Example](#scope-and-execution-example)
- [Function Declarations, Function Expressions, and Block Scope](#function-declarations--function-expressions--and-block-scope)
- [Lexical Scope](#lexical-scope)
- [Cheating Lexical Scope: eval](#cheating-lexical-scope--eval)
  * [eval key word](#eval-key-word)
- [IIFE Pattern](#iife-pattern)
- [Block Scope in ES6](#block-scope-in-es6)
- [Problems with let keyword](#problems-with-let-keyword)
- [Dynamic Scope TODO](#dynamic-scope-todo)
- [Hoisting](#hoisting)
- [this Keyword](#this-keyword)
  * [4 binding rules](#4-binding-rules)
- [The new keyword](#the-new-keyword)

## Scope and the JavaScript Compiler
Scope is where you go to look for things. The ES5 version only has function scope so the smallest atomic version of scope is function.

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


## Compiling Function Scope
As the JavaScript compiler enters a function, it will begin looking for declaration inside that scope and recursively process them. Once all scopes have been compiled, the execution phase can begin.

Hey scope of bar function, do you have foo identifier in your table ?
yes, so it execute "baz"

```js
function bar(){
	var foo = "baz";
}
```

## Execution of Function Code
As the execution phase continues within function scope, the same LHR and RHR operations are applied. Things get a little interesting with undeclared variables. They are automatically declared on the global scope.

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
  * <b>No Strict Mode</b> :
    * No : Hey global scope, i have `LHS` reference for `bam` have you ever heard of them ?
      * Yes : i just created for you (because not in strict mode)

  * <b>Strict mode</b> :
    * No : We get a state of undeclared variable
      * we are unable to find `LHS` in both `function scope` and `global scope`.

In this case, in `non strict mode`, we have leakage of global variable.

### Undefined vs Undeclared
`undefined` is not equal of `undeclared`.
* <b>Undeclared</b> : when is no present declaration in any of the scope we have access to.
* <b>Undefined</b> :  when the variable was declared but not initialize, by default is set to Undefined. Undefined is a value like null or NaN.


when we call rhs that is not found in the scope. No identifier in any scope, reference error for both strict and unstrict mode.

```js
var declared;
declared = notDeclared; // Uncaught ReferenceError: notDeclared is not defined
```

```js
"use strict";
var declared;
declared = notDeclared; // Uncaught ReferenceError: notDeclared is not defined
```

## Scope and Execution Example
Kyle walks the audience through another example of how the JavaScript compiler will declare and execute variables and functions. This example includes a nested function which creates a nested scope.

## Function Declarations, Function Expressions, and Block Scope
A function declaration occurs when the function keyword is the first word of the statement. Functions assigned to a variable become function expressions.

<b>Function declaration</b> : defines a function with the specified parameters.
```js
function name() {

}
```

<b>Function expression</b> : The function keyword can be used to define a function inside an expression. The `[name]` is optional. Function expressions are not hoisted, unlike function declarations. You can't use function expressions before you declare them

```js
var myFunction = function [name]() {

};
```

Why use `function expression` with name vs `anonymous function`
  1. You can access inside the function and doing recursive.
  2. Is useful for debugging because the statck trace error give the name of the function.
  3. Give it the name like handeler => it handeling some event, is self documented code.



## Lexical Scope
There are two models of scope programming languages typically use: Lexical Scope and Dynamic Scope. Lexical scope means "compile-time scope".

Lexical scope is an other time decision.

Execution context is how the function is call when is call

## Cheating Lexical Scope: eval
As with most things in JavaScript, there are ways to cheat. eval keyword can be used to cheat Lexical Scope rules.

### eval key word
1. It screw up the optimisation of lexical.
2. It run slower.
3. but in strict mode, it create a new scope so it can run faster.
  * More optimized code.
4. Don't use eval unless you have no choise.

## IIFE Pattern
The `Immediately Invoked Function Expressions (IIFE)` Pattern is a technique used to hide scope. It involves wrapping code inside a function that is immediately called. This allows developers to create object in their own scope without polluting the outer scope.
- http://benalman.com/news/2010/11/immediately-invoked-function-expression/

// immediately invoked function expression (IIFE)
```js
var foo = "foo";

(function(){
	var foo = "foo2";
	console.log(foo);
})();
```

## IIFE Pattern Questions
Before discussing the let keyword, Kyle fields a few questions about syntax style with the IIFE pattern.

## Block Scope in ES6
In ECMAScript 6, the "let" keyword will implicitly create a block-level scope and add declarations to that scope rather than the enclosing function. The most common use-case for the let keyword is for loops.

So let exist only insde a block like for loop or if statement... basiquely any pair of {} let is the new var and encourage to do find and replace each var per let

Explicit block that can be used :

```js
function foo(bar) {
		let (baz = bar) {
			console.log(baz); // "bar"
		}
	console.log(baz); // Error
}
```

## Problems with let keyword
Kyle describes a few issues he has with the let keyword. Some of his issues are stylistic, but others are related to common variable functionality like hoisting. Kyle discusses his solutions for these issues and a tool he created to help.
- http://github.com/getify/let-er

```js
function foo(bar) {
	if (bar) {
		let baz = bar;
		if (baz) {
			let bam = baz;
		}
		console.log(bam); // Error
	}
	console.log(baz); // Error
}
```

## Dynamic Scope TODO
Dynamic scope as it relates to Lexical scope. This is a theoretical example since it doesn't actually exist in JavaScript.

## Hoisting
Hoisting is the moving of declarations to the top of the scope block during the compiling phase. Hoisting applies to both variable declarations and functions.

### Hoisting
Hoisting is moving var to the top during the compiled phase. So before compiled phase :

```js
a; // ?
b; // ?
var a = b;
var b = 2;
a; // ?
b; // 2
```

After compiled phase :

```js
var a;
var b;
a; // ?
b; // ?
a = b;
b = 2;
a; // ?
b; // 2
```
> * `LHS stuff` : is happening during the compile time (var ...)
> * `RHS stuff` : is happening during the execution time ( = 2 ...)

> ** Note : Mutual recursion will be impossible without hoisting. like in C, the header files is manual hoisting to the top.

### The var statement
The var statement get split into two parts :
  1. <b>The declaration part</b>:  gets hoisted to the top of the function and initializing with undefined.
	2. <b>The initialization part</b>: turns into an ordinary assignment.

```js
function foo() {
	...
	var myVar = 0,
	    myOtherVar;
}
```

Expand into:

```js
function foo() {
	var myVar      = undefined,
	    myOtherVar = undefined;
	...
	myVar = 0;
}
```

So declare all your variables on the top of the function and declare all your function before call them. Always use let statement if possible to do block scope.

### The let statement

`let` don't hoist :
```js
console.log(txt); // ReferenceError: txt is not defined
let txt = "hello";
```

### function hoisting

function declaration get hoisted:

```js
console.log( getHello() ); // hello

function getHello() {
	return "hello";
}
```

function expression did not get hoisted:

```js
console.log( getHello() ); // TypeError: getHello is not a function

var getHello = function() {
	return "hello";
}
```

## this Keyword
Every function, while it's executing, has a reference to its current execution context called "this". This reference is JavaScript's version of dynamic scope. The this keyword and it's relationship to the call site of the function.

```js
func1(); // <- the call site
```

The this keyword can be metaphoricly compare to the address of the building.
Before check on each floor if the variable is declared (scope), you have to know the address of the building.


### 4 binding rules

#### Default binding rule
  * If you are in strict mode, default to this keword to undefind value.
  * If you are not in strict mode, default to this keword to the global object.
  * if is a normal call like :
  * func1(); // <- the default binding rule apply


#### Implicit binding rule
  * All stuff inside the object (variables) is apply to this.

```js
function foo() {
	console.log(this.bar);
}

var bar = "bar1";
var o2 = { bar: "bar2", foo:foo }

foo(); // (bar1) <- default binding
o2.foo(); // (bar2) <- implicit binding rule
```

In strict mode, we get an error :
```js
'use strict';
function foo() {
	console.log(this.bar);
}

var bar = "bar1";
var o2 = { bar: "bar2", foo:foo }

o2.foo(); // (bar2) <- implicit binding rule
foo(); // Error ! Cannot read property 'bar' of undefined
```

#### Explicit Binding
The explicit binding rule allows developers to use the call method and pass an explicit reference for the this binding. Explicit bindings can also be set using the apply method.

The explicit binding rule :

```js
function foo() {
	console.log(this.bar);
}

var obj = { bar: "bar2" };

foo.call(obj); // (bar2) <- assign obj to this.
foo.apply(obj) // same thing...
```


#### Hard binding rule
Hard binding was actually added as of ES5 in the form of the bind method.
use .bind()


### Order (this determination)
1. Was the function called with new ?
2. Was the function called with call or apply specifying an explicit this
3. Was the function called via containing/owning objet (context) ?
4. DeFAULT: global object (expect strict mode)

## The new keyword
Regardless of what you've been told, JavaScript does not have classes and the new keyword does not do any instantiation.

```js
function foo() {
	this.baz = "baz";
	console.log(this.bar + " "  + baz);
}

var bar = "bar";
var baz = new foo();
```

4 things that new keword do infront of the function call:
  1. Create a brand new object is created.
  2. The object is linked to a different object.
  3. That new object get bound to the this keyword for the purpose of the function call.
  4. If that function do not return any thing, it will implicitly put a return `this`

```js
function foo() {
	this.baz = "baz";
	console.log(this.bar + " "  + baz);
	return this; // <- with the new keyword.
}
```

## quiz
1. What type of scoping rule(s) does JavaScript have ? Exceptions ?
  * Lexical scope.
  * Exception : eval and with keyword

2. What are the different ways you can create a new scope ?
  * function
  * catch block
  * {} with let keword

3. What's the difference between undeclared and undefined ?
  * <b>undefined</b> : is a value but does not currently have value, empty place holder. But if you have undefined value that mean that you definitely was a declared variable.
  * <b>undeclared</b> : is never been declared in the scope
