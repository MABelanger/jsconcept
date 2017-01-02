1. How is JavaScript [[Prototype]] chain not like traditional/classical inheritance ?
	Does not copy by passing the attribute of the parent.

2. What does "behavior delegation" mean and how does it describe object linking in JS ?
	When object call object of property on one object and can't handel it, it delegate up his Prototype
	chain to another object.

3. Why is "behavior delegation" as a design pattern a helpful thing ? What are the tradeoffs ?
	1. You don't have copy of the function.
		So the parent can change during the runtime
	2. The downside is shadowing a function is awkward.
		Everything is public
		Prototype is nice because you get only one copy of the method
			But every prototype function is public.

	95 % of the time we can use module pattern because we don't create multiple instances.
	5% use delegation and choose the oloo style without using the new pattern.