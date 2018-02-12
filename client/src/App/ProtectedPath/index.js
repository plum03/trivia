import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'

class ProtectedPath extends Component {
   
    render() {
        console.log("I'm in!!")
        console.log(this.props)
        console.log(this.props.player)
        console.log(this.props.component)
        const isAuthenticated = this.props.player.isAuthenticated
        const Component = this.props.component.WrappedComponent
        const path = this.props.path
        console.log(isAuthenticated)

        // if(isAuthenticated) {
        //     return this.props.children
        // }  else {
        //     return null
        // }

        // function mapStateToProps(state, ownProps) {
        //     console.log(state)
        //     console.log(this.state)
        //     return {
        //         isAuthenticated: state.player.isAuthenticated,
        //         currentURL: ownProps.location.pathname
        //     }
        // }
        return (
            <div>
                {isAuthenticated ?
                <Route path={path} render={(props) => {
                    return <Component {...props} />
                }} />
               
                :
                <Redirect to="/" />}
              
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, {})(ProtectedPath)