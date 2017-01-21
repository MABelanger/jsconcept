class Project {
  constructor(name) {
    this.location = 'Maztlan';
  }
}
class SoftwareProject extends Project {
  constructor() {
    super();
  }
}
let p = new SoftwareProject();
console.log(p.location);
