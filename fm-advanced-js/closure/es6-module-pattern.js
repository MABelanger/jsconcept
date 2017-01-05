
// File.js
var o = { bar : "bar" };

export function bar() {
	return o.bar;
}
// end File.js

/*
It is file base, is conceptualy wrapped inside a function
but we don't have to write that function,
it gona have it own scope. like an iife
and instead of returning thing we use keyword export
*/

// To import one or many method of public API
import bar from "foo";
bar(); // "bar"

// If i want the whole module use module
module foo from "foo";
foo.bar(); // "bar"


