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
We have to specify the index.json last.
```js
entry: [
  'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
  path.resolve(__dirname, 'src/index') // we don't specify index.js
],
```

### target
We can use `web` or `node` if we want to use at server side. As a web, it bundle as a way that browser can understand.

```js
target: 'web'
```

### output
Were webpack should create the dev bundle. Webpack won't generate any actual phisical files for our development. It will serve files from memory. But we do need to specify the path and the name so that we can simulate physical files existances. we use node `__dirname` that use the current directory.

```js
output: {
  path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
  publicPath: '/',
  filename: 'bundle.js'
},
```

### devServer
Tell webpack devServer where ours code is.

```js
devServer: {
  contentBase: path.resolve(__dirname, 'src')
}
```

### plugins
Use two plugins that enhance webpack power.
First `HotModuleReplacementPlugin()` do not use a full browser refresh
First `NoErrorsPlugin()` do not break the hot reload when error.

```js
plugins: [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
],
```

### module
This section tells webpack what file types it should handle.
```js
module: {
  loaders: [
    {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
    {test: /(\.css)$/, loaders: ['style', 'css']},

    // For bootstrap fonts
    {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
    {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
    {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
    {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
  ]
}
```

## editorconfig
The `.editorconfig` tell how to configure the editor with indentation ect...
By using `.editorconfig` we guaranty consistency across different editors.

## babel config
The `.babelrc` file tell how to configure the babel preset. In this case it tell that we want to transpile all `react` .jsx and all `es2015` standard. But only in the developement mode we want to run  `react-hmre` babel preset. That bundle up number of different hot reloading related code and put it into that package `babel-preset-react-hmre`

```js
{
  "presets": ["react", "es2015"],
  "env": {
    "development": {
      "presets": ["react-hmre"]
    }
  }
}
```



## Reference
[Building Applications with React and Redux in ES6 with Cory House](https://www.pluralsight.com/courses/react-redux-react-router-es6)
