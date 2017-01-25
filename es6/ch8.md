## The Reflect API

This is new to ES6. In Js we are different way to work with object and function. Reflect is a single object that use function call to perform many operations. Is useful with Proxy and DSL Domain Specific Language. It is already an object we can use it like `Math.`

```js
console.log(typeof Reflect); // object
```

### Object Construction
We can construct an object with the `new` keyword, or creating an `object literal`, or by calling `Object.create()` and now it another way by using ReflectApi to construct an object.

```js
console.log(typeof Reflect); // object
```

<b>Reflect.construct(target, argumentsList[, newTarget])</b>

This is a similar way to call `new Restaurant()`
```js
class Restaurant {
}
let r = Reflect.construct(Restaurant, []);
console.log(r instanceof Restaurant); // true
```

We can pass argument to the constructor
```js
class Restaurant {
  constructor(name, city) {
    console.log(`${name} in ${city}`);
  }
}
let r = Reflect.construct(Restaurant, ["Zoey's", "Goleta"]);
// "Zoey's in Goleta"
```
### Method Call
We can call function by using `()`,  `call()` function, `apply()` function and now we can use ReflectApi to that.

### Prototypes
We can getting and setting them with ReflectApi

### Properties
Adding Delete properties or preventing them a change.
