import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'

class ProtectedPath extends Component {

    render() {

        const isAuthenticated = this.props.player.isAuthenticated
        const Component = this.props.component.WrappedComponent
        const path = this.props.path
        console.log(isAuthenticated)

        // if(isAuthenticated) {     return this.props.children }  else {     return
        // null } function mapStateToProps(state, ownProps) {     console.log(state)
        // console.log(this.state)     return {         isAuthenticated:
        // state.player.isAuthenticated,         currentURL: ownProps.location.pathname
        //    } }
        return (
            isAuthenticated
            ? <Route
                    path={path}
                    render={() => {
                    return <Component {...this.props}/>
                }}/>

            : <Redirect to="/"/>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, {})(ProtectedPath)