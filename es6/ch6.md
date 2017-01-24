## Iterators, Generators and Promises

### Iterators
Iterators is a major new feature in ES6 and is found all over the place.

To get access to the iterator use `Symbol.iterator` as the property name.

```js
let ids = [9000, 9001, 9002];
console.log( typeof ids[Symbol.iterator] ); // function
```

We can use the iterator with `next()` that return a special object with two property `done` and `value`. If done is false we are not exausted the itterator yet and the value is the value of it.

```js
let ids = [9000, 9001, 9002];
let it = ids[Symbol.iterator]();
console.log( it.next() ); // {done: false, value: 9000}
```
