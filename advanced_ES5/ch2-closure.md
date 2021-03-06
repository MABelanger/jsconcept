# Closures

* [Closures](#closures)
* [Module Patterns](#module-patterns)
  + [Classic module pattern](#classic-module-pattern)
  + [Modified module pattern](#modified-module-pattern)
  + [Modern module patterns in ES6](#modern-module-patterns-in-es6)

## Closures
Closures are functions that refer to independent (free) variables (variables that are used locally, but defined in an enclosing scope). In other words, these functions 'remember' the environment in which they were created. Closures are when a function remembers its lexical scope even when the function is executed outside that lexical scope.

```js

// The function print is passed as argument
function callPrint(print) {
  print(); // <- myText is accessible inside of his function
}

function text() {
  var myText = "Hello";

  function print() {
    console.log(myText);
  }

  callPrint(print);
}

text();
```


## Closure Examples

whidout IIFE, each i is in the same scope it will print `i: 4` three times:

```js
for( var i = 1; i <= 3; i++ ) {
  setTimeout(function(){
    console.log("i: " + i);
  }, i*1000);
}
// i: 4
// i: 4
// i: 4
```

With IIFE, we get a new i into different scopes :

```js
for( var i=1; i<=3; i++ ) {
  (function(i){
    setTimeout(function(){
      console.log("i: " + i);
    }, i*1000);
  })(i);
}
// i: 1
// i: 2
// i: 3
```


With the let keyword loops + block scope :
  * It binding the i not just for the for loop
  * it rebind the i for each itteration of the for loop
  * It create a brand new i for each itteration.

```js
for( let i=1; i<=5; i++) {
  setTimeout(function(){
    console.log("i: " + i);
  }, i*1000);
}
// i: 1
// i: 2
// i: 3
```

## Module Patterns
Kyle explains the different module patterns that use closure. This includes the classic, modified, and modern patterns.

### Classic module pattern

they must be an outher wrapping function and closing function from inside of that function must return at least one or more innter function (public method).

```js
var foo = (function(){

  var o = { bar: "bar" };

  // like public API (encapsulation), principle of least exposure
  return {
    bar: function(){ // return a inner function
      console.log(o.bar);
    }
  };
})(); // <- outer wrapper

foo.bar(); // bar
```

### Modified module pattern
The advantage is :
  * We have an internal reference of publicAPI with a clear name
  * You can modify your API at runtime, add remove method, update value
  * Both foo and publicAPI will be referenced to the same object.

```js
var foo = (function() {
  var publicAPI = {
    bar: function(){
      publicAPI.baz();
    },
    baz: function(){
      console.log("baz");
    }
  };

  return publicAPI;
})();

foo.bar(); // baz
```

### Modern module patterns in ES6
It is file base, is conceptualy wrapped inside a function but we don't have to write that function, it gona have it own scope. like an iife and instead of returning thing we use keyword export

module.js :
```js
var o = { bar : "bar" };

export function bar() {
  return o.bar;
}
```
main.js :
```js
// To import one or many method of public API
import bar from "foo";
bar(); // "bar"

// If i want the whole module use module
module foo from "foo";
foo.bar(); // "bar"
```

## Quiz

1. What is a closure and how is it created ?
   - A Closure is when a function remember and access it's lexical scope even if that function is executed outside of his lexical scope.

   - Is created when an inner function is transport it out to outside the inner function. Like when we pass a function in parameter.

2. How long does it's scope stay around ?
   - As long they is some function it still as a closure in the scope that scope will stay around.
   - As soon the closure goes away, gabarge collector remove the scope.

3. Why doesn't a function callback inside a loop behave as expected ?
   - Because they is no variable created for each itteration because the scope of var belong to the global.

   1. How do we fix it ?
      - We solve it by putting an iife inside the loop or use the let keyword.

3. How do you use a closure to create an encapsulated module ?
   - Has to be an outer wrapper function
   - Return one or more interface function they were closure of this scope.
   1. What's the benefits of that approch ?
      - They hidden stuff.
