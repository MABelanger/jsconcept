Scaling React js Applications, Max Stoiber - AtTheFrontend 2016 Jun 2, 2016 -> [video](https://www.youtube.com/watch?v=5W1Lqv_8Cqw) by Max Stoiber

The founder of : [React boilerplate](https://github.com/react-boilerplate/react-boilerplate) and [elemental-ui](https://github.com/elementalui/elemental)

1. **Scabality** : The ability of the system or an application to handle more of something. (user, developper or more application)

2. **State Management** : Unidirectional data flow => The component notify the store and the store notify the container that notify the others child component.

3. **Architecture** : Split your components into `containers` and `components` :
  * `Containers` are concern with how thing work.
  * `Components` are concern with how thing look.

By spliting the components, into containers and components, you can reuse easily the logic and the display to other projects.


4. **Structure**
Do not split by file types, group files by feature instead.

```
react-app
|---css
|---containers
|     |--- NavBar
|             |--- NavBar.js
|             |--- actions.js
|             |--- constants.js
|             |--- styles.css
|             |--- reducer.js
|---components
      |--- App.js
```

## PostCSS + postcss-autoreset
Doing a reset to each component. (component isolation)

## Redux saga
Is a library that aims to make side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) in React/Redux applications become easier and better.

## Performance
two type `load time performance` and `application performance`. Webpack can do code splitting by routes. So the browser load the content only when the user click on to that route. They use `system.js`

For browser performance, only render component concern with the change. Use it as possible on the parent component.

```js
shouldComponentUpdate(nextProps) {
  return nextProps !== this.props;
}
```

In javaScript **{"username" : "u1" } !== { "username" : "u1" }** will always be unequal, so you have to loop every property and values of the objects. So deeply comparing object is expensive.

## Immutable.js
```js
import { fromJS } from 'immutable';

const state = fromJS({
  "username" : "u1"
});
```
It calculate the hash tag and use function `.equals()`. We can now really cheaply deeply compare.  


## Conclusion
1. Split your app into comtainers and components
2. Group files by feature
3. Isolate styling
4. Use redux-saga
5. Use immutable.js
