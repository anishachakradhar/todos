import React, { Component } from 'react';
import '../Todo.css';
import {InputGroup, FormControl, Button, Table, Form} from 'react-bootstrap';

class TodoContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            todos: [],
            todo: {
                text:'',
                isCompleted: false
            },
            //please write sensible key names
            indexToUpdate: null,
        }
    }
    handleChange = (e) => {
        this.setState({
            todo: {
                ...this.state.todo,
                text: e.target.value
            }
        })
    }

    handleAdd = (e) => {
        e.preventDefault();
        let todo = {
            text: this.state.todo.text
        }
        this.setState({
            todos: [...this.state.todos, todo],
            todo: {
                text: ''
            }
        })
    }

    onDelete = (index) => {
        const todos = this.state.todos.map((todo, i) =>{
            return todo
        })
        todos.splice(index,1);
        this.setState({
            todos
        })
    }

    onEdit = (index) => {
        const todo = this.state.todos[index]
        this.setState({
            todo: todo,
            indexToUpdate: index
        })
    }

    handleUpdate = (e) => {
        e.preventDefault();
        const todos = this.state.todos.map((todo, i) => {
            return todo
        })
        //this is really bad
        //never mutate any object ever ever
        todos[this.state.indexToUpdate] = this.state.todo
        this.setState({
            todos,
            indexToUpdate: null,
            todo: {
                text: ''
            }
        })
    }

    handleReset = (e) => {
        e.preventDefault();
        this.setState({
            todo: {
                text: ''
            },
            indexToUpdate: null
        })
    }

    onCheck = (index) => {
        //this is the best way to update state
        //start looking into map and filter functions
        const todos = this.state.todos.map((todo, i) => {
            if (index === i) {
                return {
                    ...todo,
                    isCompleted: !todo.isCompleted
                }
            }
            return todo;
        });
        this.setState({
            todos
        });
    }

    render() {
        return(
            <div className="todos">
                <div className="add">
                    <Form onSubmit={this.onSubmit}>
                        <InputGroup className="mb-3">
                        <FormControl placeholder="Add a new to-do" name="text" value={this.state.todo.text} onChange={this.handleChange} />
                        <InputGroup.Append>
                            {this.state.indexToUpdate != null ?
                                <Button variant="success" type="submit" onClick={this.handleUpdate}>Update</Button> :
                                <Button variant="success" type="submit" onClick={this.handleAdd}>Add</Button>
                            }
                            <Button variant="secondary" type="submit" onClick={this.handleReset}>Reset</Button>
                        </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </div>
                <div className="list">
                    <Table responsive>
                        <tbody>
                            {this.state.todos.map((todo,index) => 
                                <tr key={index}>
                                    <td><input type="checkbox" className="todoCheck" onChange={() => this.onCheck(index)}/></td>
                                    <td className="todo" style={todo.isCompleted ? { textDecoration: 'line-through' } : {}}>{todo.text}</td>
                                    <td className="button"><Button variant="info" onClick={() => this.onEdit(index)}>Edit</Button></td>
                                    <td className="button"><Button variant="danger" onClick={() => this.onDelete(index)}>Delete</Button></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default TodoContainer