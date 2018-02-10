import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'

class ProtectedPath extends Component {
    
    render() {
        console.log('booyah')
        let {isAuthenticated, Component, path} = this.props
        return (
            <div>
                isAuthenticated ?
                <Route path={path} render={(props) => {
                    return <Component {...props} />
                }} />

                :
                <Redirect to="/" />
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, {})(ProtectedPath)