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

## Babel
By default babel do not tanspile any thing. We need to put the instruction in witch code we want to transpile. We use configuration json file `.babelrc`

```js
{
  "presets": [
    "react", // <- JSX transformation to ES5
    ["es2015", {"modules": false}]
  ]
}
```
`{"modules": false}` : tell babel do not transform ES6 import module. We want webpack2 to take care of the modules, not babel. The packager can do `tree shaking` that mean, only include code that can run and uglify can take out code.

`{"loose": true}` : That remove creasy edge cases that take place in the bundle.

Babel has two concept `plugin` and `preset`.

A preset is a group of plugins. Do not use `es2015` in productions because it put thing that is not used like generator. Instead specify the thing that you use with plugins.

```js
{
  "plugins" : [
    List of plugins that we want to use...
  ]
}

```

So `babel` transform ES6 to ES5 => `webpack` bundle all import => `uglify` remove the unused code.
`uglify` is included inside webpack, remove dead code and minify and concatanate at the same time.

command line to run webpack
```
$ ./node_modules/.bin/webpack --module-bind='js=./node_modules/.bin/babel' src/main.js ./out.js
```

So webpack execute loader like `babel` that is executed in the middle of the bundle phase

It's easy to use `webpack.config.js` files

```js
const path = require('path');

movule.exports = {
  context: __dirname,
  entry: './js/ClientApp.js',
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/public')
    filename: 'bundle.js'
  },
  resolve : {
    extensions: ['.js', '.json']
  },
  stats : {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      include: path.resolve('js'),
      test: /\.js$/,
      loader: 'babel-loader'
    ]
  }
};
```

`__dirname` : this is the root directory that node is running.

`eval` : is the faster way then `source-map`, that enable you to get the right line of code in ES6 when error occur. Note that we do not recommand using devtool in production build.

`resonve.extention []` is the progression of trying file extention when we use `import myImport './myFile'`

`stats` : Stuff that we want webpack to report on.

`module.rules` : If it past the test, run `babel-loader`

`module.include`: Tel webpack to include only directory to run babel, that speed up build.

`module.exclude` : `/node_modules/` Do not babel node_modules

The npmScript replace the gulp and grunt.

## Watch files with webpack

```
$ webpack --watch
```
Or: the first `--` mean webpack command and the second `--` is the parameters put to webpack. We can easily add flag to the command of the npm script. So it run : `webpack "--watch"`
```
$ npm run build -- --watch
```
## Watch inside script:
```js
"script" : {
  "build": "webpack",
  "watch": "npm run build -- --watch"
}
```

## Web component vs react component
We need to use upperCase when is `react component` and lowerCase when is `web component` when you want to put it to the dom. Example :

```js
<div>
  <x-my-web-component>
  <MyTitle title='bla'/>
</div>
```

## Css in javascript
`radium` and `affro dady`. Do css in javascript in one place.


## Plug css-loader into webpack
`url: false` tel webpack to do not include images into bundle.js
```js
{
  test: /\.css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: [
        url: false
      ]
    }
  ]
}
```
The style-loader inject css into the bundle javaScript.

## Dead code elemination from webpack
When we import only the thing that we use, webpack eleminate all the code not used. Example, the render method.

```js
import { render } from 'react-dom';
```

## standard with react
make file `.eslintrc.json`
The `standard-react` is essential.
```js
{
  "extends": ["standard", "standard-react"]
}
```

Inside `package.json` file :
```js
"script": {
  "lint" : "eslint js/**/*.js"
}
```
the `**` will recursively hit the .js file

run `npm run lint -s`, the -s remove the node error.

## Run eslint before webpack run
That only lint files that change.

`inside webpack.config.js`

```js
module: {
  rules: [
    {
      enforce: 'pre',
      test: /\.js$/
      loader: 'eslint-loader',
      exclude: /node_modules/
    }
  ]
}
```

## React Router
Router v4 is alpha right now but is good to change.

Example of landing page

```js
import React from 'react';

const Landing = React.createClass({
  render () {
    return (
      <div className='landing'>
        <h1>svideo</h1>
        <input type='text' placeholder='Search />'
        <a>Browse all</a>
      </div>
    );
  }
});

export default Landing
```

## Example of clientApp.js
```js
import { render } from 'react-dom';
import { HashRouter, Match } from 'react-router';
import Landing from './Landing';
import '../public/styles.css'

const App = React.createClass({
  render () {
    return (
      <HashRouter>
        <div className='app'>
          <Match exactly pattern='/' component={Landing} />
        </div>
    )
  }
});

render(<App />, document.getElementById('app'));
```

## Higher order component or behiaviour oriented components
Is a component that has no display. It's don't show to the user any thing. It's only encapsulate behiaviour. like `HashRouter` and `Match`.

## Comment inside jsx
```js
{/* comment */}
```
