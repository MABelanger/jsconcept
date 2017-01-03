/*
	We can now pause inside the function and resume later.
	A generator can pause itself and itterator can resume.
*/

function* gen() {
	console.log("hello");
	yield null;
	console.log("World");
}


var it = gen(); // do not execute function until it call next
it.next(); // print hello
it.next(); // print World

