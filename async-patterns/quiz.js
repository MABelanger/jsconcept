1. What is "callback hell" ?
	Why do callbacks suffer from "inversion of control" ?
		Callback inside a callback.
		It give to the utility all control.

2. How do you pause a generator ?
		yeield
	How do you resume it ?
		.next()

3. What is a Promise ?
		It is a promise of a feature value.
	How does it solve inversion of control issues ?
		Instead of passing my contunation in, i receive a promese back
		so it uninvert the inversion of control so you can decide what to do.

4. How do we combine generators and promises for flow control ?
	You yeield out a promise and the promise when it complete 
	automatic restart the generator with .next()
