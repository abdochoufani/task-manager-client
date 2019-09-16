import React, { Component } from 'react'

export default class BtnContainer extends Component {

    render() {
        return (
        <div className="container"> 
                <span onClick={this.deleteTask} className="btn red">delete task(s)</span>
                <span onClick={this.props.handleTaskForm} className="btn green"> add task</span>
        </div>

        )
    }
}
