# Async Patterns

## Callbacks
Callbacks are integral to JavaScript, but can lead to many problems. They allow for asynchronicity to occur, but in the process, create an inversion of control where developers are handing off control of their application to another area or mechanism.

## Solving Callback Problems
Kyle demonstrates a few techniques developers have used to get around callback issues. For example, providing separate callbacks in the case of success and failure functionality. Most of these solutions only lead to more inversion of control.

## Generators
Generators are coming in ES6. A generator is a new type of function that can be paused during execution and resumed at a later time. The are paused using the yield keyword.

## Promises
Kyle explains how promises are a way to subscribe to the completion of a task. For example, when a function is called, a promise will let you know when the function completes. Kyle demonstrates jQuery's implementation of promises and compares it to the native implementation in ES6.
