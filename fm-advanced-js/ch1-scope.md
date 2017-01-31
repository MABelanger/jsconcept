# Scope
## Scope and the JavaScript Compiler
Scope is where you go to look for things. The current version of JavaScript only has function scope. Kyle uses the concept of scope to help understand the way the JavaScript compiler works.

## Compiling Function Scope
As the JavaScript compiler enters a function, it will begin looking for declaration inside that scope and recursively process them. Once all scopes have been compiled, the execution phase can begin.

## Execution of Function Code
As the execution phase continues within function scope, the same LHR and RHR operations are applied. Things get a little interesting with undeclared variables. They are automatically declared on the global scope.

## Scope and Execution Example
Kyle walks the audience through another example of how the JavaScript compiler will declare and execute variables and functions. This example includes a nested function which creates a nested scope.

## Function Declarations, Function Expressions, and Block Scope
A function declaration occurs when the function keyword is the first word of the statement. Functions assigned to a variable become function expressions. Kyle explains these difference while also describing why it is bad to use anonymous functions.

## Lexical Scope
There are two models of scope programming languages typically use: Lexical Scope and Dynamic Scope. Lexical scope means "compile-time scope". Kyle uses a building metaphor to help explain Lexical Scope.

## Cheating Lexical Scope: eval
As with most things in JavaScript, there are ways to cheat. Kyle demonstrates how the eval keyword can be used to cheat Lexical Scope rules. He also describes issues that arise when using the with keyword.

## IIFE Pattern
The Immediately Invoked Function Expressions (IIFE) Pattern is a technique used to hide scope. It involves wrapping code inside a function that is immediately called. This allows developers to create object in their own scope without polluting the outer scope.
- http://benalman.com/news/2010/11/immediately-invoked-function-expression/

## IIFE Pattern Questions
Before discussing the let keyword, Kyle fields a few questions about syntax style with the IIFE pattern.

## Block Scope in ES6
In ECMAScript 6, the "let" keyword will implicitly create a block-level scope and add declarations to that scope rather than the enclosing function. The most common use-case for the let keyword is for loops.

## Problems with let keyword
Kyle describes a few issues he has with the let keyword. Some of his issues are stylistic, but others are related to common variable functionality like hoisting. Kyle discusses his solutions for these issues and a tool he created to help.
- http://github.com/getify/let-er

## Dynamic Scope
Kyle briefly describes dynamic scope as it relates to Lexical scope. This is a theoretical example since it doesn't actually exist in JavaScript.

## zz: Scope
Kyle presents a quiz about what was covered in the Scope section of this course and reviews the answers with the audience.

## Hoisting
Hoisting is the moving of declarations to the top of the scope block during the compiling phase. Hoisting applies to both variable declarations and functions. Kyle spends some time explaining why hoisting exists in JavaScript and the gotchas surrounding it.

## this Keyword
Every function, while it's executing, has a reference to its current execution context called "this". This reference is JavaScript's version of dynamic scope. Kyle dives into an explanation of the this keyword and it's relationship to the call site of the function.

## Binding Confusion
Attempting to force the this keyword into a different lexical scope can lead to some binding confusion. Kyle pulls an example he found on Stack Overflow around this confusion to further demystify usage of the this keyword.

## Explicit Binding
The explicit binding rule allows developers to use the call method and pass an explicit reference for the this binding. Explicit bindings can also be set using the apply method. Kyle explains explicit bindings and also detours into a discussion about a technique he calls hard binding. Hard binding was actually added as of ES5 in the form of the bind method.

## The new keyword
Regardless of what you've been told, JavaScript does not have classes and the new keyword does not do any instantiation. Kyle explains the functionality of the new keyword and the affects it has when placed in front of a function call.
