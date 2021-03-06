import React from 'react'



class Modal extends React.PureComponent {
    state = {
        username:'',
        password:'',
        error:null
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.status ==='sucsess' && this.props.status !== 'sucsess')  this.props.handleClose()
        if(nextProps.error) this.setState({error:nextProps.error})
      }

    handleSubmit = (event) => {
        event.preventDefault()
        if(this.state.username === '' || this.state.password==='') this.setState({error:'username and/or password are required'})
        else {
            const  username= this.state.username
            const  password= this.state.password
            this.props.connectSocket(username, password)
        }
  
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render(){
    const showHideClassName = (this.props.status !== 'success' || this.state.error) ? "modal display-block" : "modal display-none";
    return (
      <div className={ showHideClassName }>
        <section className="modal-main box-shadow">
            <div className="container-modal">
                    <p className="p"><span className="heading">Sign in</span> or Sign up</p>
                    {this.props.error && (
                        <div className="error">
                            {this.props.error}
                        </div>
                    )}
                    <form onSubmit={this.handleSubmit} className="form">
                        <input className="input" name="username" type="text" placeholder="Username" value={this.state.username} onChange={this.handleChange}/>
                        <input className="input" name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
                        <button className="btn fill">SIGN IN</button>
                    </form>
                </div>
        </section>
      </div>
      )
    }
}



export default Modal    