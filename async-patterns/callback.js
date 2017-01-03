/*
	The callback don't wait syncronously
	It split the program, so it can print 
	Hello
	World !
	and come back 1000ms later print callback!
*/

console.log("Hello, ");

setTimeout(function(){
	console.log("callback!");
}, 1000);

console.log("World !");