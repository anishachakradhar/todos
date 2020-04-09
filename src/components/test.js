import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      activeTodo: {
        name: '',
        status: 0
      },
      indexToUpdate: null
    }
  }

  handleChange = (e) => {
    this.setState({
      activeTodo: {
        ...this.state.activeTodo,
        name: e.target.value,
        status: 0
      }
    });
  }

  onAdd = () => {
    if (!this.state.activeTodo.name) {
      return;
    }

    let id = 1;

    if (this.state.todos.length) {
      id = this.state.todos[this.state.todos.length - 1].id + 1
    }

    this.setState({
      todos: this.state.todos.concat({ ...this.state.activeTodo, id }),
      activeTodo: {
        name: '',
        status: 0
      }
    });
  }

  onUpdate = () => {
    const { todos } = this.state;
    todos[this.state.indexToUpdate] = this.state.activeTodo;
    this.setState({
      todos,
      indexToUpdate: null,
      activeTodo: {
        name: '',
        status: 0
      }
    });
  }

  onReset = () => {
    this.setState({
      indexToUpdate: null,
      activeTodo: {
        name: '',
        status: 0
      }
    });
  }

  handleDelete = (index) => {
    const { todos } = this.state; 
    todos.splice(index, 1);
    this.setState({
      todos
    });
  }

  handleUpdate = (index) => {
    const todoToUpdate = this.state.todos[index];
    this.setState({
      activeTodo: todoToUpdate,
      indexToUpdate: index
    })
  }

  handleComplete = (index) => {
    this.setState({
      todos: this.state.todos.map((todo, i) => i === index ? { ...todo, status: 1 } : todo)
    })
  }

  render() {
    return (
      <div className="app-wrapper">
        <h3>My Todo List</h3>
        <div>
          <input type="text" onChange={this.handleChange} value={this.state.activeTodo.name} />
          {this.state.indexToUpdate ?
            <button onClick={this.onUpdate}>Update</button> : 
            <button onClick={this.onAdd}>Add</button>
          }
          <button onClick={this.onReset}>Reset</button>
        </div>
        <ul>
          {this.state.todos.map((todo, index) => (
            <li key={todo.id}>
              {/* <input type="checkbox" onClick={() => this.handleComplete(index)} /> */}
              {todo.name}&nbsp;
              <button onClick={() => this.handleUpdate(index)}>Update</button>&nbsp;
              <button onClick={() => this.handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
        {!this.state.todos.length && <i>No todo items added</i>}
      </div>
    );
  }
}

export default App;