import React, { Component } from 'react'
import {login, logout, signup} from "../../redux/authorization"
import {connect} from "react-redux"
import {Link} from "react-router-dom"

class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputs: 
                {username: "",
                password: ""}
            
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        let {name, value } = e.target
        this.setState ( {
            [name] : value
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
        this.props.login(this.state)
        this.clearInputs()
    }

   


    render() {
        return (
            <div>
                <Link to="/">Home</Link>
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} type="text" name="username"  value={this.state.username} placeholder="username" />
                <input type="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="password"/>
                <button >Log In</button>
            </form>
            <button>Sign Up</button>
            <button onClick={this.props.logout}>Log Out</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, {login, logout, signup})(Nav)