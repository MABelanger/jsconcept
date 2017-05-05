## New stuff

```
## Managing states
`setState()` will kick off reRender method for that particular element.
```js
  this.setState({myState: event.target.value});
```
The bad way to do it is not using setState() and use `forceUpdate()`. This is only useful when we use other library that need to master his own data like `D3` or `jquery` that tel react hey i changed my stuff can you call render() method.

```js
  this.state.myState = event.target.value;
  this.forceUpdate();
```

The most difficult part of debugging a non-react like jquery is to debug `state over times.` But with react, we can force the state to a component like a snapshot with that particular state and this is what the app look like.
