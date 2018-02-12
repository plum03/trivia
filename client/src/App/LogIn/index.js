import React, { Component } from 'react'
import {connect} from 'react-redux'
import {login} from '../../redux/authorization'


class LogIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputs: {
                username: "",
                password: ""
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.clearInputs = this.clearInputs.bind(this)
    }

    handleChange(e) {
        let {name, value} = e.target
       this.setState((prevState) => {
           return {
               inputs: {
                   ...prevState.inputs,
                   [name]: value
               }
           }
       })
    }

    clearInputs() {
        this.setState({
            inputs: {
                username: "",
                password: ""
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.login(this.state.inputs)
        this.clearInputs()
    }

    
    render() {
        let {username, password} = this.state.inputs
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="username" value = {username} placeholder="username" onChange= {this.handleChange}/>
                    <input type="password" name="password" value={password} onChange={this.handleChange} placeholder="password"/>
                    <button>Log In</button>
                </form>
            </div>
        )
    }
}

export default connect(null, ({login}))(LogIn)