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