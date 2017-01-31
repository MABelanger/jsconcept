# Object-Oriented

* [Prototype](#prototype)
* [Prototypal Inheritance](#prototypal-inheritance)
	+ [Shadowing](#shadowing)

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
