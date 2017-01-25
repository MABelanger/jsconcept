### The Proxy API
A proxy is an object that wrap another object or wrap another function and with the proxy we can monitor access to that function or object that being wrap.

We can use it for `security`, for `profiling` how long function run and log everything out or create security login system.




```
                 +-----------------------------+
                 |        Handler Object       |
+---------+      |         ( the proxy )       |
|         |      |                             |
| Source  |      |  Traps      +------------+  |
|  Code   +-------> get()+---> | Target     |  |
|         |      |  set()      | Object or  |  |
|         |      |  apply()    | Function   |  |
|         |      |             |            |  |
|         |      |             +------------+  |
|         |      |                             |
+---------+      |                             |
                 +-----------------------------+
```

The target is the first argument and the second argument is an object literal that contain our handlers function (ours traps). In this case we trap the get()
```js
function Employee () {
  this.name = 'Milton Waddams';
  this.salary = 0;
}

var e = new Employee();
var p = new Proxy(e, {
  get: function (target, prop, receiver) {
    return "Attempted access: " + prop;
  }
});
console.log(p.salary); // "Attempted access: salary"
```

Now we use Reflect API with get() to get the parameter

```js
function Employee () {
  this.name = 'Milton Waddams';
  this.salary = 0;
}

var e = new Employee();
var p = new Proxy(e, {
  get: function (target, prop, receiver) {
    // We can put logic of security here...
    return Reflect.get(target, prop, receiver);
  }
});
console.log(p.salary); // 0
```

If we deny the access of salary but allow other fields.

```js
function Employee () {
  this.name = 'Milton Waddams';
  this.salary = 0;
}

var e = new Employee();
var p = new Proxy(e, {
  get: function (target, prop, receiver) {
    if(prop === 'salary')
      return 'Denied';
    return Reflect.get(target, prop, receiver);
  }
});
console.log(p.salary); // Denied
console.log(p.name); // Milton Waddams
```

We can log out custom message if the properties does not exist.

```js
var t = {
  tableId: 99
};

var p = new Proxy({}, {
  get: function (target, prop, receiver) {
    return 'Property ' + prop + ' doesn\'t exist...';
  }
});
Object.setPrototypeOf(t, p);
console.log(t.tableId); // 99
console.log(t.size);    // "Property size doesn't exist..."
```
