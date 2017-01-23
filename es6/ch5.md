## New Types and Object Extentions
<b>Mozilla def</b>:
<i>A symbol is a unique and immutable data type and may be used as an identifier for object properties.<i>
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
