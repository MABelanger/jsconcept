/*
	We use the prototype chain to do kind of heritance.
*/

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