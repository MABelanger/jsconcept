## Action creator
The actions creator is the function that return an action. By convention the name of the action creator is the same as the `action.type` Example :

```js
rateCourse(rating) {
  return { type: RATE_COURSE, rating: rating }
}
```

## Redux Store
You pass the main reducer function to the store. In `Flux` the store contain the data and the logic but in `Flux` the store simply `store data`. The only way to changing the store is by dispatching an action.

```js
let store = createStore(reducer);

// functions that can be used
store.dispatcn(ObjAction)
store.subscribe(renderMethod) // Listener
store.getState() // Return the state Tree.
```

## Reducer
Handle state changes. It find out witch action to do usually with `switch/case` statement of the `action.type`. It keep state immptable.

```js
function myReducer(state, action) {
  switch (action.type) {
    case 'ADD_ADMIN' : return Object.assign({}, state, {role: 'admin'});
  }
}
```

## React-Redux Provider
The Provider attache the app to the store. This use React Context between child.
```js
<Provider store={this.props.store}>
  <App/>
</Provider>
```

## Connect()
The function wrap the component so that it connect to the redux store. We can determine witch part of the store we want to attach to props `mapStateToProps`. And we declare what action we want to expose to props `mapDispatchToProps`. the `bindActionCreators(actions. dispatch)` is a part of redux.


```js
function mapStateToProps(state) {
  return {
    rolesState: state.roles // this.props.rolesState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions. dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorPage);
```



In order to change state we need to return a new Object. Primitives Type in JavaScript is already immutable.
* Number
* String
* Boolean
* Undefined
* Null

But We need to create new Object with  Mutable type like :
* Objects
* Arrays
* Functions

To copy object, we can use `Object.assign(target, ...sources)` and we can make sure that the source is not modified with `deepFreeze()` Example:

```js
let stateCopy = Object.assign({}, stateTarget, {role: 'admin'});
deepFreeze(stateTarget);
```
