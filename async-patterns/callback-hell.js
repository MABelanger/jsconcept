/*
	Callback hell 
	continuation passing style
*/

function one(cb) {
	console.log("one");
	setTimeout(cb, 1000);
}

function two(cb) {
	console.log("two");
	setTimeout(cb, 1000);
}

function tree() {
	console.log("tree");
}

one(function(){
	two(tree);
});