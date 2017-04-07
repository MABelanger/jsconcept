# Render function

Every components in react must have `render()` method and that `render()` method must return html markup. The render method must be pure function so it always return the same result and not modify any states.

React is all made with component that contain components that contain components...

```js
var div = React.DOM.div;
var h1 = React.DOM.h1;

var myTitle = React.createClass({
  render : function () {
    return (
      div(null,
        h1(null, 'checkout out')
      )
    )
  }
});

var myFirstComponent = React.createClass({
  render: function() {
    return (
      div(null,
        React.createElement(myTitle),
        React.createElement(myTitle),
        React.createElement(myTitle)
      )
    )
  }
});

ReactDOM.render(
  React.createElement(myFirstComponent),
  document.getElementById('app')
)
```
We can use factory instead using `React.createElement()`
```js
var myTitleFactory = React.createFactory(myTitle)

var myFirstComponent = React.createClass({
  render: function() {
    return (
      div(null,
      myTitleFactory(null),
      myTitleFactory(null),
      myTitleFactory(null)
      )
    )
  }
});
```

Props is read only properties. `this.props.title`
1. `this` refer to the object inside `createClass()`
2. `props` are the thing that parent pass to me.
3. `title` is matching the property of the props.

We can pass all references or value to props as normal java script do. function, object, ect....

```js
var myTitle = React.createClass({
  render : function () {
    return (
      div(null,
        h1(null, this.props.title)
      )
    )
  }
});

var myFirstComponent = React.createClass({
  render: function() {
    return (
      div(null,
        React.createElement({title: 'props are the best'}),
        React.createElement({title: 'props are the best'}),
        React.createElement({title: 'props are the best'})
      )
    )
  }
});
```

To apply style inside react we use the attribute object `color`

```js
React.DOM.h1( {style: {color: 'red', fontWeight: 'bold'} } , 'My Title')
```
## Tooling - Standard
`standard` check the rule with eslint. It force you to a preconfigure eslint that you can't modify. It force you to not use semi-column but it exist `semi-standard` that force you to use semi-column.
```
$ npm install -g standard
```
To disable global error, use pragma. The pragma is a term to put eslint rule comment at the top of the file.
```js
/* global React ReactDOM */
```
To fix the error we can run
```
$ standard --fix
```

## Webpack
The basic usage of webpack is that it take all your modules and put together on one file.

```
# Dev mode with the debbug tools.
$ webpack js/app.js dist/bundle.js
# Production mode
$ NODE_ENV=production webpack -p js/app.js dist/bundle.js
```
