import React, { Component } from 'react'
import encrypt from '../../utils/Encryption'

export default class TaskForm extends Component {
    state= {
        task:'',
    }


    handleChange =(event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    handleSubmit =(event) => {
        event.preventDefault()
        this.props.handleTaskForm()
        const tasks = this.props.tasks
        tasks.push({task:this.state.task, completed:false})
        const encrypted = encrypt.encryptData(tasks, sessionStorage.getItem('hash'))
        this.props.socket.emit('setTasks', {username:sessionStorage.getItem('username'),  data:encrypted})
        this.props.socket.emit('getTasks')
    }
    render() {
        
        return (
            <div>
            {this.props.show && (
                <form className="task-form" onSubmit={this.handleSubmit}>
                    <input className="input" placeholder="Add your task ..." type="text" name="task" value={this.state.task} onChange={this.handleChange} />
                    <input className=" task-btn btn fill" type="submit" name="Add Task"/>
                </form>
            )}
            </div>
        )
    }
}
