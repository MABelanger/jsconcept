class Task {
  constructor() {
    console.log('constructing Task');
  }
};
let task = {};
Task.call(task);
