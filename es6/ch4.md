## ES6 Modules and Classes
The class still consider wrapper of constructor of ES5.

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

So the variable projectId get imported from module1. It possible to export many variables.
```js
// File base.js:
import { projectId, projectName } from './module1.js';
console.log(`${projectName} has id: ${projectId}`);
```
```js
// File module1.js:
export let projectId = 99;
export let projectName = "BuildIt";
```
