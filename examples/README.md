## The explicit binding rule

The call() or apply() method calls a function with a given
this value and arguments provided individually.

```js
function printConsole() {
  console.log(this.text);
}

function printHello() {
  this.text = "Hello";
	printConsole.call(this);
}
printHello();
```

```js
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2
};

foo.call( obj ); // 2
```

## Prototypal Inheritance


### Classical overriding
```js
/*
	The parent Vehicle
*/
function Vehicle(speed) {
	this.speed = speed || 0;
}

Vehicle.prototype.getSpeed = function(){
	return this.speed;
};


/*
	The child Car
	we added name property
 */
function Car(speed, name) {
	// "super" constructor call
	Vehicle.call(this, speed);
	this.name = name || "Default";
}

// link Car prototype to Vehicule
Car.prototype = Object.create(Vehicle.prototype);

Car.prototype.getSpeed = function() {
	// "super" call (assign obj to this.)
	return Vehicle.prototype.getSpeed.call(this);
};

Car.prototype.getName = function() {
	return this.name;
};

/*
	the main()
 */
var toyota = new Car(200, "Toyota");
console.log(toyota.getName()  + " has a speed of " + toyota.getSpeed() + "km/h");
```


### Delegate style OOLO
We use the prototype chain to do kind of heritance.

```js
/*
	The Vehicle
*/
var Vehicle = {
	init: function(speed) {
		this.speed = speed || 0;
	},
	getSpeed: function() {
		return this.speed;
	}
};

/*
	we added name property
 */

 // link Car to Vehicule
Car = Object.create(Vehicle);

// We do not choose the same name as init() to avoid overriding.
Car.initCar = function(speed, name) {
	// call init with proto chain
	this.init(speed);
	this.name = name || "Default";
};

Car.getSpeedCar = function() {
	return this.getSpeed();
};

Car.getNameCar = function() {
	return this.name;
};

/*
	the main()
 */
var toyota = Object.create(Car);
toyota.initCar(200, "Toyota");

console.log(toyota.getNameCar()  + " has a speed of " + toyota.getSpeedCar() + "km/h");
```
