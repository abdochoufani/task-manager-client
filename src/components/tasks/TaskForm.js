import React, { Component } from 'react'
import encrypt from '../../utils/Encryption'

export default class TaskForm extends Component {
    state= {
        task:'',
    }


    // componentDidUpdate(){
    //     const {socket} = this.props
    //     if(socket) socket.emit('getTasks')
    // }

    handleChange =(event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    handleSubmit =(event) => {
        event.preventDefault()
        this.props.handleTaskForm()
        const tasks = this.props.tasks
        tasks.push({task:this.state.task, completed:false})
        let json =JSON.stringify(tasks)
        const encrypted = encrypt.encryptData(json, sessionStorage.getItem('hash'))
        this.props.socket.emit('setTasks', {username:sessionStorage.getItem('username'),  data:encrypted})
        this.props.socket.emit('getTasks')
    }
    render() {
        
        return (
            <div>
            {this.props.show && (
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="task" value={this.state.task} onChange={this.handleChange} />
                    <input type="submit"/>
                </form>
            )}
            </div>
        )
    }
}
