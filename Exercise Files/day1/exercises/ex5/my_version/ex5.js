var modGetFile = (function() {

	function _getFakeData(url) {
		return "Data of: " + url;
	}

	function _getRandomDelay() {
		return (Math.round(Math.random() * 1E4) % 8000) + 1000;
	}

	function getPromise(url) {
		return new Promise(function(resolve){
			console.log("Requesting: " + url);
			var data = _getFakeData(url);

			setTimeout(function() {
				//console.log("Resolved: " + url);
				resolve( data );
			}, _getRandomDelay() );

		});
	}

	var publicAPI = {
		getPromise: getPromise
	};

	return publicAPI;
})();


var urls = ["http://wwww.bibi.com/text1.txt", "http://wwww.bibi.com/text2.txt", "http://wwww.bibi.com/text3.txt"];

var p1 = modGetFile.getPromise( urls[0] );
var p2 = modGetFile.getPromise( urls[1] );
var p3 = modGetFile.getPromise( urls[2] );

console.log("");
p1
.then(function(data){
	console.log(data);
	return p2;
})
.then (function(data){
	console.log(data);
	return p3;
})
.then (function(data){
	console.log(data);
})
.then (function(){
	console.log("All files has been loaded!");
})