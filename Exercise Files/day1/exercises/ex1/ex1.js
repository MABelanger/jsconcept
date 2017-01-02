(function(){

	var F = function() {
		console.log("F");
		G();
	};

	var D = d;

	var B = function() {
		console.log("B");
		C();
	};
 
	var A = function() {
		console.log("A");
		B();
	};




	function C() {
		D();
	}

	var C;

	function E(f) {
		console.log("E");
		var f = F;
		f();
	}

	function G() {
		console.log("G");

		var H = function() {
			console.log("H");
			I();
		};
		H();
	}

	

	function d() {
		console.log("D");
		E();
	}

	function J() {
		J = function() {
			console.log("J");
			obj.K();
		};
	};

	function I() {
		console.log("I");
		J();
		J();
	}



	var rest = "KLMNOPQRSTUVWXYZ".split(""), obj ={};
	for (var i=0; i<rest.length; i++) {
		(function(i){
			// define the current function
			obj[rest[i]] = function() {
				console.log(rest[i]);
				if (i < (rest.length-1)) {
					// TODO: call the next function
					obj[rest[i+1]]();
				}
			};
		})(i);
	}



	C = function() {
		console.log("C");
		D();
	};

	return A;

})()();
