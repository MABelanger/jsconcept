function foo(bar) {
	if (bar) {
		let baz = bar;
		if (baz) {
			let bam = baz;
		}
		console.log(bam); // Error
	}
	console.log(baz); // Error
}

/*
	The let keyword hijack the scope of the block.
	so let exist only insde a block like for loop or if statement...
	basiquely any pair of {}
	let is the new var and encourage to do find and replace each var per let


	Put the let of the top of your block because it is not avialable until it's declared
	Hidden inside of the iife scope
	010 Block Scope in ES6 -02:22
*/

function foo(bar) {
		let (baz = bar) {
			console.log(baz); // "bar"
		}
	console.log(baz); // Error
}

/* 
	Explicit block that can be used.

