# JavaScript Concepts
Notes from stuff that i learn in JavaScript and examples that i do my self to understand the concept.

# Micro Library

## babel


## Standard commit guideline

### conventional-changelog
You can read about the standard commit guideline inside the angular repo:
["CONTRIBUTING.md#commit"](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit)


### commitizen & cz-conventional-changelog
Commitizen is simple commit conventions for internet citizens

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


### Add a script commit inside package.json:

```js
"scripts": {
  "commit": "git-cz"
}
```

You can now run npm run commit :
```
$ npm run commit
```
