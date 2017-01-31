# Closures

## Closures
Closures are often times misunderstood by JavaScript developers. Closures are when a function remembers its lexical scope even when the function is executed outside that lexical scope.

## Closure Examples
To further explain closure, Kyle shows examples using a number of common JavaScript structures like setTimeout and click events. He also demonstrates closure in shared scopes and nested scopes.

## More Closure Examples
Kyle demonstrates a few additional closure examples inside loops and the misconceptions that arise. He also compares closure to traditional object references to explain the difference.

## Module Patterns
Kyle explains the different module patterns that use closure. This includes the classic, modified, and modern patterns. He also discusses what to expect in ES6.

# Object-Oriented

## Prototype
In JavaScript, every object is built by a constructor function. This does not mean classes are being instantiated. When an constructor function is called, a new object is created with a link to the object's prototype.

## Prototypes Explained, Part 1
Using a code example from the slides, Kyle spends some time diagramming the relationship between an object and its prototype.

## Prototypes Explained, Part 2
Kyle explains the relationship between __proto__ (dunder-proto) and the prototype keyword and how both reference the underlining prototype. ES5 added a standardized way to do this using the getPrototypeOf method.

## Prototype Linkages
Prototype linkages allow delegation to other objects to hand method calls or property references. This allows additional objects to be created from a prototype with duplication of function code. This binding is beneficial as long as developers don't break any rules.

## prototype: Objects Linked
Prototypes in JavaScript can be linked and share a parent-child relationship similar to a subclass and superclass. This is beneficial when extending a prototype to add additional methods. However, there are issues with constructor references.

## Linked Prototype Diagram
Kyle revisits the prototype diagram he drew on the whiteboard earlier. This time, however, he shows a more complex version outlining the relationship of the two linked prototypes.

## Inheritance
In classical inheritance, properties and methods of a class are copied to object instantiated of that class. Subclasses inherit the properties and methods of a parent class and copy them to their instantiated objects. Kyle contrasts that with JavaScript's "prototypal inheritance" or "behavior delegation"

## OLOO
Rather than relating prototypes to inheritance, Kyle demonstrates that prototypes allow actions to be delegated to other objects. Kyle refers to this a Objects Linked to Other Objects or OLOO. He modifies the previous example to use this OLOO technique.
