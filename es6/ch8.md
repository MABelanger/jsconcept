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

We can pass array argument to the constructor.
```js
class Restaurant {
  constructor(name, city) {
    console.log(`${name} in ${city}`);
  }
}
let r = Reflect.construct(Restaurant, ["Zoey's", "Goleta"]);
// "Zoey's in Goleta"
```

We can use `new.target` as the third argument in the construct method. We can call it with `new.target()` inside the constructor.

```js
class Restaurant {
  constructor() {
    console.log(`new.target: ${new.target}`);
  }
}
function restaurantMaker(){
  console.log('in restaurantMaker');
}
let r = Reflect.construct(Restaurant, ["Zoey's", "Goleta"], restaurantMaker);
/*
"new.target: function restaurantMaker(){
  console.log('in restaurantMaker');
}"
*/
```
### Method Call
We can call function by using `()`,  `call()` function, `apply()` function and now we can use ReflectApi to that.

<b>Reflect.apply(target, thisArgument, argumentsList)</b>

We can call a function by calling `Reflect.apply()` that cover calling a function with (), apply(), call()

In that example we are going into the prototype.show and apply this to { id: 99 } and call the function. It ignore the id inside the constructor. Notice we are never instantiate a Restaurant, Reflect.apply() is very low level. We can call any function within a class even we did not instantiate an object and pass it this value.

```js
class Restaurant {
  constructor() {
    this.id = 33;
  }
  show() {
    console.log(this.id);
  }
}
Reflect.apply(Restaurant.prototype.show, { id: 99 }); // 99
```

We can pass array of arguments to the function call with the third argument of the apply() function

```js
class Restaurant {
  constructor() {
    this.id = 33;
  }
  show(prefix) {
    console.log(prefix + this.id);
  }
}
Reflect.apply(Restaurant.prototype.show, { id: 99 }, ['Hello:']); // Hello:99
```

### Prototypes
We can getting and setting them with ReflectApi



### Properties
Adding Delete properties or preventing them a change.
