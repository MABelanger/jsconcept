// Scope: Hoisting

a; // ?
b; // ?
var a = b;
var b = 2;
b; // 2
a; // ?

// In the compilation phase, find the declaration first
// So the code will become
// The var move to the top, they are treated first during the 
// compiled phase 

// Hoisting = move var to the top during the compiled phase.
var a;
var b;
a; // ?
b; // ?
a = b;
b = 2;
b; // 2
a; // ?

/*
	lhs stuff is happening during the compile time
	rhs stuff is happening during the execution time
*/

/* 
	Mutual recursion will be inpossible without hoisting.
	like in C, the header files is manual hoisting have the top.
*/

