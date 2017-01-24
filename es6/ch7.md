## Arrays and Collections

Array has been extended in ES6 and they are a new Collections class.

### Array Extensions
In ES5 the problem if we pass a numeric value to the constructor of `Array()` it determine the length of the array.
```js
let salaries = Array(900);
console.log(salaries.length); // 900
```
Now in ES6 we have `Array.of()` function. If we pass only one value it create an array with only that value.
```js
let salaries = Array.of(900);
console.log(salaries.length); // 1
```

ES6 have a new function for Array is `Array.from()` We pass the array with the arrow function. It create a brand new Array base on the source and each element call the lambda function `v => v+100`

```js
let amounts = [800, 810, 820];
let salaries = Array.from(amounts, v => v+100 );
console.log(salaries); // [900, 910, 920]
```

We can use it with normal function. The third argument become the object `this`

```js
let amounts = [800, 810, 820];
let salaries = Array.from(amounts, function(v) {
  return v + this.adjustment;
}, { adjustment: 100});
console.log(salaries); // [900, 910, 920]
```

`fill()` is a new function that extend the Array object that fill all the array with the value passed in parameter.

```js
let amounts = [800, 810, 820];
amounts.fill(900);
console.log(amounts); // [900, 900, 900]
```

We can specify start filling at index of. This is the second argument of the `fill()`

```js
let amounts = [800, 810, 820];
amounts.fill(900, 1);
console.log(amounts); // [900, 810, 820]
```
