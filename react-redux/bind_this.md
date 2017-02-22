## Bind this in ES6
Because react does not autobind in ES6, we need to specify the binding into the constructor. Note that we can use bind in render but it create a new function on each render. For performance issue we bind it into the constructor.

```js
import React, {PropTypes} from 'react';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: { title : '' }
    }

    this.onTitleChange = this.onTitleChange.bind(this);
  }

  onTitleChange(event){
    const course = this.state.course;
    course.title = event.target.value;
    this.setState( {course:course} );
  }
  render() {
    return (
        <input
          type="text"
          onChange={this.onTitleChange}
          value={this.state.course.title} />
    );
  }
}

export default CoursesPage;
```
