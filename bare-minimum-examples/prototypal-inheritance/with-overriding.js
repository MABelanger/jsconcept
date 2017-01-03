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