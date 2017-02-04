Requirement :

Redux is build on Flux with unidirectional data flow.

In this course :
* Redux
* ES6 with Babel
* React Router
* Webpack
* npm scripts
* ESLint
* Mocha, React Test Utils, Enzyme


## Why Redux
It become the most popular data management library.
* All state is centralize into one Store
* Reduced Boilerplate
* Isomorphic
* Immutable Store
* Hot Reloading
* Time-travel debugging
* Small (2k)

## react-slingshot

## We need to setup
* Automated testing
* linting
* Minification
* Bundling
* JSX compilation
* ES6 transpilation

## Babel-polyfill
Some feature to ES6 can't be transpile to ES6 to ES5
* array.from
* set
* map
* promise
* generators function

You can check if you need polyfill on the babel website (limited support via polyfill)
You can choose specific polyfill like object.assign to 1k

## Mocha
The most popular

## ESLint
The most popular


## Hot Reloading
React and Redux `babel-preset-react-hmre` It work by wrapping your component in a custom proxy using babel.
* It experimental
* Doesn't reload functional components
* Doesn't reload container functions like mapStateToProps




## Place components

```
src
  actions
  api
  components
    common

```

## NodeJs Version
the 6.x branch load four times faster module than the previous Version

## npm scripts over gulp
* simple
* No extra layer of abstraction


## structure directory
* /src
  - index.html
  - index.js
* webpack.config.dev.js
* webpack.config.prod.js

## webpack
inside `webpack.config.js` it export an object literal

```js
export default {
  ...
};
```
Inside that object we set :

### debug
Enable display debug information
```js
  debug: true
```
### devtool

```js
  dedevtoolbug: 'inline-source-map'
```
### noInfo
If to noise on the console turn it on.
```js
  dedevtoolbug: false
```

### entry
The configuration source is here, you can inject middleware.
```js
entry: [
  'eventsource-polyfill', // necessary for hot reloading with IE
  'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
  path.resolve(__dirname, 'src/index')
],
```


## Reference
[Building Applications with React and Redux in ES6 with Cory House](https://www.pluralsight.com/courses/react-redux-react-router-es6)
