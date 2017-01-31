# Async Patterns

## Callbacks
Callbacks are integral to JavaScript, but can lead to many problems. They allow for asynchronicity to occur, but in the process, create an inversion of control where developers are handing off control of their application to another area or mechanism.


The callback don't wait syncronously, It split the program, so it can print :
  * Hello
  * World !
  * And come back 1000ms later print callback!

```js
console.log("Hello, ");

setTimeout(function(){
	console.log("callback!");
}, 1000);

console.log("World !");
//
```


### Callback hell

continuation passing style :

```js
function one(cb) {
	console.log("one");
	setTimeout(cb, 1000);
}

function two(cb) {
	console.log("two");
	setTimeout(cb, 1000);
}

function tree() {
	console.log("tree");
}

one(function(){
	two(tree);
});
```

## Solving Callback Problems
Kyle demonstrates a few techniques developers have used to get around callback issues. For example, providing separate callbacks in the case of success and failure functionality. Most of these solutions only lead to more inversion of control.

As soon we can take the continuation of our program and wrap  it up into a function and hand that off to some utility we have lost control of our program we give control to the tird party API, call my callback when you done...

What happen if the library have bug and call the function 1000 times
if is a ecomerce and it charge 1000 times on the credit card.

The gold is to solve inversion of control in a different way than callback


## Generators
Generators are coming in ES6. A generator is a new type of function that can be paused during execution and resumed at a later time. The are paused using the yield keyword.


We can now pause inside the function and resume later. A generator can pause itself and itterator can resume :
```js
function* gen() {
	console.log("hello");
	yield null;
	console.log("World");
}

var it = gen(); // do not execute function until it call next
it.next(); // print hello
it.next(); // print World
```

## Promises
Kyle Simpson has a really good explanation as part of the You Don't Know JS series, but my favorite description is one he gave in a talk a couple years ago. Think of a promise as being like a meal receipt at a fast-food restaurant. You order your meal and pay for it, and the clerk gives you a number that you need to claim the food when it is done. When the food comes out, the clerk calls your number and you exchange the receipt for the food.

Promises work the same way. You've called a function, passed it some data, and received a promise in return. When the "food" is done, the function resolves the promise (calls your number) and passes you the result. Attaching a callback to the promise is your way of handing back the receipt.

"Why not just use a callback?" you may ask. Well, promises offer some control flow advantages that are kind of cumbersome to do with callbacks, but the real advantage is that the promise acts as a data escrow.

A promise can never be resolved multiple times, will always be resolved asynchronously, bubbles up any errors that occur, and ensure that the code you're calling can't accidentally hang on to your calling context and create a memory leak.

Callbacks have none of these abilities and can actually be dangerous for your application if a third party library handles them wrong.

```js
// Promise constructor
var promise = new Promise(function(resolve, reject) {
  // do a thing, possibly async, then…

  if (/* everything turned out fine */) {
    resolve("Stuff worked!");
  }
  else {
    reject(Error("It broke"));
  }
});

// use that promise
promise.then(function(result) {
  console.log(result); // "Stuff worked!"
}, function(err) {
  console.log(err); // Error: "It broke"
});
```

## Quiz

1. What is "callback hell" ?
  * Callback inside a callback.

2. Why do callbacks suffer from "inversion of control" ?
  * It give to the utility all control.

3. How do you pause a generator ?
  * yeield
	1. How do you resume it ?
    * .next()

4. What is a Promise ?
  * It is a promise of a feature value.
  1. How does it solve inversion of control issues ?
    * Instead of passing my contunation in, i receive a promese back so it uninvert the inversion of control so you can decide what to do.

5. How do we combine generators and promises for flow control ?
  * You yeield out a promise and the promise when it complete automatic restart the generator with .next()
