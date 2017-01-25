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

<b>Reflect.getPrototypeOf(targetObject)</b>

When we working with classes the constructor() is actually an prototype.
```js
class Location {
  constructor() {
    console.log('constructing Location');
  }
}
class Restaurant extends Location {
}
console.log(Reflect.getPrototypeOf(Restaurant));
/*
  constructor() {
    console.log('constructing Location');
  }
*/
```

We can also set the prototype

<b>Reflect.setPrototypeOf(targetObject, prototype)</b>

Restaurant is empty class but now it contain getId() function with the setPrototypeOf()
```js
class Restaurant {
}
let setup = {
  getId() { return 80; }
}

let r = new Restaurant();
Reflect.setPrototypeOf(r, setup);
console.log(r.getId()); // 80
```

### Properties
Adding Delete properties or preventing them a change. We do different operation on properties : set, get and delete them.

<b>Reflect.get(targetObject, propertyKey[, receiver])</b>

The get return the `this.id`

```js
class Restaurant {
  constructor() {
    this.id = 8000;
  }
}

let r = new Restaurant();
console.log(Reflect.get(r, 'id')); // 8000
```
The second argument is the getter and the third argument apply to `this` in this case { _id : 88 }
```js
class Restaurant {
  constructor() {
    this._id = 8000;
  }
  get id() {
    return this._id;
  }
}

let r = new Restaurant();
console.log(Reflect.get(r, 'id', { _id: 88})); // 88
```

We can set value
<b>Reflect.set(targetObject, propertyKey, value[, receiverObject])</b>

```js
class Restaurant {
  constructor() {
    this.id = 8000;
  }
}

let r = new Restaurant();
Reflect.set(r, 'id', 88);
console.log(r.id); // 88
```
We can set an object property with the usage of the class function setter `set id()`
```js
class Restaurant {
  constructor() {
    this._id = 9000;
  }
  set id(value) {
    this._id = value;
  }
}
let r = new Restaurant();
let alt = { id: 88 };

Reflect.set(r, '_id', 50, alt);
console.log(r._id);   // 9000
console.log(alt._id); // 50
```

We can look if the object has a property with  `.has()`

<b>Reflect.has(targetObject, propertyKey)</b>
