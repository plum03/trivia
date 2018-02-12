import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'

import Categories from './Categories' 
import Questions from './Questions'
// import Question from './Questions/Question'
import Home from './Home'
import Nav from "./Nav"
import PlayerProfile from "./PlayerProfile"
import SignUp from './SignUp'
import LogIn from './LogIn'
import ProtectedPath from './ProtectedPath'
import {verifyPlayer} from '../redux/player'




class App extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.verifyPlayer()
        // console.log(this.props)
       
    }

    
    render () {

        let style = {
            fontFamily: "Quicksand"
        }
        const {isAuthenticated} = this.props.player.isAuthenticated

        return (
            <div className='app-wrapper' style={style}>
                <Nav/>
                <Categories />
                <Switch>
                    <Route exact path ="/" component={Home} />
                    {/* render={(props) => {
                        return isAuthenticated ?
                        <Redirect to="/profile" />
                        :
                        <Home {...props} />
                    }}  /> */}
                    <Route path="/login" render={(props) => {
                        return isAuthenticated ?
                        <Redirect to="/player" />
                        :
                        <LogIn {...props} />
                    }} />
                    <ProtectedPath path="/player" component={PlayerProfile} />
                    {/* <Route component={ProtectedPath}>
                        <Route path='/player' component={PlayerProfile}/>
                    </Route> */}
                    
                    <Route path='/signup' component={SignUp}/>
                    <Route path='/login' component={LogIn}/>
                    <Route path="/:categoryId" component={Questions} />
                </Switch>
               
            </div>
        )
    }
    
}

const mapStateToProps = (state) => {
    return state
}

export default withRouter(connect(mapStateToProps, {verifyPlayer})(App))
