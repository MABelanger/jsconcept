// Closure: classic module pattern

var foo = (function(){

	var o = { bar: "bar" };

	// like public API (encapsulation), principle of least exposure
	return {
		bar: function(){ // return a inner function
			console.log(o.bar);
		}
	};
})(); // <- outer wrapper

/*
	they must be an outher wrapping function and closing function  
	from inside of that function must return at least one or more innter function
*/