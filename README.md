# <b>JavaScript Notes</b>
Notes from stuff that i learn in JavaScript and examples that i do my self to understand the concept.

----------

## How to Write an Open Source JavaScript Library

Publishing a JavaScript library for public use requires some extra steps. You need to think about how people will use the library. From end users, to contributors your library now has a variety of people outside of yourself potentially making use of the code that you've released into the wild.

#### Advantage & Disaventage of micro library
<b>Advantages</b>:
- It is so small so it easy to reason about.
- Because it small, it easy to test.
- It is easy to reuse this code with npm install.

<b>Disavantages</b>:
- Managing the dependency and versioning but is good for may cases.

<b>Steps:</b>
```
 1. Create a git repo on github
 2. Create the library
 3. Publish it on npm
 4. Create a full test with karma, mocha and chai
 5. Setup continious integration.
```
#### Initialize the npm

```
$ npm set init-author-name '...'
$ npm set init-author-email '...'
$ npm set init-author-url '...'
$ npm set init-license 'MIT'
# no ~ or ^ for the version of dependency inside package.json.
$ npm set save-exact true
# To add the auth token
$ npm adduser
```

> **Note:** each set init* will be saved inside the ~/.npmrc
All the config is here : [https://docs.npmjs.com/misc/config](https://docs.npmjs.com/misc/config)


<b>To initialize the package</b>:
```
$ npm init
```


<b>To publish the package</b>:
```
$ npm publish
```

If the name is already taken, you will get err msg permission deny. So change the name of the package from package.json file.

<b>You can get information of the package with</b>:

```
$ npm info
```

<b>Now you can use</b>:
```
$ npm install 'your-module-name'
```
and
```js
var yourModuleName = require('your-module-name');
```

> **Note:** You can check your package on :
http://npm.im/your-module-name


### Versions
> **Note:** To bumpup version like A.B.C :
- A mean Major release, A breking change, break the API if changed.
- B mean Minor relase, new feature but do not break the API
- C mean Patch release, fix a bug.

<b>Add version tag to github with a tag point to a release</b>:
```
$ git tag 1.0.0
$ git push --tags
```

#### Beta version
a beta version can be your change that you are not sure that people will like it. append <b>-beta.x</b>

like : <i>1.4.0-beta.0</i>
```
$ git add -A
$ git commit -am 'adding beta...'
$ git tag 1.4.0-beta.0
$ git push
$ git push --tags
$ npm publish --tag beta
```
<b>Install the latest npm beta</b>
```
$ npm install package-name@beta
```
When you finished with beta you simply remove the "-beta.0"

#### commitizen & cz-conventional-changelog
Standard commit guideline with conventional-changelog is nothing more than formatting your commits with a particular structure.
It generate a changelog from git metadata It's recommended to use high level standard-version. Alternatively, you are probably looking for the cli module.

> **Note:** You can read about the standard commit guideline inside the angular repo: ["CONTRIBUTING.md#commit"](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit)

```
$ npm install -D commitizen cz-conventional-changelog
```

Add the config.commitizen key to the root of your package.json as shown here:
```js
"config": {
  "commitizen": {
    "path": "node_modules/cz-conventional-changelog"
  }
```


To run it:
```
$ node node_modules/.bin/git-cz
```
It will ask us the question to generate the commit message.


<b>Add a script commit inside package.json</b>:

```js
"scripts": {
  "commit": "git-cz"
}
```

You can now run npm run commit :
```
$ npm run commit
```

### Unit testing
(mocha & chai)
```
$ npm install mocha chai --save-dev
```

### Sementic realease

```
$ npm install -g semantic-release-cli
```

There are so many repeated steps when releasing a new version of a library. The tool semantic-release automates this process by pushing off the responsibility of your releases to continuous integration. It publish to npmjs and it use a convention for with version to bump. Is the same convention that angular use.

<b>Init semantic-release-cli, at the root of the project:</b>
```
$ semantic-release-cli setup
	all default ...
	use travis-ci
```

> **Note:** That will add "semantic-release" script inside the package.json

> **Note:** To remove the warning message with `npm install` change the version to : <b>0.0.0-semantically-released</b>

The  semantic-release will setup the version automaticly !


<b>inside the .travis.yml</b>
```
before_script:
  - npm prune
after_success:
  - npm run semantic-release
```

<b>standard commit guideline</b>:
[https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit)


### Code coverage

istanbul check the code coverage.
```
$ npm install -D istanbul
```
<b>add script istanbul to package.json</b>:
```js
  "scripts": {
    "test": "mocha src/index.test.js -w",
    "test:single": "istanbul cover -x *.test.js _mocha -- -R spec src/index.test.js"
    "check-coverage": "istanbul check-coverage --statements 100 --branches 100 --functions 100 --lines 100",
```

> **Note:** use _mocha to be compatible with istanbul and use this parameters:
  -- : specify the file input
  -R  : Change the reporter to spect


#### Report the coverage with codecov.io
To be able to track the coverage, add a badge into github and send the coverage to third party like codecov.io
```
$ npm install -D codecov.io
```

We need to pipe ./coverage/lcov.info to codecov.io in package.json
```js
"scripts": {
  "report-coverage": "cat ./coverage/lcov.info | codecov"
}
```
inside add .travis.yml :
```
after_success:
  - npm run report-coverage
```

> **Note:** You can install chrome Codecov Extension to see the coverage in green inside github.

### git hooks

ghooks will run the test right before commit. If the test failed, it will not commit the code.
```
$ npm install -D ghooks
```

inside the package.json add the pre-commit:
```js
  "config": {
    "ghooks": {
      "pre-commit": "npm run test:single"
    }
  }
```

### Transpile es6 to es5
```
$ npm install -D babel-cli
```
Add script into package.json:
```js
"scripts": {
	"build": "babel --copy-files --out-dir dist --ignore *.test.js src"
```
--copy-files will copy all not .js files like .json or .png. By default babel do not transpile so we need to install and add config preset to enable the transpile.

```
$ npm install -D babel-preset-es2015 babel-preset-stage-2
```
Add config into package.json:
```js
  "babel": {
    "presets": ["es2015", "stage-2"]
  }
```
If we transpile, when we use require the package specify the transpiled version inside package.json:
```js
  "main": "dist/index.js",
```

Because `istanbul` do not reconise es6 feature we need to use `nyc` that use istanbul under the hood but support the es6.  So cange all `istanbul`call script  to `nyc`

```
$ npm install -D nyc
```
We also need install `babel-register` and specify `mocha` to support the es6.

```
$ npm install -D babel-register
```
Point to the new transpiled version:
```js
"main": "dist/index.js",
```
Change the scripts and githook of package.json:
```js
"watch:test": "npm t -- -w",
"test": "mocha src/index.test.js --compilers js:babel-register",
"cover": "nyc npm t",
"ghooks": {
  "pre-commit": "npm run cover && npm run check-coverage"
}

```
Update .travis.yml :
```
script:
  - npm run cover
```


### Test what is distributed with the module npm
To create an .tar of what will be included to the registery npm pack will create an archive that represent what will be distributed with the module.
```
$ npm pack
```
You can open it with:
```
$ open the-archive.tgz
```
Specify with file will be include into the package into package.json example :

```js
"files": [
  "dist",
  "README.md"
]
```

### Delete directory cross platform
inside the package.json add rimraf that does <b>'rm -rf dist'</b>
```js
"scripts": {
  "prebuild": "rimraf dist"
}
```

> **Note:** When use script name `pre` before another script name, npm will run that script before the other. So `$ npm run build` will run `prebuild` before `build`.


The `prepublish` script is run when user install the module so avoid use it. put script inside .travis.yml instead :

```
script:
  - npm run build
```

### Specify travis-ci a specific branches
You can specify travis-ci to build only the master branche by added branches to the `.travis.yml` file
```
branches:
  only:
    - master
```

### Add badge to github
To put a badge to github go to [shields.io](http://shields.io/) and add it into README.md

Ex:.[![Build Status](https://img.shields.io/travis/nodejs/nodejs.org/master.svg?style=flat-square)](http://travis-ci.org/nodejs/nodejs.org)

`[![Build Status](https://img.shields.io/travis/nodejs/nodejs.org/master.svg?style=flat-square)](http://travis-ci.org/nodejs/nodejs.org)`


### Add support for browser
require() is comonJS that browser do not support. We have to use UMD "Universal Module Definition". To do this we can use webpack.

```
$ npm install -D webpack
$ touch webpack.config.babel.js
$ npm i -D babel-loader json-loader
```


```
"scripts": {
  "build:main": "babel --copy-files --out-dir dist --ignore *.test.js src",
  "build:umd": "webpack --output-filename index.umd.js",
  "build:umd.min": "webpack --output-filename index.umd.min.js -p"
}
```

To run all script use npm-run-all

```
$ npm i -D npm-run-all
```
Add all script to be build in parallel
```
"scripts": {
  "build": "npm-run-all --parallel build:*",
}
```

go to
[https://unpkg.com/the_package](https://unpkg.com/_the_package_)
