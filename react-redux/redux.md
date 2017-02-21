# Intro to Redux

## Do i need Redux ?

### Vanilla JS
- simple
- No setup

### JQuery
- Ajax call
- Dom manipulation

### React
- Clear component model
- Virtual DOM
- Static Events
- Think about the app about the small pure functions

### React + Flux
- More complex data flows
  - Same data into multiple places
  - Large number of potentiels states change
  - Handle change into single spot for consistency, testability
- Inter-component communication with no parent child relationship
- Non-heirarchical data
- Many actions
- *Same data used in multiple places*

> Note:. "If you aren't sure if you need flux, you don't need it." Pete Hunt on Flux and Redux

Img Store... 048 - Intro to Redux


## Redux 3 Principles
- One immutable Store
- Only Actions trigger changes (ex:. user click submit fom button)
- Reducer Update
  - Accept the current state in a action and return a new state.


## Flux Vs Redux similarities
- They are the same philosophy (unidirectional data flow)
  - Data flow down.
  - Action flow up.
- They have both actions
- They have both store

## Flux Vs Redux differences
- Reducers
- Containers
- Immutability

### Flux
```
Action
 \|/
Dispatcher
 \|/
Store
 \|/
React
  |
  =====(Action)
```
### Redux
```
  Action
  Store <-> Reducers
  React (action)
```
TODO : 051 do the table differences

## Redux flow
