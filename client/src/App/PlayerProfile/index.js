import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getPlayer} from "../../redux/authorization"

class PlayerProfile extends Component {

    componentDidMount () {
       
    }


    render() {
        console.log(this.props)
        return (
            <div>
                Player Stats ...
                <h1>Welcome </h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, {})(PlayerProfile)