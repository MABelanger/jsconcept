function foo() {
	this.baz = "baz";
	console.log(this.bar + " "  + baz);
}

var bar = "bar";
var baz = new foo();

// 4 thing that new keword do infront of the function call

1) Create a brand new object is created.
2) * the object is linked to a different object.
3) that new object get bound to the this keyword for the prupuse of the function call.
4) If that function do not return any thing, it will implicitly put a return this; 
	function foo() {
		this.baz = "baz";
		console.log(this.bar + " "  + baz);
		return this; // <- with the new keyword.
	}