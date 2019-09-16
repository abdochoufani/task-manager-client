import React, { Component } from 'react'
import Task from './Task'

export default class TaskList extends Component {

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps) {
    //         const tasks = this.state.tasks
    //         tasks.push(nextProps)
    //         this.setState({tasks:tasks})
    //     }
    // }

    render() {
        return (
            <div className="container-modal">
                 {this.props.tasks.map((task, id) => {
                    return (
                      <Task key={id} task={task}/>
                    )
                })} 
                
            </div>
        )
    }
}
