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

`8 bits`   : Int8Array() Uint8Array() Uint8ClampedArray()
`16 bits` : Int16Array() Uint16Array()
`32 bits` : Int32Array() Uint32Array()
`Float`    : Float32Array() Float64Array()

```js
let buffer = new ArrayBuffer(32);
let a = new Int8Array(buffer);
a[0] = 0xFF;
console.log(a[0]); // -1
```
Same value but with Uint8Array now we get 255
```js
let buffer = new ArrayBuffer(32);
let a = new Uint8Array(buffer);
a[0] = 0xFF;
console.log(a[0]); // 255
```
With clamped Array

```js
let buffer = new ArrayBuffer(32);
let a = new Uint8ClampedArray(buffer);
a[0] = -10;
console.log(a[0]); // 0
```
We can share the same underline ArrayBuffer across the different Typed Array.

```js
let buffer = new ArrayBuffer(32);
let a = new Uint8Array(buffer);
let b = new Uint16Array(buffer);
a[1] = 1; // 00000001 00000000
console.log(b[0]); // 256 litle indian mode
```

### DataView and Endianness
When we are working with bytes and array of integers, Endianness is important.
<b>Big indian</b> : The most significant byte stored first.
<b>Little indian</b> : The lest significant byte stored first.

We use dataView object to handle Endianness when setting and getting values. The dataView is like the helper object that work with the buffer. Most of it's method work with Endianness of the value.

```js
let buffer = new ArrayBuffer(32);
let dv = new DataView(buffer);
console.log(dv.byteLength); // 32
```

We can work with a sub section of the array buffer. The 0 refer to the start position and the 8 refer to the length that we want.

```js
let buffer = new ArrayBuffer(32);
let dv = new DataView(buffer, 0, 8);
console.log(dv.byteLength); // 8
```
When working with DataView we are not working by the default `little Endian`, we are working with `Big Endian` by default. By passing `true` to the method, we are telling to work into `little Endian`
```js
let buffer = new ArrayBuffer(32);
let dv = new DataView(buffer);
dv.setUint8(0, 1); // at index 0 we set to 1 of Uint8
console.log(dv.getUint16(0)); // get value at index 0 of Uint16 (256)
console.log(dv.getUint16(0, true)); // 1
```

### Map and WeekMap
<b>MDN def</b> : <i>"The Map object is a simple key/value map. Any value (both objects and primitive values) may be used as either a key or a value."</i>

We use a lot `map()`, every object can be considered to map that made of`property and values` as key: value. But in a object we can only use `string` or `number` as key, we can't use object. To use object as key, we need to use `map()`

```js
let emp1 = { name: 'Jake' };
let emp2 = { name: 'Janet' };

let emps = new Map();
emps.set(emp1, 'ABC');
emps.set(emp2, '123');

console.log(emps.size);       // 2
console.log(emps.get(emp1));  // ABC

emps.delete(emp2);
console.log(emps.size);       // 1

emps.clear();
console.log(emps.size);       // 0
```

We can set a Map with his constructor with Array within an Arrays. This a more common way when working with a lot of data to create a Map. You can pass it an iterable, in this case is an array.

The `.has()` method on a map tell us if that key exist in the map.

We can create an array of values by using `.values()` with the spread operator `...` inside bracket `[]`

We can get the content of the map by using `.entries()` You can view it as getting the original array that we pass in to the constructor.

```js
let emp1 = { name: 'Jake' };
let emp2 = { name: 'Janet' };

let arr = [
  [emp1, 'ABC'],
  [emp2, '123']
];
let emps = new Map(arr);
console.log(emps.size);       // 2

console.log(emps.has(emp2));  // true

let list = [...emps.values()];
console.log(list);            // [ABC, 123]

list = [...emps.entries()];
console.log(list);            // [[{"name": "Jake"}, "ABC"], [{"name": "Janet"}, "123"]]
```

The WeakMap object is a collection of key/value pairs in which the keys are weakly referenced.  The keys must be objects and the values can be arbitrary values.

Keys of WeakMaps are of the type Object only. Primitive data types as keys are not allowed (e.g. a Symbol can't be a WeakMap key).

With manually written maps, the array of keys would keep references to key objects, preventing them from being garbage collected. In native WeakMaps, references to key objects are held "weakly", which means that they do not prevent garbage collection in case there would be no other reference to the object.

```js
let emp1 = { name: 'Jake' };
let emp2 = { name: 'Janet' };

let emps = new WeakMap([
  [emp1, 'ABC'],
  [emp2, '123']
]);

console.log(emps.size);       // undefined
console.log(emps.get(emp1));  // ABC
emp1 = null;                  // Garbage collected...
console.log(emps.get(emp1));  // undefined
```

### Set and WeekSet

This collection is similar to Map and WeekMap except that they deal with single value with single objects. They are no mapping from a key to a value as an a Map. The purpose of set is to guaranty uniqueness of it's items. And WeekSet just like WeekMap hold week connection to his objects. So when the object is garbage collected, it is automatically removed from the WeekSet.

```js
let items = new Set();

items.add('Car');
items.add('Apple');
items.add('Car');
console.log(items.size); // 2
```

The constructor for Set can take an iterator like Array or another set so that become a copy of the Set.

```js
let items = new Set([
  'Car',
  'Apple',
  'Orange'
]);
console.log(items.size); // 3

let copyItems = new Set(items);
console.log(copyItems.size); // 3
```

We can check if the set has value with `.has()` method.

```js
let items = new Set([
  'Car',
  'Apple',
  'Orange'
]);
console.log(items.has('Car')); // true
```
`keys()` and `values()` do work on a Set. The `keys = values`

```js
let items = new Set([
  'Car',
  'Apple'
]);
console.log(...items.keys());   // Car Apple
console.log(...items.values()); // Car Apple
console.log(...items.entries());//["Car", "Car"] ["Apple", "Apple"]
```

Even the object is identical, they still separated objects specify by two unique object literal so they both put in the set.

```js
let items = new Set([
  { id: 800 },
  { id: 800 }
]);
console.log(items.size); // 2
```

#### WeakSet
As the WeakMap WeakSet need an object as a key, we can't use primitive types.
```js
let items = new WeakSet([1, 2]);
console.log(items.size); // Runtime Error: 'key' is not an object
```
In a similar way to WeakMap, we don't have access to what it hold. The JS has in charge with the Garbage Collector. But we can check if the object exist within the WeakSet with `.has()`
```js
let p1 = {number:1};
let p2 = {number:2};
let items = new WeakSet([p1, p2]);
console.log(items.size);   // undefined
console.log(items.has(p1)); // true
p1 = null;
console.log(items.has(p1)); // false
```

### Subclassing
