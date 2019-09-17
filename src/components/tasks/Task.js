import React from 'react'

const Task = (props) => {
        const checkCompleted =  props.completed ? ' check-box bg-green' : 'check-box'
        return (
            <div className="task-container box-shadow">
            <div className={checkCompleted} onClick={()=>props.checkCompletedTask(props.index)}></div>
            <p className="task">{props.task}</p>
        </div>
        )
}


export default Task

