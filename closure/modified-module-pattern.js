var foo = (function(){
	var publicAPI = {
		bar: function(){
			publicAPI.baz();
		},
		baz: function(){
			console.log("baz");
		}
	};

	return publicAPI;
})();

/*
	The advantage is :
		We have an internal reference of publicAPI with a clear name
		You can modify your API at runtime, add remove method, update value
	both foo and publicAPI will be referenced to the same object.
*/