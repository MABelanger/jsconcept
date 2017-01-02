var a = b();

// you can't call function expression before is
// declared
var c = d();
a; // ??
c; // ??


// function declaration get hoisted
function b() {
	return c;
}

// function expression did not get hoisted
var d = function() {
	return b();
};





// become 
// Function get hoisted before declaration.
function b() {
	return c;
}
var a;
var c;
var d;

a = b();
c = d();
a;
c;
d = function() {
	return b();
};

// -----
foo(); // "foo"

var foo = 2; // var get ignored because of the function hoisted first

function foo() {
	console.log("bar");
}

function foo() {
	console.log("foo");
}
