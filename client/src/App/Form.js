import React, { Component } from 'react'
import { connect } from "react-redux"
import { addPlayer, editPlayer } from "../redux/issues"


class Form extends Component {
    constructor(props) {
        super(props);
        let { username } = props
        this.state = {
            inputs: {
                name: username || ""
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.clearInputs = this.clearInputs.bind(this)
    }

    handleChange(event) {
        let { name, value } = event.target
        this.setState((prevState) => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [name]: value
                }
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        let { _id, addIssue, editIssue, clear, add  } = this.props
        
        if (add) {
            addPlayer(this.state.inputs)
        } else {
            editPlayer(this.state.inputs, _id)
        }
        if (clear) {
            this.clearInputs()
        }
    }

    clearInputs() {
        this.setState({
            inputs: {
                name: ""
            }
        })
    }


    render() {
        let { username } = this.state.inputs
       
        return (
            <div>
                <h2>Profile</h2>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} type="text" name="name" value={name} placeholder="Issue Name" />
                    <button >SAVE</button>
                </form>
            </div>
        )
    }
}

export default connect(null, ({ addIssue, editIssue }))(Form)