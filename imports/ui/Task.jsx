import React, { Component, PropTypes } from 'react';
import { Posts } from '../api/post.js'

// Task component - represents a single todo item
export default class Task extends Component {
  handleDelete() {
    if(confirm('want to delete'))
    Posts.remove(this.props.task._id);
  }
  render() {
    return (
      <li>
        <button className='delete' onClick={this.handleDelete.bind(this)}>&times;</button>
        {this.props.task.title},{this.props.task.content}</li>
    )
  }
}
Task.propTypes= {
  task: PropTypes.object.isRequired
}
