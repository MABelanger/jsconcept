let idMaker = {
  [Symbol.iterator]() {
    let nextId = 1;
    return {
      next() {
        let value = nextId > 3 ? undefined: nextId++;
        let done = !value;
        return { value, done };
      } // ./next()
    }; // ./return
  } // ./Symbol.iterator
}; // ./idMaker
for (let v of idMaker) {
  console.log(v);
}
console.log(...idMaker);
