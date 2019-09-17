import React, { Component } from 'react'

export default class NavBottom extends Component {
    state= {
        disabled:true
    }


    componentWillReceiveProps(nextProps) {
       const disabled = this.props.tasks.length > 0 ? false : true
       this.setState({disabled})
    }

    render() {
        debugger
        const dis = this.state.disabled ? "btn grey" : "btn red"
        return (
        <div className="nav-btm-container box-shadow">
            <div className='test'> 
                <button onClick={this.props.deleteTask} className={dis} disabled={this.state.disabled}>delete task(s)</button>
                <button onClick={this.props.handleTaskForm} className="btn green "> add task</button>
            </div>
                
        </div>

        )
    }
}
