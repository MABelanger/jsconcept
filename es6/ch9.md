### The Proxy API
A proxy is an object that wrap another object or wrap another function and with the proxy we can monitor access to that function or object that being wrap.

We can use it for `security`, for `profiling` how long function run and log everything out or create security login system.




```






                 +-----------------------------+
                 |                             |
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
                 |                             |
                 +-----------------------------+

```


```js
let rest = {
  id: 2000
};
Reflect.preventExtensions(rest); // Lock the object
rest.location = 'Goleta';
console.log(rest.location);      // undefined
```
