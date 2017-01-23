## New Types and Object Extentions
<b>Mozilla def</b>:
<i>A symbol is a unique and immutable data type and may be used as an identifier for object properties.</i>
###Symbols
It is a new concept that does not exist in ES5. The prupose of a symbol is to generate an Unique Identifier. But we never get access to that Id as a developper. They are well know symbols like itterators, Object Extensions, String Extensions, Number Extensions,  Math Expressions, RegExp Expressions, Function Extensions.

You can use it as unique string as an ID.

```js
let eventSymbol = Symbol('resize event');
console.log(typeof eventSymbol); // symbol
console.log(eventSymbol.toString()); // Symbol(resize event)
```
A symbol is human readable debug identifier, To know what is the initial string on the symbol, do a `toString()` but it's still don't tell what is the uniqueId is and we can't access it. In that way we can guaranty we have an unique ID.
```js
let eventSymbol = Symbol('resize event');
console.log(eventSymbol.toString()); // Symbol(resize event)
```
We can use symbol with a `constant` and that guaranty that constant have a unique value.
```js
const CALCULATE_EVENT_SYMBOL = Symbol('calculate event');
console.log(CALCULATE_EVENT_SYMBOL.toString()); // Symbol(calculate event)
```

We can prove that symbol has a unique ID.
```js
let s = Symbol('event');
let s2 = Symbol('event');
console.log(s === s2); // false
```
They are a builtin symbol registry and we can access it by calling `Symbol.for('string')` If we already have a registred symbol with the same string, that will be return. Otherwise a new symbol will be generated. Even we are no id what the ID are, for those symbols we can still compare them.

```js
let s = Symbol.for('event');
let s2 = Symbol.for('event');
console.log(s === s2); // true
```
To see what symbol represent.
```js
let s = Symbol.for('event');
let description = Symbol.keyFor(s);
console.log(description); // event
```

The majority of time that we use symbol is as a property with a class or an object. We have to put the symbol as expression between [] to create a property out of an object. In this case the unique symbol will used to create a property. It used a lot with generator and itterator.

```js
let article = {
  title: 'Whiteface Mountain',
  [Symbol.for('article')]: 'My Article'
};
let value = article[Symbol.for('article')];
console.log(value); // My Article
```
We can't see the symbol with `getOwnPropertyNames()`, it ignore the symbol. We have to use `getOwnPropertySymbols()`
```js
let article = {
  title: 'Whiteface Mountain',
  [Symbol.for('article')]: 'My Article'
};
console.log( Object.getOwnPropertyNames(article) ); // ['title']
console.log( Object.getOwnPropertySymbols(article) ); // Symbol(article)
```
### Well-know Symbols
The symbols is used with metaprogramming.

`toStringTag` is the well-know symbol, it is place directly on the Symbol function or class, when we set the property on the prototype, we set it to the class. In this case, We altering the way the JavaScript engine call toString() and produce it output. This is an example of metaprogramming.
```js
let Blog = {
};
Blog.prototype[Symbol.toStringTag] = 'Blog Class';
let blog = new Blog();
console.log( blog.toString() ); // [object Blog Class]
```
`isConcatSpreadable` well-know symbol. By default if we create a new array and we concat the values, we get the same result.
```js
let values = [8, 12, 16];
console.log([].concat(values)); // [8, 12, 16]
```
But if we set `isConcatSpreadable` to false, it prevent to speading out an array with concat.
```js
let values = [8, 12, 16];
values[Symbol.isConcatSpreadable] = false;
console.log([].concat(values)); // [ [8, 12, 16] ]
```
They are new static method that we can glue together two object literal with `Object.setPrototypeOf()` Even if a don't contain y value, because we set up the prototype we can access a.y thought the prototype chain.

```js
let a = {
  x: 1
};
let b = {
  y: 2
};
Object.setPrototypeOf(a, b);
console.log(a.y); // 2
```
`Object.assign` will populate the target with all the parameters. So all property of a and b, if we have the same value in the source object, it get overwrite by b.
```js
let a = { x: 1 }, b = { x:2, y: 2 };
let target = {};
Object.assign(target, a, b )
console.log(target); // {x: 2, y: 2}
```
Property is enumerable by default, if you want to work them by Object.assign, enumerable need to be true.
```js
let a = { x: 1 }, b = { x:2, y: 2 };
Object.defineProperty(b, 'z', {
  value: 10,
  enumerable: false
});
let target = {};
Object.assign(target, a, b )
console.log(target); // {x: 2, y: 2}
```
Object.assign don't look the prototype chain to build the new target.
```js
let a = { x: 1 }, b = { x:2, y: 2 }, c = { z: 20 };
Object.setPrototypeOf(b, c);

let target = {};
Object.assign(target, a, b);
console.log(target); // {x: 2, y: 2}
```
In ES5 NaN =! NaN and 0 == -0
```js
let amount = NaN;
let zero = 0, nZero = -0;
console.log(amount === amount); // false
console.log(zero === nZero); // true
```
To fix that in ES6 we get an new function Object called `is` and this is verry similar that `===` so a bether way to compare now is with `Object.is()`
```js
let amount = NaN;
let zero = 0, nZero = -0;
console.log( Object.is(amount, amount) ); // true
console.log( Object.is(zero, nZero) ); // false
```
### String Extension
