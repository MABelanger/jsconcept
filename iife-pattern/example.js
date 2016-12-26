// immediately invoked function expression (IIFE)
var foo = "foo";

(function(){
	var foo = "foo2";
	console.log(foo);
})();
