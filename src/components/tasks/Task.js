import React, { Component } from 'react'

export default class Task extends Component {


    handleCompleted = () => {
     this.props.searchTask(this.props.task) 

    }
    render() {
        const { task, completed } =this.props
        const checkCompleted =  completed ? ' check-box bg-green' : 'check-box'
        return (
            <div className="tasks">
            <div className={checkCompleted} onClick={this.handleCompleted}></div>
            <p className="task">{task}</p>
        </div>
        )
    }
}

