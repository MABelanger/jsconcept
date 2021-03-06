-  [Babel-polyfill](#babel-polyfill)
-  [Mocha](#mocha)
-  [ESLint](#eslint)
-  [Hot Reloading](#hot-reloading)
-  [Place components](#place-components)
-  [NodeJs Version](#nodejs-version)
-  [npm scripts over gulp](#npm-scripts-over-gulp)
-  [structure directory](#structure-directory)
-  [webpack](#webpack)
-  [editorconfig](#editorconfig)
-  [babel config](#babel-config)
-  [dev server](#dev-server)
-  [scripts](#scripts)
-  [ESLint](#eslint-1)
-  [MISC](#misc)
  * [ESLint](#eslint-2)
  * [color console.log()](#color-consolelog--)
- [Reference](#reference)
  * [eslint script](#eslint-script)
-  [run all](#run-all)

# setup
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

## dev server
Use express as a dev server and put the config file into `tools/srcServer.js`
put all the build tool inside the tools. Express is easy to configure. We want to redirect all path to the single file. We use `babel-node` because not all feature of ES6 is supported by node.

```js
app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});
```

## scripts

### pre script
you can tell npm to run the srcript first by prefixing `pre` before the name of the script ex:. `prestart` will run before `start` You can also do the same with `post` like `poststart`


## ESLint
You configure eslint inside `.eslintrc`. The basic setting. We are augmenting with the recommended with errors and warnings.
```js
"extends": [
  "eslint:recommended",
  "plugin:import/errors",
  "plugin:import/warnings"
],
```
We also use plugin of react.
```js
"plugins": [
  "react"
],
```

The support of ES6 and jsx
```js
"parserOptions": {
  "ecmaVersion": 6,
  "sourceType": "module",
  "ecmaFeatures": {
    "jsx": true
  }
},
```

To tell esling to expect global variables
```js
"env": {
  "es6": true,
  "browser": true,
  "node": true,
  "jquery": true,
  "mocha": true
},
```

## MISC

### ESLint
You can disable eslint into the console by adding
```js
/* eslint-disable no-console */
```
In the setting rules config the number meaning is :
* `0` : off
* `1` : Warning
* `2` : Error

### color console.log()
We can add color to the console.log()
```js
import colors from 'colors';
console.log('Starting app in dev mode...'.green);
```


## Reference
[Building Applications with React and Redux in ES6 with Cory House](https://www.pluralsight.com/courses/react-redux-react-router-es6)

### eslint script
You ca use eslint by default lack of watch functionnality so we use `eslint-watch` (esw) instead. It also enhance command line output. So it tell watch every `webpack.config.*` any files in `src/` and `tools/` directory. the `--` at the second script run the script lint with the appended parameter `--watch`.
```js
"scripts" : {
  "lint": "node_modules/.bin/esw webpack.config.* src tools",
  "lint:watch": "npm run lint -- --watch"
},
```

## run all
You can run all command and redirect the output to one command with `npm-run-all`

```js
"scripts" : {
  "prestart": "./node_modules/babel-cli/bin/babel-node.js tools/startMessage.js",
  "open:src": "./node_modules/babel-cli/bin/babel-node.js tools/srcServer.js",
  "start": "npm-run-all --parallel open:src lint:watch test:watch" ,
  "lint": "node_modules/.bin/esw webpack.config.* src tools",
  "lint:watch": "npm run lint -- --watch",
  "test": "mocha --reporter progress tools/testSetup.js \"src/**/*.test.js\"",
  "test:watch": "npm run test -- --watch"
},
```
