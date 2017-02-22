## create actions

```
src/
  actions/
    courseActions.js
```

The action return the action with the course data and a `type` that is required.

> Note that in ES6 the right hand side match the left inside if the right inside is ommited like course. So return { course:course } become return { course }


```js
export function createCourse(course) {
  return {
    type: 'CREATE_COURSE',
    course
  }
}
```

## Reducers
To handle action we need a reducer. In flux we handle action with store but in redux we handle actions within reducer. A reducer is just a function that accept a state action and return a new state.

```
src/
  reducers/
    courseReducers.js
```

The reducer explode the `state` and create a brand new object action with `Object.assign()`.
```js
export default function courseReducer(state = [], action) {
  switch(action.type) {
    case 'CREATE_COURSE':
      return [...state,
        Object.assign({}, action.course)
      ];
  default:
    return state;
  }
}
```


```
src/
  reducers/
    index.js
```

The reducer explode the `state` and create a brand new object action with `Object.assign()`.
```js
import {combineReducers} from 'redux';
import courses from './courseReducer';

// ES6 short hand property name
const rootReducer = combineReducers({
  courses
});

export default rootReducer;
```
