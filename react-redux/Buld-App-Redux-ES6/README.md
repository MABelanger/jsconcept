[setup](setup.md)


Requirement :

Redux is build on Flux with unidirectional data flow.

In this course :
* Redux
* ES6 with Babel
* React Router
* Webpack
* npm scripts
* ESLint
* Mocha, React Test Utils, Enzyme


## Why Redux
It become the most popular data management library.
* All state is centralize into one Store
* Reduced Boilerplate
* Isomorphic
* Immutable Store
* Hot Reloading
* Time-travel debugging
* Small (2k)


## React components
4 ways to create components the 2 and 4 is the most used :
1. ES5 createClass
2. ES6 class
3. ES5 stateless function
4. ES6 stateless function
5. Other way
  1. Object.create
  2. Mixins
  3. Parasitic components
  4. StampIt

### ES5 Class Component
```js
var HelloWorld = React.createClass({
  render: function () {
    return (
      <h1>Hello World</h1>
    );
  }
});
```

### React in ES6

#### No autobind
Work fine with ES5 createClass
```js
<div onClick={this.handleClick}></div>
```

Require explicit bind with ES6 Class
```js
<div onClick={this.handleClick.bind(this)}></div>
```
For performance reason, instead, bind the function inside the constructor
```js
class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
}
```
### propTypes
- PropTypes declared separately below your definition.
- Default props declared separately.
  - If you want to declare your propType within your class, use babel-stage1 support
- Set initial state in constructor.

### ES5 Stateless Functional Component
```js
var HelloWorld = function(props){
  return (
    <h1>Hello World</h1>
  );
}
```

### ES6 Stateless Functional Component
```js
const HelloWorld = (props) => {
  return (
    <h1>Hello World</h1>
  );
}
```

### Benifits of stateless Functional components
Use it when possible.
* No class Needed
  - No extend
  - No constructor
* Avoid `this` keyword
  - No bind() method
* Enforce best parctices
  - Dum presentation component focus on the UI instead of behaviours
  - State should be managed to the hight level component with Flux, Redux ...
  - Do not support state or life cycle method. so no state here...
    - You are force to put states management where it belong in the higher level container component.
* Easy to understand
  - It only spit up html
* Easy to test.
  - No mocking, special manipulation, special library
* Enhance performance
  - No memory allocation

```js
import React from 'react';

const HelloWorld = (props) => {
  const sayHi = (event) => {
    alert(`Hi ${props.name}`);
  };

  return (
    <div>
      <a
        href="#"
        onClick={sayHi}>Say Hi </a>
    </div>
  );
};

HelloWorld.propTypes = {
  name: React.PropTypes.string.isRequired
};

export default HelloWorld;
```

### When use stateless functional component
When is possible.

### When use Class component
* Need state
  local state
* Need references
  Refs to the underline DOM.
* Need LifeCycle methods hooks
  componentMounted, componentDidMounted
* Need Child function (for performance)
  Every render create a new instance of the component, so avoid nested function. with the stateless function.

### When use Class component
* Everywhere else


## Other ways to create components
- Object.create
- Mixins
- Parasitic components
- StampIt

Most used is Container & Presentation components

More info : [bit.ly/react-define-component](bit.ly/react-define-component)

## Container VS Presentation component

Container | Presentation
Little to no markup | Nerly all markup
Pass data and actions down | receive data and action via props
Knows about Redux | Doesn't know about Redux rely on props to display UI
Often stateful | Typically functional components

## Alternative Jargon
**Container** | **Presentation**
Smart | Dump
Stateful | Stateless
Controller View | View

> Note * "When you notice that some components don't use props they receive but merely forward them down.. it's a good time to introduce some container components." Dan Abramov.


Container :
 1. is concerned with behaviour
   - Has no markup (like a backend)
   - The primary concern is passing data down to it's child
   - They are statefull
   - They pass data and actions down
   - Knows about Redux

Presentation (most common) :
 1. Nerly all markup
   - They are dum, no logic inside.
   - Receive data and actions via props
   - Doesn't know about Redux just reley on props.
   - Tipically functional components (no state)


# Initial App Structure

## Component Structure
It's good to put all components into `src/components/` and split into folder page

Create subfolder to section like
```js
/src/
  home/
    HomePage.js
  about/
    AboutPage.js
  common/
    Header.js
  course/
    CoursesPages.js
  styles/
    styles.css
  App.js
```

Example of HomePage.js
```js
import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <div>HomePage</div>
        <Link to="about" ClassName="btn btn-primary btn-lg">Learn more</Link>
      </div>
    );
  }
}

export default HomePage;
```

> * Note: If you want hot reloading you need at least one parent with Class. But if you don't need hot Reloading, you can make stateless functunal component instead.

The parent component that is display on every component with every pages like header or footer.

Typically called `App.js` but can be called template or `Layout.js`

Example of App.js
```js
import React, {PropTypes} from 'react';
import Header from './common/Header';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header/>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
}

export default App;
```

exemple of `routes.js`
```js
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';

export default (
  <Route path="/" component={App}>
    <indexRoute component={HomePage} />
    <Route path="about" component={AboutPage} />
  </Route>
);
```
IndexRoute : is used when rootPath so if we ask for the `/` we will load the `homePage`

```js
<Route path="/" component={App}>
```
We are saying that component App is always loaded and then nest the other items. pass them as children base on a `app`. So when we use `/homePage` the component `HomePage` is passed as a child.

## Update Entry Point

example of index.js
```js
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import route from './routes';
import './styles/styles.css'; // Webpack import the css
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

render (
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('app')
)
```
To render the application we need to idalise the router.
`babel-polyfill` they are a set of feature of ES6 that babel can't transpile so you need to use polyfill. You can use specific polyfill like `object.assign` but for simplicity we import every thing. `browserHistory` is a HTML5 clean url to handle histrory with react-router with the real path like `/about` instead of hash base URL `#about` that we pass to the history prop of `react-router` and our routes.


Example of Header.js:
```js
import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
  return (
    <nav>
      <IndexLink to ="/" activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="/about" activeClassName="active">About</Link>
    </nav>
  );
};

export default Header;
```
The activeClassName is used when the link is active base on the route. Allow to style the current selected ancher of the header.
