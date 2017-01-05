/*
Kyle Simpson has a really good explanation as part of the You Don't Know JS series,
but my favorite description is one he gave in a talk a couple years ago.
Think of a promise as being like a meal receipt at a fast-food restaurant.
You order your meal and pay for it, and the clerk gives you a number that you need to
claim the food when it is done. When the food comes out, the clerk calls your
number and you exchange the receipt for the food.

Promises work the same way. You've called a function, passed it some data,
and received a promise in return. When the "food" is done, the function resolves
the promise (calls your number) and passes you the result. Attaching a callback
to the promise is your way of handing back the receipt.

"Why not just use a callback?" you may ask. Well, promises offer some control
flow advantages that are kind of cumbersome to do with callbacks,
but the real advantage is that the promise acts as a data escrow.

A promise can never be resolved multiple times, will always be resolved asynchronously,
bubbles up any errors that occur, and ensure that the code you're calling can't
accidentally hang on to your calling context and create a memory leak.

Callbacks have none of these abilities and can actually be dangerous for your
application if a third party library handles them wrong.
*/

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