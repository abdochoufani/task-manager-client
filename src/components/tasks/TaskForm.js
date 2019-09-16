import React, { Component } from 'react'

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
        this.setState({i : this.state.i + 1})
        this.props.handleTaskForm()
        const tasks = this.props.tasks
        tasks.push(this.state.task)
        debugger
        const json =JSON.stringify(tasks)
        this.props.socket.emit('setTasks', {username:sessionStorage.getItem('username'),  data:json})
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
