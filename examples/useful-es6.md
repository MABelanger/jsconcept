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
```

Or with spread operator
```js
const incrementItem = (list, index) => {
  return [
    ...list.slice(0, index),
    list[index] +=1 ,
    ...list.slice(index + 1)
  ]
};
```
