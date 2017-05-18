## Apply filter to an array

```js
let items = [1, 2, 3];

const getFilterItems = (item, items) => {
  let newItems = items.filter( i => i >= item);
  return newItems;
}
console.log(getFilterItems (2, items)); // [ 2, 3 ]
```

# Modify array without mutating

## concatenate two array and append at the end
```js
console.log( [1,2].concat([0]) ); // [1, 2, 0]
console.log( [...[1,2], 0] ); // [1, 2, 0]
```

## Remove item without mutating
```js
const removeItem = (list, index) => {
  return list
  .slice(0, index)
  .concat(list.slice(index + 1, list.length))
};
```
or with spread operator
```js
const removeItem = (list, index) => {
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ]
};
```

## Increment item withut mutation
```js
const incrementItem = (list, index) => {
  return list
    .slice(0, index)
    .concat(list[index] + 1)
    .concat(list.slice(index + 1));
}
console.log(incrementItem([1, 2, 3], 0)); // [ 2, 2, 3 ]
```

Or with spread operator
```js
const incrementItem = (list, index) => {
  return [
    ...list.slice(0, index),
    list[index] + 1 ,
    ...list.slice(index + 1)
  ]
};
```

## Test if mutation
```js
import deepFreeze from 'deep-freeze';

const before = [1, 2, 3];
const after = [2, 2, 3];

deepFreeze(before);

expect(
  incrementItem(before, 0)
).toEqual(after);
```

## Change only part of object without mutating it.

### Object.assign()
```js
const changeFirstName = (person, firstName) => {
  return Object.assign({}, person, {
    firstName
  })
};

const aPerson = {
  firstName: 'fred',
  lastName : 'allair'
};

changeFirstName(aPerson, 'fred2');
```
### Spread operator object proposal ES7
can be used with babel `stage2-preset`
```js
const changeFirstName = (person, firstName) => {
  return {
    ...person,
    firstName
  }
};

const aPerson = {
  firstName: 'fred',
  lastName : 'allair'
};

changeFirstName(aPerson, 'fred2');

```
