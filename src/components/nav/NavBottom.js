import React, { Component } from 'react'

export default class NavBottom extends Component {

    render() {
        return (
        <div className="nav-btm-container box-shadow"> 
                <span onClick={this.props.deleteTask} className="btn red">delete task(s)</span>
                <span onClick={this.props.handleTaskForm} className="btn green"> add task</span>
        </div>

        )
    }
}
