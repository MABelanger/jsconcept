["Testing React Applications" with Max Stoiber](https://www.youtube.com/watch?v=59Ndb3YkLKA)


## Unit testing

In js, the unit is the function so test
* reducer
* actions
* components

The benefit of doing unit testing is catch some of the bugs before they happen. Test is executable documentation, write better code.

Example of Mocha style:
```js
describe('add()', () => {
  it('add two numbers', () => {
    expect( add(2, 3) ).toEqual(5);
  })

  it('doesnt add the third number', () => {
    expect( add(2, 3, 5) ).toEqual(add(2, 3)); // => .toEqual(add(2, 3))
  })

});
```

It is important to narrow the test that only test one thing. To test the third number, in that example we do not use `.toEqual(5);` we reuse the function instead `.toEqual(add(2, 3))`. So if we decide to change the function add with multiplication `return (a * b)` It will only print the error on the `add two numbers` not on `doesnt add the third number`.

## Example of Structure

```
NavBar.react.js         // React component

NavBar.actions.js       // Actions
NavBar.constants.js     // Constants
NavBar.reducer.js       // Reducer

NavBar.actions.test.js  // Actions tests
NavBar.reducer.test.js  // Reducer test
```

NavBar.actions.js :
```js
import { TOOGLE_NAV } from './NavBar.constants';

export function toggleNav() {
  return { type: TOOGLE_NAV };
}
```

NavBar.actions.test.js :
```js
import { TOOGLE_NAV } from './NavBar.constants';
import { toogleNav } from './navBar.actions';

describe('NavBar actions', () => {
  describe('toogleNav', () => {
    it('should return the correct constant', () => {
      expect(toogleNav()).toEqual({
        type: TOOGLE_NAV
      })
    });
  });
});
```
So it test only if it return an object { type: TOOGLE_NAV }

With `redux-saga`, you have pure function that is not valuable to test but with `redux-thunk` you have to mock thing so it's good idea to test it.

The reducer is more valuable to test.
