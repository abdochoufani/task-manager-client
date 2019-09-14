import React from 'react';
import NavTop from './components/nav/NavTop'
import NavBottom from './components/nav/NavBottom'
import Modal from './components/auth/Modal'
import TaskList from './components/tasks/TaskList'
import './App.css';


class App extends React.Component  {
  state={
    socket:null,
    status:'disconected',
    error:'',
    show:true,
    tasks:[]
  }


  handleClose = () => {
    this.setState({show:false})
  }

  handleStatus = (status) => {
    this.setState({status})
  }

  handleTasks = (tasks) => {
    this.setState({tasks})
  }
  render(){
    const {show, tasks} =this.state
    return (
      <div className="App">
        <NavTop />
        <NavBottom />
        <Modal
          handleStatus={this.handleStatus}
          handleClose = {this.handleClose} 
          status={this.state.status} 
          show={this.state.show}
          />
        <TaskList/>
        { (show===false && tasks===[]) && (
          <div>
            <h1>HHHHHHHHH</h1>hello
          </div>
        )}
      </div>
    )}
}

export default App;
