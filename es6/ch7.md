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

We can specify start filling at index of. This is the second argument of the `fill()` but remember array is zero base for index. The third parameter represent the index to stop at and it is not inclusive.

```js
let amounts = [800, 810, 820];
amounts.fill(900, 1, 2);
console.log(amounts); // [800, 900, 820]
```

If we specify negative number it mean at the end of the array.

```js
let amounts = [800, 810, 820];
amounts.fill(900, -1);
console.log(amounts); // [800, 810, 900]
```

We have a find() function. As soon the element is found, it return immediately the value. It does not scan the whole array and return an array, it just return the first value it's find.

```js
let amounts = [800, 810, 820];
result = amounts.find(value => value >= 811);
console.log(result); // 820
```

We can return only the index with `findIndex()` the `this` can be and object or an integer.
```js
let amounts = [800, 810, 820];
result = amounts.findIndex(function (value, index, array) {
  return value == this;
}, 810);
console.log(result); // 1
```

We can copy value within with `copyWithin()` function. The first argument is the `destination index` and the second is the `source index`.
```js
let sourceIndex = 0;
let destinationIndex = 3;
let numbers = [1,2,3,4,5,6,7,8,9];

numbers.copyWithin(destinationIndex, sourceIndex);
console.log(numbers); // [1, 2, 3,    1, 2, 3, 4, 5, 6]
```
The third argument is the number of element that we want to copy, by default is the length of the array.

```js
let numbers = [1,2,3,4,5,6,7,8,9];

numbers.copyWithin(3, 0, 3);
console.log(numbers); // [1, 2, 3,    1, 2, 3,    7, 8, 9]
```
We can get all entry of an array. The first element is the index and the second element is the value. Notice we are using the spread operator.
```js
let ids = ['A', 'B', 'C'];
console.log(...ids.entries()); // [0, "A"] [1, "B"] [2, "C"]
```
To get only the index value use `.keys()`
```js
let ids = ['A', 'B', 'C'];
console.log(...ids.keys()); // 0 1 2
```
### ArrayBuffer and Typed Arrays

ArrayBuffer is simply an array of 8 bits bytes and for Typed Array is only numeric type that exist on top of array buffer so we can get array of integer and float ect...

```js
let buffer = new ArrayBuffer(32); // 32 bytes of allocation
console.log(buffer.byteLength);   // 32
```
So the buffer has 256 possibility of value [0, 255]
```js
let buffer = new ArrayBuffer(32);
buffer[0] = 0xFF;
console.log(buffer[0]); // 255
```
We can use the buffer array with Typed Array, here is the list of the typed Array. `Int` for integer, `Float` for float, `U` for unsigned, `8 16 or 32` for the size. `Clamped` mean if is a negative number it set to 0 and if the number exceed the size it set to the maximum size.  So with `Uint8ClampedArray` -1 is set to  0 and 257 is set to 255.

8 bits : Int8Array() Uint8Array() Uint8ClampedArray()

16 bits : Int16Array() Uint16Array()

32 bits : Int32Array() Uint32Array()

Float : Float32Array() Float64Array()
