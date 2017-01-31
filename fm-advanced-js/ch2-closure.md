# Closures

## Closures
Closures are functions that refer to independent (free) variables (variables that are used locally, but defined in an enclosing scope). In other words, these functions 'remember' the environment in which they were created. Closures are when a function remembers its lexical scope even when the function is executed outside that lexical scope.

```js
function bam(baz) { // The function is passed as argument
	baz(); // <- bar is accessible
}

function foo() {
	var bar = "bar";

	function baz() {
		console.log(bar);
	}

	bam(baz);
}

foo();
```


## Closure Examples

whidout IIFE, each i is in the same scope it will print `i: 4` tree times:

```js
for( var i=1; i<=3; i++) {
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
for( var i=1; i<=3; i++) {
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
	* A Closure is when a function remember and access it's lexical scope even if that function is executed outside of his lexical scope.

	* Is created when an inner function is transport it out to outside the inner function. Like when we pass a function in parameter.

2. How long does it's scope stay around ?
  * As long they is some function it still as a closure in the scope that scope will stay around.
	* As soon the closure goes away, gabarge collector remove the scope.

3. Why doesn't a function callback inside a loop behave as expected ?
	* Because they is no variable created for each itteration because the scope of var belong to the global.

  1. How do we fix it ?
	  * We solve it by putting an iife inside the loop or use the let keyword.

3. How do you use a closure to create an encapsulated module ?
  * Has to be an outer wrapper function
	* Return one or more interface function they were closure of this scope.
  1. What's the benefits of that approch ?
	  * They hidden stuff.

# Object-Oriented

## Prototype
In JavaScript, every object is built by a constructor function. This does not mean classes are being instantiated. When an constructor function is called, a new object is created with a link to the object's prototype.

```
// Circle = function
// Square = Object


                      Object

                    XXXXXXXXXXX                 +--------------+
                   XX          XX               | .toString()  |
                  X             X  .prototype   | .valueOf()   |
                  X             X +-----------> |              |
                  XX           XX               |              |
                   XXX         X                |              |
                     XXXXXXXXXX                 +------+-------+
                                                       ^
                                                       |
                                                       |
+-------------------------------------------------------------------------------------+
                                                       |
                        Foo                            |[[p]]
                                                       |
                    XXXXXXXXXXX                 +------+-------+
                   XX          XX               |              |
                  X             X  .prototype   |  .identify() |
                  X             X +-----------> |              |
                  XX           XX  .constructor |              |
                   XXX         X  <-------------+              |
                     XXXXXXXXXX            +--^ +--------------+ <--+
                                           |                        |
                                           |                        |
                                           |                        |
                                           |[[p]]                   |[[p]]
                                           |                        |
                                       a1  |                    a2  |
                                    +------+-------+         +------+-------+
                                    |              |         |              |
                                    |  me;         |         |  me;         |
                                    |              |         |  speak()     |
                                    |              |         |              |
                                    |              |         |              |
                                    +--------------+         +--------------+

```
## Prototypes Explained, Part 2
Kyle explains the relationship between __proto__ (dunder-proto) and the prototype keyword and how both reference the underlining prototype. ES5 added a standardized way to do this using the getPrototypeOf method.

## Prototype Linkages
Prototype linkages allow delegation to other objects to hand method calls or property references. This allows additional objects to be created from a prototype with duplication of function code. This binding is beneficial as long as developers don't break any rules.

## prototype: Objects Linked
Prototypes in JavaScript can be linked and share a parent-child relationship similar to a subclass and superclass. This is beneficial when extending a prototype to add additional methods. However, there are issues with constructor references.

## Linked Prototype Diagram
Kyle revisits the prototype diagram he drew on the whiteboard earlier. This time, however, he shows a more complex version outlining the relationship of the two linked prototypes.

## Prototypal Inheritance
In classical inheritance, properties and methods of a class are copied to object instantiated of that class. Subclasses inherit the properties and methods of a parent class and copy them to their instantiated objects.


This code act like heritance of oo You think in term of object linked that use prototype chain. Try to avoid shadowing (overwriten), use unique name for each function.

```js
var Foo = {
	init: function(who) {
		this.me = who;
	},
	identify: function() {
		return "I am " + this.me;
	}
};

var Bar = Object.create(Foo);

Bar.speak = function() {
	return "Hello, " + this.identify() + ".";
};

var b1 = Object.create(Bar);
b1.init("b1");
b1.speak();
```

### Shadowing

```js
function Foo(who) {
	this.me = who;
}

Foo.prototype.identify = function() {
	return "I am " + this.me;
};

var a1 = new Foo("a1");
a1.identify(); // "I am a1"

a1.identify = function() { // <-- Shadowing
	// relative polymorphism
	return "Hello, " + Foo.prototype.identify.call(this) + ".";
};

a1.identify(); // alerts: "Hello, I am a1."
```

## OLOO
Rather than relating prototypes to inheritance, Kyle demonstrates that prototypes allow actions to be delegated to other objects. Kyle refers to this a Objects Linked to Other Objects or OLOO. He modifies the previous example to use this OLOO technique.


## Quiz

1. What is a constructor ?
  * Is a function called with the new keyword in front of it.

2. What is a [[Prototype]]
  * Is a linkage to one object to another object.
  * It come from :
    1. Get the linkage from the object create witch is linked to an arbitrary object.
    2. Can get indirectly of the force step of the new keyword

3. How does a [[Prototype]] affect an object ?
  * Call a prototype if it does not exist it delegate to the prototype chain.

4. How do we find out where an object's [[Prototype]] points to (3 ways) ?
  1. __proto__ (dunder proto)
  2. object.prototype
  3. object.constructor.prototype


## Quiz
1. How is JavaScript [[Prototype]] chain not like traditional/classical inheritance ?
  * Does not copy by passing the attribute of the parent.

2. What does "behavior delegation" mean and how does it describe object linking in JS ?
  * When object call object of property on one object and can't handel it, it delegate up his Prototype chain to another object.

3. Why is "behavior delegation" as a design pattern a helpful thing ?
	1. You don't have copy of the function.
    * So the parent can change during the runtime
	2. The downside is shadowing a function is awkward.
	  * Everything is public
	  * Prototype is nice because you get only one copy of the method
    1. What are the tradeoffs ?
		  * Every prototype function is public.

> ** Note: 95 % of the time we can use module pattern because we don't create multiple instances. 5% use delegation and choose the oloo style without using the new pattern.
