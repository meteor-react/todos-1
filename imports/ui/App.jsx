import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import { Posts } from '../api/post.js';

import Task from './Task.jsx';

// App component - represents the whole app
class App extends Component {
  renderTasks() {
    console.log(this.props.posts.length);
    return this.props.posts.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }
  handleSubmit(e) {
    e.preventDefault();
    const title=this.refs.title.value.trim(),
          content = this.refs.content.value.trim();
    Posts.insert({title,
      content,
      submitted:new Date()
    })
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>
<form onSubmit={this.handleSubmit.bind(this)}>
  <input type="text" ref='title'/><br/>
  <input type="text" ref='content'/><br/>
  <input type="submit" value='submit'/>
</form>
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('posts');

  return {
    posts: Posts.find({},{sort:{submitted:-1}}).fetch()
  };
}, App);
