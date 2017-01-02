Closure is when a function remembers it's lexical scope even when the function is executed
outside that lexical scope.

Ex:. 

function foo() {
	var bar = "bar";

	function baz() {
		console.log(bar);
	}

	bam(baz);
}

function bam(baz) { // The function is passed as argument
	baz(); // <- bar is accessible
}

foo();


/* 
	This will print i: 6 
	6 times
	because each i is in the same scope
*/
for( var i=1; i<=5; i++) {
	setTimeout(function(){
		console.log("i: " + i);
	}, i*1000);
}

/*
	Inside an iife
	we get a new i into different scopes
	we want a scope for each itteration
*/
for( var i=1; i<=5; i++) {
	(function(i){
		setTimeout(function(){
			console.log("i: " + i);
		}, i*1000);
	})(i);
}

/* 
	closure : loops + block scope
	the let keyword
	It binding the i not just for the for loop
	it rebind the i for each itteration of the for loop
	It create a brand new i for each itteration.
*/
for( let i=1; i<=5; i++) {
	setTimeout(function(){
		console.log("i: " + i);
	}, i*1000);
}