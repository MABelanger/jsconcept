## Iterators, Generators and Promises

### Iterators
Iterators is a major new feature in ES6 and is found all over the place.

To get access to the iterator use `Symbol.iterator` as the property name.

```js
let ids = [1, 2, 3];
console.log( typeof ids[Symbol.iterator] ); // function
```

We can use the iterator with `next()` that return a special object with two property `done` and `value`. If done is false we are not exhausted the iterator yet and the value is the value of it. If it's done, we get done to true and value as undefined. Iterator is builtin in the array object.

```js
let ids = [1, 2, 3];
let it = ids[Symbol.iterator](); //
console.log( it.next() ); // {done: false, value: 1}
console.log( it.next() ); // {done: false, value: 2}
console.log( it.next() ); // {done: false, value: 3}
console.log( it.next() ); // {done: true, value: undefined}
```
We can make our own iterator we need to implement `[Symbol.iterator]` with `next()` that return {value: , done: }

The for-of statement accepts any iterable object, thus providing an uniform iteration syntax to completely distinct data structures by making use of the Iterable interface they implement.

The spread operator `...` use iterator to destructure elements.
```js
idMaker = {
  [Symbol.iterator]() {
    let nextId = 1;
    return {
      next() {
        let value = nextId > 3 ? undefined: nextId++;
        let done = !value;
        return { value, done };
      }
    };
  }
};
for (let v of idMaker) {
  console.log(v);
} // 1 2 3
console.log(...idMaker)
```
### Generators
It a special function that don't run all the way through necessary it is able to yeald and be call multiple times through all of your code. It does not exist on the stack like must function do. We actualy use iterator to call generator multiple times. We denote generator by the `*` at the begining of the function. Wen we run the function, it return a iterator. It start off with the pause state.

```js
function *process() {
  console.log('a');
  yield 1; // First pose before yield
  console.log('b');
  yield 2; // Second pose before the second yield
  console.log('c');
}
let it = process();
console.log(it.next()); // a Object {value: 1, done: false}
console.log(it.next()); // b Object {value: 2, done: false}
console.log(it.next()); // c Object {value: undefind, done: true}
console.log(it.next()); // Object {value: undefind, done: true} <- no more to iterate
```

 You can use generator that always return a next value with a `while(true)`

```js
function *process() {
  let nextId = 0;
  while(true) {
    yield nextId;
    nextId += 1;
  }
}
for (let id of process()) {
  if (id > 3){
    break;
  }
  console.log(id);
} // 0 1 2 3
```

You can pass a value to `yield` it stop a the first yield and then the unpose of the next yield pass the value.

```js
function *process() {
  let result = yield;
  console.log(`result is ${result}`);
}
let it = process();
it.next();
it.next(200);
```

We can assign an array with the yield

```js
function *process() {
  let newArray =[yield, yield, yield];
  console.log(newArray[2]);
}
let it = process();
it.next();
it.next(2);
it.next(4);
it.next(42);
// 42
```

If you use the multiply put it between ()

```js
function *process() {
  let value = 4 * (yield 42);
  console.log(value);
}
let it = process();
console.log( it.next() ); // 42
it.next(10); // 40
```

### Iterator delegation
`yield*` take some thing that it's iterable so we can delegate another iterator to the generator. Once that iterator is fully consumed, that previous iterator will take over again.

```js
function *process() {
  yield 42;
  yield* [1,2,3];
}
let it = process();
console.log( it.next().value ); // 42
console.log( it.next().value ); // 1
console.log( it.next().value ); // 2
console.log( it.next().value ); // 3
console.log( it.next().value ); // undefind
```

### throw and return

#### throw
You can throw exception by using `.throw()` when we use it, it stop the generator and it call the `catch()` block and return `{value: undefined, done: true}` and skip all other lines of code as the generator as reached the end of it's function. In this example `b` never get printed.
```js
function *process() {
  try {
    console.log('a');
    yield 1;
    console.log('b');
    yield 2;
    console.log('c');
    yield 3;
    console.log('d');
  }
  catch(e) {
    console.log(e);
  }
}
let it = process();
                                   // a
//console.log( it.next().value );  // 1
//console.log( it.throw('error') );// 'error' & {value: undefined, done: true}
//console.log( it.next() );        // {value: undefined, done: true}
```

If we don't have try catch logic in the generator, our execution terminate the other `.next()` never get executed. So if you do call throw on iterator you have to make sure that try catch block is implemented.

#### return
They is a way to neatly cleanup an iterator, we can call the `return()` function. It a clean way to complete to wrap up the iterator and complete it. We get an object with done to true and the value we are returned. That skip lines of code like the throw.
```js
function *process() {
  yield 1;
  yield 2;
  yield 3;
}
let it = process();
console.log( it.next().value );       // 1
console.log( it.return('I am done') );// {value: "I am done", done: true}
console.log( it.next() );             // {value: undefined, done: true}
```

### Promises
Used with Jquery and Q library. A promises is basically an object that waiting for an asynchronous operation to completes, when the operation does complete the promises is either fulfill or rejected.

The promises take a function as argument that have `resolve()` and `reject()` that is called in the right scenario of the promises. To notify the promise we have to cal `resolve()` or `reject()`

```js
function doAsync() {
  let p = new Promise(function(resolve, reject){
    console.log('in promise code');
    setTimeout(function () {
      console.log('resolving...');
      resolve(); //
    }, 2000);
  });
  return p;
}
let promise = doAsync();
// in promise code
// (2 sec later) : resolving...
```
Example with `.then`, we can pass parameter to the function to know the value of the `resolve` or the reason of the `reject`.

```js
let p = new Promise(function(resolve, reject){
  console.log('in promise code');
  setTimeout(function () {
    console.log('resolving...');
    resolve('200');
    reject('error'); // the reject never been call.
  }, 2000);
});

p.then(function (value) {
  console.log('Fulfilled! : ' + value );
},
function (reason) {
  console.log('Rejected! with reason:' + reason);
});
// in promise code
// (2 seg later): resolving...
// Fulfilled! : 200
```

We can chaining  `.then()` function by returning a value. So wen we return a string, it get wrap up in promise and that promise fulfill because the original promise fulfill.

```js
let p = new Promise(function(resolve, reject){
  setTimeout(function () {
    resolve('ok');
  }, 2000);
});

p.then(function (value) {
  console.log('Fulfilled! with value:' + value );
  return 'For Sure';
}).then(function(value) {
  console.log(value);
},
function (reason) {
  console.log('Rejected! with reason:' + reason);
});
// Fulfilled! with value:ok
// For Sure
```
We can also specify the `.catch()` function when promise is rejected.
```js
var p1 = new Promise( function(resolve, reject) {
  setTimeout( function() {
    reject('error');
  }, 2000);
});

p1.then( function(val) {

}).catch( function(reason) {
  console.log('Handle rejected promise ('+reason+') here.');
});
```

### More promise features
We can pass another promise to the `resolve()` function. If the promise in argument fail, the original promise get also rejected even we called the `resolve()` function. We can use directly the promise without using async call by using : `Promise.resolve()` or `Promise.reject()`

```js
var p1 = new Promise( function(resolve, reject) {
  setTimeout( function() {
    resolve( Promise.reject('error') );
  }, 2000);
});

p1.then( function(val) {

}).catch( function(reason) {
  console.log('Handle rejected promise ('+reason+') here.');
});
```
### Promise.all and Promise.race

All promise can be checked with the `.all()` that wait for all promises to complete and when they all fulfil it will call the first function to `then()`. It will wait until we get an error. If no error, it will wait until all promises is complete. If we get error, the second function is called. The first instant we get a rejection, the call for `Promise.all()` is finished and `then()` get called.

```js
var p1 = new Promise( function(resolve, reject) {
  setTimeout( function() {
    resolve( 'ok' );
  }, 2000);
});
var p2 = Promise.resolve('ok');

Promise.all([p1, p2]).then(
  function (value) { console.log('Ok'); },
  function (reason) { console.log('No'); }
);
// (2 seconds delay)
// ok
```

With `Promise.race()` it's a race to complete first, witch ever promises complete first, that the promise get handle by `.then()`

```js
var p1 = new Promise( function(resolve, reject) {
  setTimeout( function() {
    resolve( 'ok' );
  }, 2000);
});
var p2 = Promise.resolve('ok');

Promise.race([p1, p2]).then(
  function (value) { console.log('Ok'); },
  function (reason) { console.log('No'); }
);
// (No delay)
// ok
```
