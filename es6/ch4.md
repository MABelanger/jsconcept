## ES6 Modules and Classes
The class still consider wrapper of constructor of ES5.
good reference : [mozilla.org:class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
> **Note:** When we load module in ES6 it always load it in `strict mode`. So, when we do not declare variable with `let` or `var` we get an error `runtime error : variable undefined in strict mode`.

The `import` and `export` is the basic way to communicate between modules to share informations.

```js
// File base.js:
import { projectId } from './module1.js';
console.log(projectId);
```
```js
// File module1.js:
export let projectId = 99;
```

So the variable projectId get imported from module1. It possible to export many variables. We assign alias to the imported variable with the keyword `as`
```js
// File base.js:
import { projectId as id, projectName } from './module1.js';
console.log(`${projectName} has id: ${id}`);
```
```js
// File module1.js:
export let projectId = 99;
export let projectName = "BuildIt";
```

> **Note:** The import statement get hoisted first. So dependency will executed first.

```js
// File base.js:
console.log("starting in base");
import { projectId as id, projectName } from './module1.js';
console.log("ending in base");

```
```js
// File module1.js:
export let projectId = 99;
console.log("in module1");

// in module1
// starting in base
// ending in base
```

We can specify a default value with `export default` that it can be use without or with an alias name.
```js
// File base.js:
import someValue from './module1.js';
import { default as someValue2 } from './module1.js';
console.log(someValue); // BuildIt
console.log(someValue2); // BuildIt

```
```js
// File module1.js:
export let projectId = 99;
let projectName = 'BuildIt';
export default projectName;
```


We can export `as default` if we export multiple object at once.
```js
// File base.js:
import someValue from './module1.js';
console.log(someValue); // BuildIt

```
```js
// File module1.js:
export let projectId = 99;
let projectName = 'BuildIt';
export {
 projectId as default,
 projectName
};
```

We can use `import *` the * refer to all the exports, so we get an object of the exported values. When we use the * the alias `as` is require.

```js
// File base.js:
import * as values from './module1.js';
console.log(values); // { projectId : 99, projectName: 'BuildIt' }

```
```js
// File module1.js:
export let projectId = 99;
let projectName = 'BuildIt';
export {
 projectId,
 projectName
};
```

The imported name can not be reuse. It read only like a const but the property on it can be modify on the exported module.

```js
// File base.js:
import { project, showProject } from './module1.js';
project.projectId = 8000;
showProject();
console.log(project.projectId); // 8000

```
```js
// File module1.js:
export let project = { projectId: 99 };
export function showProject() {
  console.log(project.projectId); // 8000
};
```

> **Note:** the export work with name export, when we export we only export the name, so it is possible to update the name so it can point to other function or value

### Class Fundamentals
It a new syntax to work with prototypes and constructor function that we where used in ES5.

You can think of the class is a constructor function as used in ES5.
```js
class Task {

}
console.log(typeof Task); // function
```
Like new object in ES5
```js
class Task {
}
let task = new Task();
console.log(typeof task); // object
```
We are able to determine the class of an instantiate object using `instanceof`
```js
class Task {
}
let task = new Task();
console.log(task instanceof Task); // true
```
To add a function we can use short hand notation without keyword function

```js
class Task {
  showId() {
    console.log('99');
  }
}
let task = new Task();
task.showId(); // 99
```

The function exist as a prototype. So adding a method to a class is similar to adding the method to the prototype object. This is a good example that constructor function and adding method to the prototype in ES5 is still that in ES6. We just have a new Class syntax for it.
```js
class Task {
  showId() {
    console.log('99');
  }
}
let task = new Task();
console.log(task.showId === Task.prototype.showId); // true
```

We can use constructor in a class by adding `constructor()`. So just by creating a new instance of task, the constructor() will be call.
```js
class Task {
  constructor() {
    console.log('constructing Task');
  }
}
let task = new Task(); // constructiong Task
```

We can't declare variable directly inside a class, we get a syntax error.
```js
class Task {
  let taskId = 9000; // Syntax Error
  constructor() {
    console.log('constructing Task');
  }
}
let task = new Task();
```
The class are not hoisted, we get an error if we try to call it before we declare it.

```js
let task = new Task(); // Error use before declaration
class Task {
  constructor() {
    console.log('constructing Task');
  }
}
```
We can use class within an expression :
```js
let newClass = class Task {
  constructor() {
    console.log('constructing Task');
  }
};

new newClass(); // constructing Task
```
In ES5 we can use `call()` to pass this to the object.
```js
let Task = function() {
  console.log('constructing Task');
};
let task = {};
Task.call(task); // constructing Task
```

We can't call the `call()` in order to change the this object.
```js
class Task {
  constructor() {
    console.log('constructing Task');
  }
};
let task = {};
Task.call(task); // Error: class constructor cannot be called with the new keyword
```

By creating a class we are not polluting the global name space like function:. It does not placed in the `window` object.
```js
function Project() { };
console.log(window.Project == Project) // true
```

```js
class TaskClass { }
console.log(window.TaskClass == TaskClass) // false
```

## extends and super
The hesitance with classes in ES6 still the same as ES5 with prototype
// rapid javascript treaning that explain prototype
We can use extend keyword to extend to prototype in ES6. Within a constructor or a method of a class, we can call `super` to explicitly access a function on the prototype.

In ES6 the constructor is called when we extend that object.
```js
class Project {
  constructor() {
    console.log('constructing Project');
  }
}
class SoftwareProject extends Project {
}
let p = new SoftwareProject(); // 'constructing Project'
```
If we don't have a constructor method inside the extended class, it automaticly call `super()` with all the arguments.
```js
class Project {
  constructor(name) {
    console.log("constructing Project:" + name);
  }
}
class SoftwareProject extends Project {
}
let p = new SoftwareProject("myName"); // "constructing Project: myName"
```

If we use `super()` the javascript engine know that it need to instantiate `Project` fist and then `SoftwareProject`.

```js
class Project {
  constructor(name) {
    console.log("constructing Project");
  }
}
class SoftwareProject extends Project {
  constructor() {
    // we need the super()
    // if not we get Reference Error: this is not defined
    super();
    console.log("constructing SoftwareProject");
  }
}
let p = new SoftwareProject();
// "constructing Project
// "constructing SoftwareProject
```

> **Note:**  We need `super()` if we use the constructor on the extend class. The rule of thumb is to use super each time we use a constructor

The method `getTaskCount()` get call by prototype chain.
```js
class Project {
  getTaskCount() {
   return 50;
  }
}
class SoftwareProject extends Project {
}
let p = new SoftwareProject();
console.log(p.getTaskCount()); // 50
```

We can overriding function as in Java. Is not like ES5 that we need to use different name method.
```js
class Project {
  getTaskCount() {
   return 50;
  }
}
class SoftwareProject extends Project {
  getTaskCount() {
   return 66;
  }
}
let p = new SoftwareProject();
console.log(p.getTaskCount()); // 66
```

We can access the parent function with `super.` By calling `super.getTaskCount()` the Js engine will lookup in the prototype chain to find `getTaskCount()` and if find it in Project

```js
class Project {
  getTaskCount() {
   return 50;
  }
}
class SoftwareProject extends Project {
  getTaskCount() {
   return super.getTaskCount() + 16;
  }
}
let p = new SoftwareProject();
console.log(p.getTaskCount()); // 66
```

We can use super with object literal if we specify the prototypeOf by linking the two object together. So using super is valid with object literal by making shure that prototype set right.

```js
let project = {
  getTaskCount() {
   return 50;
  }
}
let softwareProject = {
  getTaskCount() {
   return super.getTaskCount() + 16;
  }
}
Object.setPrototypeOf(softwareProject, project);
console.log(softwareProject.getTaskCount()); // 66
```

### Properties for Class Instances
We can have properties at the class level

They are no difference in the instance space than `ES5` and we always use the `this` keyword as ES5. By using let in the constructor, it goes out the scope and it won't be attached to an instance.
```js
class Project {
  constructor(name) {
    let privateVar = 'Hello';
    this.location = 'Maztlan';
  }
}
class SoftwareProject extends Project {
  constructor() {
    super();
  }
}
let p = new SoftwareProject();
console.log(p.location); // Maztlan
console.log(p.privateVar); // undefined
```

with this, we can access the `this.location` across constructor.

```js
class Project {
  constructor(name) {
    this.location = 'Maztlan';
  }
}
class SoftwareProject extends Project {
  constructor() {
    super(); // Always call super before access this.
    this.location = this.location + ' Beach';
  }
}
let p = new SoftwareProject();
console.log(p.location); // Maztlan Beach
```

### Static Members
We can access `static` method if we do not `instantiate` the Object.  By declaring a static method, the method get attached directly to Project as a constructor function.
```js
class Project {
  static getDefaultId() {
    return 0;
  }
}
console.log(Project.getDefaultId()); // 0
```
We can't access a static method if we instantiate the object.
```js
class Project {
  static getDefaultId() {
    return 0;
  }
}
var p = new Project();
console.log(p.getDefaultId()); // TypeError: p.getDefaultId is not a function
```
We can't create static variable inside the class, static is only used with method.

```js
class Project {
  static let id = 0;
}
console.log(Project.id); // Syntax Error: ( expected
```
We can still create static property like we do in ES5 by attaching directly to the class or constructor function.

```js
class Project {
}
Project.id = 99;
console.log(Project.id); // 99
```

### new.target
The `new.target` will always point to the inital constructor that called.
