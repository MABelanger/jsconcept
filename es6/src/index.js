function *process() {
  let result = yield;
  console.log(`result is ${result}`);
}
let it = process();
it.next();
it.next(200);
