import React from 'react';
import config from'./utils/config';

import encrypt from './utils/Encryption'
import NavTop from './components/nav/NavTop'
import NavBottom from './components/nav/NavBottom'
import Modal from './components/auth/Modal'
import TaskList from './components/tasks/TaskList'
import './App.css';
import TaskForm from './components/tasks/TaskForm';


class App extends React.Component  {
  state={
    socket:null,
    status:'',
    statusCode:200,
    error:'',
    showTaskForm:false,
    show:true,
    taskStatus:'',
    tasks:[]
  }


  // componentWillMount() {
  //   const {socket} = this.state
  //   if (socket){
  //   socket.emit('getTasks')
  //   socket.on('tasks', (data) => {
  //     this.handleTaskStatus(data.status)
  //     if(this.state.taskStatus === 'success') this.handleTasks(data.data) 
  //   })
  // }
  // }




  connectSocket = (username, password) => {
    const socket =  require('socket.io-client')('http://localhost:' + config.port + '/' + config.namespace)
    const key = encrypt.key512Bits(password)
    const hash = encrypt.hashPassword(password)
    socket.on('connect', ()=>{
        socket.emit('authenticate', {username, hash})
        socket.on('connection', (data) => {
          this.handleStatus(data.status)
          if (this.state.status==='success') this.setState({socket})
          socket.emit('getTasks')
          socket.on('tasks', (data) => {
            if (data.data) { 
              var decrypted 
              decrypted = encrypt.decryptData(data.data, key)
            }
            this.handleTaskStatus(data.status)
            if(this.state.taskStatus === 'success') this.handleTasks(decrypted) 
          })
          sessionStorage.setItem('username', username)
          sessionStorage.setItem('password', key)
        })
        socket.on('disconnect', (data) => {
          sessionStorage.clear()
          this.setState({
            socket:null,
            status:'',
            statusCode:200,
            error:'',
            showTaskForm:false,
            show:true,
            taskStatus:'',
            tasks:[]
          })
        })
    })
  }

  handleTaskForm = () => {
    this.setState({showTaskForm:!this.state.showTaskForm})
  }

  handleClose = () => {
    this.setState({show:false})
  }

  handleStatus = (status) => {
    this.setState({status})
  }

  handleTaskStatus = (status) => {
    this.setState({taskStatus:status})
  }

  handleTasks = (json) => {
    debugger
    const tasks =JSON.parse(json)
    this.setState({tasks:tasks})
  }
  render(){
    return (
      <div className="App">
        <NavTop />
        <NavBottom 
          handleTaskForm={this.handleTaskForm}
           />
        <TaskForm
          show={this.state.showTaskForm}
          socket= {this.state.socket}
          handleTaskForm={this.handleTaskForm}
          tasks={this.state.tasks}
          />
        <Modal
          connectSocket={this.connectSocket}
          handleClose = {this.handleClose} 
          status={this.state.status} 
          show={this.state.show}
          />
        {this.state.tasks.length > 0 && (
          <TaskList tasks={this.state.tasks}/>
        )}
      </div>
    )}
}

export default App;
