import React, { Component } from 'react'
import Task from './Task'

export default class TaskList extends Component {



    searchTask = (task) => {
        const task_id = this.props.tasks.findIndex( x => x.task === task)
        this.props.checkCompletedTask(task_id) 
    }


    render() {
        const render = this.props.error ?
         (<div className="error">{this.props.error}</div>)
         : 
         this.props.tasks.map((task) => {
            return (
              <Task
                key={task.task}
                tasks={this.props.tasks}
                task={ task.task}
                completed ={task.completed}
                searchTask={this.searchTask}/>
            )
        })
        
        return (
            <div className="container-modal margin">
                {render}
            </div>
        )
    }
}
