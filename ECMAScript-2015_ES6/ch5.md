## New Types and Object Extentions
- [New Types and Object Extentions](#new-types-and-object-extentions)
- [Well-know Symbols](#well-know-symbols)
- [String Extension](#string-extension)
- [Number Extensions](#number-extensions)
- [Math extensions](#math-extensions)
  * [Arithmetic Functions](#arithmetic-functions)
  * [Miscellaneous Functions](#miscellaneous-functions)
- [RegExp Extensions](#regexp-extensions)
- [Function Extensions](#function-extensions)

<b>Mozilla def</b>:
<i>A symbol is a unique and immutable data type and may be used as an identifier for object properties.</i>
##Symbols
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
## Well-know Symbols
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
let a = { x: 1 }, b = { x: 2, y: 2 };
let target = {};
Object.assign(target, a, b )
console.log(target); // {x: 2, y: 2}
```
Property is enumerable by default, if you want to work them by Object.assign, enumerable need to be true.
```js
let a = { x: 1 }, b = { x: 2, y: 2 };
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
let a = { x: 1 }, b = { x: 2, y: 2 }, c = { z: 20 };
Object.setPrototypeOf(b, c);

let target = {};
Object.assign(target, a, b);
console.log(target); // {x: 2, y: 2}
```
In ES5 `NaN =! NaN` and `0 == -0`
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
## String Extension

`startsWith`, let us know if a string start with on a given string. Same logic with `endsWith`. To know if a string is included we can use `includes`
```js
let title = 'Santa Barbara Stuf Riders';
console.log( title.startsWith('Santa') ); // true
console.log( title.startsWith('Riders') ); // true
console.log( title.includes('ba') ); // true
```
In ES6, we have a new `unicode syntax`. We can escape the u character and put the ex value within the `{}` in this example this is a `astral planes` value that have more than 4 bytes. We get the `emoj symbol` :surfer:

```js
let title = 'Santa Barbara \u{1f3c4} Riders';
console.log(title);
```
The `length` of a string is wrong when we are working with unicode symbols, because it encoded in two bytes. But if we transform it into an array and we check the length, we get the right value.
```js
var surfer = '\u{1f3c4}';
console.log(surfer.length); // 2
console.log(Array.from(surfer).length); // 1
```

In es5, we get the same problem with accent. like á "a\u0301n" because it is interpreted as `a` +   ``` ` ```  The fix is to use  `normalize()` The `codePointAt()` specify at witch character to look in the string and `toString(16)` convert it into hexa decimal base 16 value.

```js
var aAcute = 'a\u0301'; // á
console.log(aAcute.length); // 2
console.log(aAcute.normalize().length); // 1
console.log(aAcute.normalize().toString(16)); // 6e = 0X6E ASCII = á
```
We can set a string from Hex value with `fromCodePoint()`

```js
console.log( String.fromCodePoint(0x1f3c4) ); // :surfer:
```

To print the raw output we can use the new `String.raw` In most cases, String.raw() is used with template strings. The `${title}` still interpolated.

```js
let title = 'Surfer';
let output = String.raw`${title} \u{1f3c4}\n`;
console.log(output); // Surfer \u{1f3c4}\n
```

We can also repeat a character. `.repeat(3)` the output will be 3x the wave : :ocean::ocean::ocean:
```js
let wave = '\u{1f30a}';
console.log(wave.repeat(3));
```

## Number Extensions
Use `Number.parseInt` and `Number.parseFloat` instead of the global function
```js
console.log(Number.parseInt === parseInt); // true
console.log(Number.parseFloat === parseFloat); // true
```

The global `isNaN()` return true if eval a string. so use `Number.isNaN()` instead
```js
let s = 'NaN';
console.log( isNaN(s) ); // true
console.log( Number.isNaN(s) ); // false
```

Again `isFinite()` convert a string into integer so use `Number.isFinite()`
```js
let s = '8000';
console.log( isFinite(s) ); // true
console.log( Number.isFinite(s) ); // false
```

We have a new `Number.isInteger()`

```js
console.log( Number.isInteger(NaN) ); // false
console.log( Number.isInteger(Infinity) ); // false
console.log( Number.isInteger(undefined) ); // false
console.log( Number.isInteger(3) ); // true
```

The highest integer number that we can show is  `2^53 - 1`

```js
let a = Math.pow(2, 53) - 1;
console.log( Number.isSafeInteger(a) ); // true
a = Math.pow(2, 53) - 1;
console.log( Number.isSafeInteger(a) ); // false
```

We also added the 3 constants

```js
console.log(Number.EPSILON);
console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MIN_SAFE_INTEGER);
```
## Math extensions
### Arithmetic Functions

`cbrt()`  : cube root
`clz32()`: count leading zeros (32 bit integers) expm1() equal to exp(x) - 1
`log2()`  : log base 2
`log10()`: log base 10
`log1p()`: equal to log(x + 1)
`imul()`  : 32 bit integer multiplication

### Miscellaneous Functions
`sign()`    : the number's sign: 1, -1, 0, -0, NaN
`trunc()`  : the integer part of a number
`fround()`: round to nearest 32 bit floating-point value

```js
console.log(Math.sign(0));     // 0
console.log(Math.sign(-0));    //-0
console.log(Math.sign(-20));   //-1
console.log(Math.sign(20));    // 1
console.log(Math.sign(NaN));   // NaN
console.log(Math.cbrt(27));    // 3
console.log(Math.trunc(27.1)); // 27
console.log(Math.trunc(-27.9));//-27
```

## RegExp Extensions
If we work with the `astral planes` unicode character and regex we need to use a flag of unicode character`/u` at the end of the pattern.
```js
let pattern = /\u{1f3c4}/;
let pattern2 = /\u{1f3c4}/u;
console.log(pattern.test('🏄')); // false
console.log(pattern2.test('🏄')); // true
```
Same thing with dot that represent any character. In ES5 the `astral planes` get chop up in two seperate character. To see it as a single character add the `/u` at the end of the regex expression.

```js
let pattern = /^.Surfer/;
let pattern2 = /^.Surfer/u;
console.log(pattern.test('🏄Surfer')); // false
console.log(pattern2.test('🏄Surfer')); // true
```

With the /y flag we only looking at the last index.
```js
let pattern = /900/y;
console.log(pattern.lastIndex); // 0
console.log(pattern.test('800900')); // false
```
Because `900` start at the last index of 3 we get true
```js
let pattern = /900/gy;
pattern.lastIndex = 3;
console.log(pattern.test('800900')); // true
```
We can get the list of flag used in the alphabetic order.
```js
let pattern = /900/yg;
console.log(pattern.flags); // gy
```

## Function Extensions

We can log function name for debugging `calc`.
```js
let fn = function calc() {
  return 0;
};
console.log(fn.name); // calc
```

If is an anonymous function the JS engine do his best to returning the name of the first assigned variable in that case `fn`.

```js
let fn = function() {
  return 0;
};
let newFn = fn;
console.log(newFn.name); // fn
```

This is also work with the name of the class and the methods. `Function.name` is not writable but it's configurable with `Object.defineProperty()`

```js
class Calculator {
  add(){
  }
}
let c = new Calculator();
console.log(Calculator.name); // Calculator
console.log(c.add.name); // add
```
