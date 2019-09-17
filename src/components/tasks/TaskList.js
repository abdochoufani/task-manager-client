import React, { PureComponent } from 'react'
import Task from './Task'

 class TaskList extends PureComponent {

    render() {
        const render = this.props.error ?
         (<div className="error">{this.props.error}</div>)
         : 
         this.props.tasks.map((task, index) => {
            return (
              <Task
                key={index}
                index={index}
                tasks={this.props.tasks}
                task={ task.task}
                checkCompletedTask={this.props.checkCompletedTask}
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


export default TaskList