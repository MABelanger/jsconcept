/*
	The explicit binding rule
	The call() or apply() method calls a function with a given
	this value and arguments provided individually.
*/

function printConsole() {
	console.log(this.text);
}

function printHello() {
	this.text = "Hello";
	printConsole.call(this);
}
printHello();


/*************************************************
	Another example
**************************************************/
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2
};

foo.call( obj ); // 2