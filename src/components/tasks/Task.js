import React, { Component } from 'react'

export default class Task extends Component {
    state= {
        clicked:false
    }

    handleCompleted = () => {
        this.setState({clicked: ! this.state.clicked})
    }
    render() {
        const completed = this.state.clicked ? ' check-box bg-green' : 'check-box'
        const {key, task} =this.props
        return (
            <div className="tasks" key={key}>
            <div className={completed} onClick={this.handleCompleted}></div>
            <p className="task">{task}</p>
        </div>
        )
    }
}

