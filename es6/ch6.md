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
We can make our own iterator
