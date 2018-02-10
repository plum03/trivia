import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getPlayer} from "../../redux/authorization"

class PlayerProfile extends Component {

    componentDidMount () {
       
        console.log(this.props)
        console.log("hi there player!")
    }


    render() {
        console.log(this.props)
        return (
            <div>
                Player Stats ...
                <h1>Welcome {this.props.player.username}</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, {})(PlayerProfile)