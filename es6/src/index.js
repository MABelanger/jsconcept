class Project {
  constructor(){
    let id = '0';
  }
}
Project.id = 99;
console.log(Project.id); // 99

let p = new Project();
console.log(p.id);
