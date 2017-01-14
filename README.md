# <b>JavaScript Notes</b>
Notes from stuff that i learn in JavaScript and examples that i do my self to understand the concept.

----------

## How to Write an Open Source JavaScript Library

Publishing a JavaScript library for public use requires some extra steps. You need to think about how people will use the library. From end users, to contributors your library now has a variety of people outside of yourself potentially making use of the code that you've released into the wild.

From Github and npm, to releasing beta versions, semantic versioning, code coverage, continuous integration, and providing your library with a solid set of unit tests, there are a ton of things to learn.

This series will guide you through a set of steps to publish a JavaScript open source library.

#### Advantage & Disaventage of micro library
<b>Advantage</b>:
- It is so small so it easy to reason about.
- Because it small, it easy to test.
- It is easy to reuse this code with npm install.

<b>Disavantage</b>:
- Managing the dependency and versioning but is good for may cases.

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


#### Add a script commit inside package.json:

```js
"scripts": {
  "commit": "git-cz"
}
```

You can now run npm run commit :
```
$ npm run commit
```
