## ECMAScript 2015 (es6)

[current support es6](http://kangax.github.io/compat-table/es6/)

We realy need to transpile for support of mobile device.

## New ES6 Syntax
Let, const and Block scoping
Arrow functions =>
Default Function parameters
Rest and Spread
Object Literal Extentions
for .. of Loops
Octal and Binary
Template Literals
Destructuring


## let, const and Block Scoping

### Hoisting var vs let

With `var`, the variable get hoisted before execution as ES5
```js
'use strict';
console.log(productId); // undefined
var productId = 12;
```
With `let`, we can't call variable before the declaration.
```js
'use strict';
console.log(productId);
let productId = 12; // ReferenceError: ProductId is not defined
```

If not initialize, this is `undefined`
```js
'use strict';
let productId;
console.log(productId); // undefined
```

New block scoping with ES6
```js
'use strict';
let productId = 12;
{
  let productId = 2000;
}
console.log(productId); // 12
```
Because `var` is not `block scope`, is `function scope`. The i point to the same variable for each loop.
```js
'use strict';
let updateFunctions = [];
for (var i = 0; i < 2; i++) {
  updateFunctions.push(function () { return i;});
}
console.log(updateFunction[0]()); // 2
```

Because `let` and `const` is block scope. Each new iteration get new i.
```js
'use strict';
let updateFunctions = [];
for (let i = 0; i < 2; i++) {
  updateFunctions.push(function () { return i;});
}
console.log(updateFunction[0]()); // 0
```

The const must be initialized.
```js
'use strict';
const MARKUP_PCT;
console.log(MARKUP_PCT); // SyntaxError: Unexped token ;
```

```js
'use strict';
const MARKUP_PCT = 100;
MARKUP_PCT
console.log(MARKUP_PCT); // TypeError: Assignement to constant variable.
```

### Arrow Function
We can remove the function and return statement. Use parentheses if no input. This input result of this output.

```js
'use strict';
var getPrice = () => 5.99;
console.log(typeof getPrice); // function
console.log(getPrice()); // 5.99
```

If it is one input we don't need to specify ()
```js
'use strict';
var getPrice = count => count * 4.00;
console.log(getPrice(2)); // 8
```

If we use more than one parameter we must use the (). If we use block {} we need to specify return.

```js
'use strict';
var getPrice = (count, fee) => {
  var price = count * 4;
  price = price + fee;
  return price;
}
console.log(getPrice(2, 1)); // 9
```
The real purpose of the arrow function is to handle the this keyword within function. Ex, in ES5, if we call it from a browser, the this is bind to the element getting the event. #document
```js
'use strict';
document.addEventListener('click', function () {
  console.log(this); // #document
});
```
With arrow function, the this is bind to the actual context of the code we running.
```js
'use strict';
document.addEventListener('click', () => {
  console.log(this); // Window
});
```
