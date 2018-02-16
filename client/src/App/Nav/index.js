import React, { Component } from 'react'
import {login, logout, signup} from "../../redux/authorization"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import player from '../Home/'
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
        const styles = {
            fontSize: "18px"
                }

        const isAuthenticated = this.props.player.isAuthenticated;
        console.log(isAuthenticated)
        return (
            <div className="nav-wrapper" style={styles}>
                <Link to="/">Home</Link>
                {isAuthenticated ? null : <div><Link to="/signup">Sign Up</Link></div>}
                {isAuthenticated ? null : <div><Link to="/login">Log In</Link></div>}
                {isAuthenticated ? <div><Link to="/player">Profile</Link></div> : null}
                {isAuthenticated ? <div><button onClick={this.props.logout}>Log Out</button></div> : null}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, {logout})(Nav)