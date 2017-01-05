Every function, while executiong, has a reference
to it's current execution context, called this.


func1(); // <- the call site

The this keyword can be metaphoricly compare to the address of the building.
Before check on each floor if the variable is declared, you have to know the address of the building.


// They are 4 rules

function foo() {
	console.log(this.bar);
}

var bar = "bar1";
var o2 = { bar: "bar2", foo:foo }
var o3 = { bar: "bar3", foo:foo }

foo(); // (bar1) <- default binding
o2.foo(); // (bar2) <- implicit binding rule
o3.foo(); // (bar3)<- implicit binding rule

1) The default binding rule mode :
	If you are in strict mode, default to this keword to undefind value.
	If you are not in strict mode, default to this keword to the global object.
	if is a normal call like :
	func1(); // <- the default binding rule apply, 

2) The implicit binding rule : 
	o2.foo(); // <-The implicit binding rule apply
	All stuff inside the object (variables) is apply to this.





3) The explicit binding rule : 

function foo() {
	console.log(this.bar);
}

var bar = "bar1";
var obj = { bar: "bar2" };

foo(); // "bar1"
foo.call(obj); // "bar2"

The explicit binding rule : 
	foo.call(obj); // <- assign obj to this.
	foo.apply(obj) // same thing...


4) The hard binding rule : 
	use .bind()


// Order (this determination)
1. Was the function called with new ?
2. Was the function called with call or apply specifying an explicit this
3. Was the function called via containing/owning objet (context) ?
4. DeFAULT: global object (expect strict mode)


