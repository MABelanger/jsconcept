var statement.
it get split into two parts:
	The declaration part gets hoisted to the top of the function,
	initializing with undefined.
	The initialization part turns into an ordinary assignment. So

		function foo() {
			...
			var myVar = 0,
			    myOtherVar;
		}

		Expand into
		function foo() {
			var myVar      = undefined,
			    myOtherVar = undefined;
			...
			myVar = 0;
		}

So declare all your variable on the top of the function

And, declare all your function before call them.


Always use let statement if possible to do block scope.
