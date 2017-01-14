# <b>JavaScript Notes</b>
Notes from stuff that i learn in JavaScript and examples that i do my self to understand the concept.

----------

## How to Write an Open Source JavaScript Library

Publishing a JavaScript library for public use requires some extra steps. You need to think about how people will use the library. From end users, to contributors your library now has a variety of people outside of yourself potentially making use of the code that you've released into the wild.

From Github and npm, to releasing beta versions, semantic versioning, code coverage, continuous integration, and providing your library with a solid set of unit tests, there are a ton of things to learn.

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
$ npm set init-author-name 'Michel-Alexandre Belanger'
$ npm set init-author-email 'michel.alexandre.belanger@gmail.com'
$ npm set init-author-url 'http://www.mtrema.com'
$ npm set init-license 'MIT'
# no ~ or ^ for the version of dependency inside package.json.
$ npm set save-exact true
# To add the auth token
$ npm adduser
```

> **Note:** each set init* will be saved inside the ~/.npmrc
All the config is here : [https://docs.npmjs.com/misc/config](https://docs.npmjs.com/misc/config)


Inside the package
```
$ npm init
    name: (starwars-names)
    version: (1.0.0)
    description: Get random Star wars names
    entry point: (index.js) src/index.js
    test command:
    git repository: https://github.com/MABelanger/starwars-names.git
    keywords: random star wars
    license: (MIT)
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

<b>Add version tag to github with a tag point to a release</b>:
```
$ git tag 1.0.0
$ git push --tags
```

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
