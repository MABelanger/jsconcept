# Redux
Is to represent all the state of the application. All Mutations is explicit so it is possible to get track of all of them. If the state of the application is a simple counter, the state of all application can be represented by a single number. But as the application complexity grow, it is better to use a complex object.

Example of simple counter state
```
current state: 0
current state: 1
current state: 2
...
```
Example of multiple counter state that used with `array`.
```
current state: []
current state: [0]
current state: [1,0]
...
```

The principle of Redux, every thing that change in the application included the `data` and the `UI state` is contain in a `single object` within the `state` or the `state tree`.

The second principle of redux is that state tree is `read only`.

Every time we want to change the state, we need to `dispatch` an `action`. An `action` is a plain JS object that describe the change.

`the action` : is the minimal representation of the change of that data. It is not the data itself. It describe what to do to change the data. It's a plain object that describe what happen in ours apps.

The only way to change the `state tree` is by dispatching an `action`. It can be triggered by a `user request` or an `network request`. Any data have to pass by action.


## Pure function vs Impure function

`Pure function` are predictable. The return value depend only on the value of they arguments. They don't have side effect such a network or database call. It just calculate the new value. The same argument => the same value. Also, they do not modify the value passed to them.

```js
function square(x) {
  return x * x;
}

function squareAll(items) {
  return items.map(square);
}
```

In the opposite, the `impure function` may call the database. They may be have side effects, they may overwrite the value passed to them.

```js
// call db
function square(x) {
  updateXInDatabase(x);
  return x * x;
}

// Modify the input
function squareAll(items) {
  for (let i = 0; i< items.length; i++) {
    items[i] = square(items[i]);
  }
}
```

The redux function need to be pure.


The state mutation in the app need to be describe as a pure function.

It take the `previous state` and the `action` to be dispatch and return the `next state` of your application.

If only one state has change, the other states that has not changed can keep the same reference as the previous object state.

The pure function that take the `old state` and return `new state` is called the `reducer`.


Reducer accept state and action as argument. and return the new state.

If the action is not understand, it return the current state. If the state is undefined, it must return the initial state of the application that we put with the default ES6 argument.
```js
const counterReducer = (state = 0, action) => {
  if (action.type === 'INCREMENT') {
    return state + 1;
  } else if (action.type === 'DECREMENT') {
    return state - 1;
  } else {
    return state;
  }
}
```

## The store
To create a store we need to bind a reducer.

```js
import { createStore } from 'redux';
const counterStore = createStore(counterReducer);
```

### The 3 importants method of the store

#### getState()
It retreive the current state of the redux store

```js
console.log(store.getState()); // 0
```
#### dispatch()
That dispatch action that the store need to be execute.

```js
store.dispatch( {type: 'INCREMENT'} );
console.log(store.getState()); // 1
```

#### suscribe()
It register a callback that the redux store will call any time an action has been dispatched so you can update the UI of the application to retrive the current state of the application.

```js
// the render method is called each time a store is updated.
store.subscribe(render);
```

```js
const render = () => {
  console.log('This is a new data from the store', store.getState());
}
store.suscribe(render);
render(); // Call it on the init.
```


The store do not mutate the state, it need to return a copy of modified version of the state.


Because the store notify `call subscribe method`, we can safely use the store to pass it to the props of the component `value={store.getState()}`

Since the state is hold inside the redux store, we can use `dumb component` a simple functions that do not hold a buisneses logic, only a renderable output we can declare as a `const` function.

## Test function
We can use `expect` to test the function and `deep-freeze` to check if the value has been mutated. To avoid mutation of the state, we can use `Object.assign()` as a part of ES6. That function assign properties of several objects on to the target object. The first argument is the target object, the one that he is going to be mutated. Every further argument is considering as the source object so they properties will be copied to the target object. If is the source has the same properties, the last one will win.

```js
const incrementCounter = (list, index) => {
  let listCopy = Object.assign([], list);
  listCopy[index]++;
  return listCopy;
};

const testIncrementCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];

  deepFreeze(listBefore); // Test to avoid mutation.

  expect(incrementCounter(listBefore, 1))
    .toEqual(listAfter);
}

testIncrementCounter();

console.log('All test passed!');
```
We can also use the spread operator `...` with `stage2-preset` to do the same thing as `Object.assign()`

```js
return {
  ...state,
  completed: !state.completed
};
```

## reducer composition
The main single top level reducer can call other reducer that delegate and abstract the way some part of the state they manage. So one reducer can be called by another reducer.

## Appendix

To demonstrate how react store work, This is a simple logic store that react implement.
```js
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }

  const subscribe = (listener) => {
    listener.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  // initial value
  dispatch({});

  return { getState, dispatch, subscribe };
}
```
