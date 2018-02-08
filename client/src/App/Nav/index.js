import React, { Component } from 'react'

export default class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
            
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState ( {
            [e.target.name] : e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault() 
        this.props.login(this.state)
    }


    render() {
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} type="text" name="username" value={name} value={this.state.username}placeholder="username" />
                <input type="password" name="password" onChange={this.handleChange} value={this.state.password}placeholder="password"/>
                <button >Log In</button>
            </form>
            <button>Sign Up</button>
            </div>
        )
    }
}
