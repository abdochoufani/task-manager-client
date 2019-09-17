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
    error:null,
    statusCode:200,
    showTaskForm:false,
    show:true,
    taskStatus:'',
    tasks:[]
  }

  getTasks = (socket) => {
    let decrypted 
    socket.emit('getTasks')
    socket.on('tasks', (data) => {
      if (data.data) { 
        decrypted = encrypt.decryptData(data.data, sessionStorage.getItem('hash'))
      }
      this.handleTaskStatus(data.status)
      if(this.state.taskStatus === 'success') this.handleTasks(decrypted) 
    })
  }




  connectSocket = (username, password) => {
    password = encrypt.hashPassword(password)
    const socket =  require('socket.io-client')('http://localhost:' + config.port + '/' + config.namespace , {
      query: {
          username: username,
          password: password
      }
  })
    socket.on('connect', ()=>{
        socket.emit('authenticate', {username, password})
        socket.on('connection', (data, err) => {
          this.handleStatus(data.status)
          debugger
          if(err && !data.error) this.handlerrors(err)
          if (data.error) this.handlerrors(data.message)
          if (this.state.status==='success'){ 
            sessionStorage.setItem('username', username)
            sessionStorage.setItem('hash', password)
            this.getTasks(socket)
            this.setState({socket})
          }
        })
        socket.on('disconnect', () => {
          sessionStorage.clear()
          this.setState({
            socket:null,
            showTaskForm:false,
            show:true,
          })
        })
    })
  }


  handlerrors = (data) => {
    this.setState({error:data})
  
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
    this.setState({error:null})
    this.setState({taskStatus:status})
  }

  handleTasks = (data) => {
    if(data){ 
      this.setState({tasks:JSON.parse(data)})
    }
  }

  checkCompletedTask = (index) => {
    const tasks = this.state.tasks
    const { socket } = this.state 
    tasks[index].completed = !tasks[index].completed
    socket.emit('setTasks',{username:sessionStorage.getItem('username'), data:encrypt.encryptData(tasks, sessionStorage.getItem('hash'))})
    this.getTasks(socket)
  }

  deleteTask = () => {
    const tasks =this.state.tasks
    const { socket } = this.state 
      for(var i =0 ; i< tasks.length; i++) {
      if(tasks[i].completed === true) {
        tasks.splice(i, 1)
      }
      socket.emit('setTasks',{username:sessionStorage.getItem('username'), data:encrypt.encryptData(tasks, sessionStorage.getItem('hash'))})
      this.getTasks(socket)
    }
  }

  render(){
    return (
      <div className="App">
        <NavTop />
        <NavBottom 
          handleTaskForm={this.handleTaskForm}
          deleteTask = { this.deleteTask}
           />
        <TaskForm
          show={this.state.showTaskForm}
          socket= {this.state.socket}
          handleTaskForm={this.handleTaskForm}
          tasks={this.state.tasks}
          error={this.state.error}
          />
        <Modal
          connectSocket={this.connectSocket}
          handleClose = {this.handleClose} 
          status={this.state.status} 
          show={this.state.show}
          error ={this.state.error}
          />
        {this.state.tasks.length > 0 && (
          <TaskList
          error ={this.state.error}
           tasks={this.state.tasks}
           checkCompletedTask ={this.checkCompletedTask}/>
        )}
      </div>
    )}
}

export default App;
