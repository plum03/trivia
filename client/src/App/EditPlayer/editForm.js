import React, { Component } from 'react'
import {connect} from 'react-redux'
import {editPlayer} from '../../redux/player'


class EditPlayer extends Component {
    constructor(props) {
        super(props)
        console.log(props)
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
        console.log(this.props)
       this.setState((prevState) => {
           return {
               inputs: {
                   ...prevState.inputs,
                   [name]: value
               }
           }
       })
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log(this.props)
        console.log(this.props.player)
        this.props.editPlayer(this.state.inputs)
        this.clearInputs()
    }

    clearInputs() {
        this.setState({
            inputs: {
                username: "",
                password: ""
            }
        })
    }
    render() {
        let {username, password} = this.state.inputs
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="username" value = {username} placeholder="username" onChange= {this.handleChange}/>
                    <input type="password" name="password" value={password} onChange={this.handleChange} placeholder="password"/>
                    <button type="submit" >Edit Player Account</button>
                </form>
            </div>
        )
    }
}

export default connect(null, ({editPlayer}))(EditPlayer)