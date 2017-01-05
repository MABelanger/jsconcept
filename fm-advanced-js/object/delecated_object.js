/*
	This code act like heritance of oo
	You think in term of object linked that use prototype chain.
	Try to avoid shadowing (overwriten), use unique name for each function.
*/

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