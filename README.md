# <b>JavaScript Notes</b>
Notes from stuff that i learn in JavaScript and examples that i do my self to understand the concept.

[TOC]

----------

## How to Write an Open Source JavaScript Library

Publishing a JavaScript library for public use requires some extra steps. You need to think about how people will use the library. From end users, to contributors your library now has a variety of people outside of yourself potentially making use of the code that you've released into the wild.

From Github and npm, to releasing beta versions, semantic versioning, code coverage, continuous integration, and providing your library with a solid set of unit tests, there are a ton of things to learn.

#### Advantage & Disaventage of micro library
<b>Advantage</b>:
- It is so small so it easy to reason about.
- Because it small, it easy to test.
- It is easy to reuse this code with npm install.

<b>Disavantage</b>:
- Managing the dependency and versioning but is good for may cases.

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
