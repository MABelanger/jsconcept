## Connecting React To Redux
064:
To connect your react component with Redux we use `react-redux` library.

React is a fondamental way to handle states, you can use redux for other libraries, like anguler, amber, jquery or plain vanilla JS. With angular we use `ng-redux`. Redux was created to an alternative facebook flux.


`react-redux` consist of two core items. The `provider component` and the `connect functions`.

`Provider component` wrap your all your application. This is how it attach with the react store so you don't need to pass your store to all your components that might need it. So provider avoid this to making your store avalible to all your components automatiquely.

```js
<Provider store={this.props.store}>
  <App/>
</Provider>
```



The connect function create the connect function for you

### React Context
Useful for library authors, dangerous for developper.

### connect
Wraps our component so it's connected to the Redux store.
the function `connect()` component to the store.
```js
// What state should i expose as props ?
// That component will sucribe to component Update
// Every time is update, mapStateToProps will be called.
// It return an object with properties.
// What state component is avalible the container component via props.
// in my component :
// this.props.appstate is avalible to
function mapStateToProps(state, ownProps) {
  // check benefits #3
  return { appState: state.authorReducer };
}


// What actions instead of what state, we want to expose on props.
// bindActionCreators is the callback props.
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch);
  };
}
export default connect(
  mapStateToProps, // fct that specify the states we want to expose the component
  mapDispatchToProps // fct that specify the action would like to expose.
)(AuthorPage);
```

Benefits:
  1. No manual unsubscribe
  2. No lifecycle methods required
  3. Declare what subset of state you want.
  4. Enhanced performance for free


### Reselect library
You can use memoize `memoization` for performance. That cache the function if the function is called multiple time whe logic is comming big. Useful if filtering a list, excpensive calculation.


## 3 ways to handle mapDispatchToProps
<b>1. Ignore it. Use dispatch, use dispatch directly</b>
```js
// In component...
this.props.dispatch(loadCourses())
```



<b>2. Manually wrap with mapDispatchToProps</b>
```js
function mapDispatchToProps(dispatch) {
  return {
    loadCourses: () => {
      dispatch(loadCourses());
    },
    createCourse: (course) => {
      dispatch(createCourse(course));
    }
  }
}

// in component...
// Best for starting...
this.props.loadCourses()
```
<b>3. Use bindActionCreators</b>

```js
function mapDispatchToProps(dispatch) {
  return {
    actions:
      // wrap action creators in dispatch call for you!
      bindActionCreators(actions, dispatch)
  }
}
// In component:
this.props.actions.loadCourses();
```

> Note: in the option #2 and #3 the child component don't have to know about redux. It only know about props call action that they pass down via props.


## A chat with Redux
Component | chat
--- | ---
React | Hey CourseAction, someone clicked to `save course` button.
Action | Thanks React! I will dispatch an action so reducers that care can update state.
Reducer | Ah, thanks action. I see you passed me the current state and the action to perform. I'll make a new copy of the state and return it.
Store | Thanks for updating the state reducer. I'll make sure that all connected components are aware.
React-Redux Woah, thanks for the new data Mr.Store. I'll now intelligently determine if I should tell React about this change so that it only has to bother with updating the UI when necessary.
React | Ooo! Shiny new data has been passed down via props from the store! I'll update the UI to reflect this!


## Container vs Presentation Components.
We only connect container to redux a presentation component will know nothing about redux they are juste receive what they need via props. We use `react-redux` to connect our component to redux. Wrapping our app with `provider` and `connect` container component to the redux store.

`mapStateToProps` determine what state we want to expose on ours containers component via props.

`mapDispatchToProps` Let us declare what action we want to expose as via props with 3 differents ways to use mapDispatchToProps
