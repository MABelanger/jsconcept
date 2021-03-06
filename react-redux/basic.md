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

## reducer composition pattern
The main single top level reducer can call other reducer that delegate and abstract the way some part of the state they manage. So one reducer can be called by another reducer.

When we work with list, is hard to understand how the list of object is updated and how the object is updated. In this case, we use reducer composition to delegate to another reducer the task to update the single object.

Any time a function do to many thing, you want to extract other functions from it. So every function only address a single concern.


Different peoples on the team can work on different reducer handle the same action without causing merge conflict.
Example of `reducer composition pattern` the **todoReducerList** delegate to the **todoReducerObj**

It is recommended to return by default the current state.
```js
const reducerAdd = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT' :
      return state + 1;
    default :
      return state;
  }
};

const reducerSub = (state = 0, action) => {
  switch (action.type) {
    case 'DECREMENT' :
      return state - 1;
    default :
      return state;
  }
};

const calcApp = (state = {}, action) => {
  return {
    add : reducerAdd( state.add, action ),
    sub : reducerSub( state.sub, action )
  }
}
```
```js
store.dispatch({type : 'INCREMENT'})
{
  add:0
  sub:0
}
```
The reducer composition is so common in react that react did a `combineReducers`

The todos field inside the state object will be updated by the state reducer. And the visibilityFilter Field inside the state object will be updated by calling the visibilityFilter reducer. And the result will be assamble into a single object state.
It generate one reducer `todoApp` from other reducer `todos` and `visibilityFilter` delagate to them a part of the state three.
```js
const todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
});
```

The convention is to call the reducer the same name of the state
field they manage so we can benifit of the ES6 shorthand object notation

```js
const todoApp = combineReducers({
  todos,
  visibilityFilter
});
```

```js
const calcApp = combineReducers({
  add : reducerAdd,
  sub : reducerSub
})
```

Remplementation of combineReducers

```js
const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](
          state[key],
          action
        );
        return nextState;
      },
      {}
    )
  }
}
```


```js
<input ref={node => {
  this.input = node;
}} />
```

We can dispatch 'TOGGLE_TODO' action with

```js
<li
  key={todo.id}
  onClick={(e)=>{
    store.dispatch({
      type: 'TOGGLE_TODO',
      id: todo.id
    });
  }}
  style={{
    textDecoration:
      todo.completed ?
        'line-through' :
        'none '
  }}
  >
```

To assign a value of the component html or react, use `ref=`

```js
<input ref={node => {
  this.myRef = node;
}} />
<button onClick={(e) => {
  this.myRef.value = '';
}}
```
25-egghead

## Passing the store down implicitly via context
Instead passing the store for each component down to the props children, even if they don't need it, we can pass the store to the advance react feature `context`. We should avoid context in react because it bypass the encapsulation, is like declaring global variable and it contradict the react philosophy of explicit data flow.

To use the context, we need to use provider inside the main render method. Each children can have access of the return of the `getChildContext()` of the provider.

In order to enable the context in the child component, we need to specify `childContextTypes` To the component that call `getChildContext()` in this case the Provider. The `childContextTypes` is just react propTypes definition.

```js
class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store
    }
  }
  render() {
    return this.props.children;
  }
}
Provider.childContextTypes = {
  store: React.PropTypes.object
}

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root');
)
```

For class component, in each component, we can access the context with `this.context` If the component is called `VisibleTodoList`, we need to specify this `contextTypes` to specify the context we want to receive.

```js
const { store } = this.context;
```

```js
VisibleTodoList.contextTypes = {
  store: React.PropTypes.object
}
```

For functional component that don't have `this`. It is passed context as argument after props. Like the container component, you need to specify the contextTypes.

```js
let AddTodo = ( props, context ) => {
  console.log(context); // -> Object {store: Object}
}
AddTodo.contextTypes = {
  store: React.PropTypes.object
}
```

## Provider inside react-redux
Instead of creating manualy the Provicer, we can use this is react binding to the redux library.
```js
  import { Provider } from 'react-redux';
```

All container component is verry similar, they need to :
1. Rerender when the store state change
2. They need to unsubscribe from the store when they umount
3. They take the current state of redux store and use it to render the `presentation component` with some props that they calculate from the state of the store.
4. They need to specify the `contextTypes` to get the store from the context.

To do this we can use `mapStateToProps` witch take the redux store and return the props that they need to pass to the presentation component that need to render the current state. It map the `store` argument to the `props` of the component.

```js
const mapStateToProps = ( state, ownProps ) => {
  return {
    active : ownProps.filter === state.visibilityFilter
  };
};
```


```js
const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch({
        type : 'TOGGLE_TODO',
        id
      });
    }
  }
}
```


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
