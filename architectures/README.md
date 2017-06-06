Scaling React js Applications, Max Stoiber - AtTheFrontend 2016 Jun 2, 2016 -> [video](https://www.youtube.com/watch?v=5W1Lqv_8Cqw) by Max Stoiber The founder of : [React boilerplate](https://github.com/react-boilerplate/react-boilerplate)

1. `Scabality` : The ability of the system or an application to handle more of something. (user, developper or more application)

2. `State Management` : Unidirectional data flow => The component notify the store and the store notify the container that notify the others child component.

3. Architecture : Split your components into `containers` and `components` :
  * `Containers` are concern with how thing work.\s\s
  * `Components` are concern with how thing look.\s\s
By spliting the components, into containers and components, you can reuse easly the logic and the display to other projects.


4. Structure
Do not split by file types, group files by feature instead.

```
react-app
|----css
|----containers
|     |---- NavBar
|             |---- NavBar.js
|             |---- actions.js
|             |---- constants.js
|             |---- reducer.js
|-----components
        |---- App.js
```
