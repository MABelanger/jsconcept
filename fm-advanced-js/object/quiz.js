1. What is a constructor ?
	Is a function called with the new keyword in front of it.

2. What is a [[Prototype]] and where does it come from ?
	Is a linkage to one object to another object.
	It come from : 
		1. Get the linkage from the object create witch is linked to an arbitrary object.
		2. Can get indirectly of the force step of the new keyword

3. How does a [[Prototype]] affect an object ?
	Call a prototype if it does not exist it delegate to the prototype chain.

4. How do we find out where an object's [[Prototype]] points to (3 ways) ?
	1) __proto__ (dunder proto)
	2) object.prototype
	3) object.constructor.prototype