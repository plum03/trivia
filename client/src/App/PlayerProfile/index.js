import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link, Switch, Route } from 'react-router-dom'
import axios from 'axios'
// import {getPlayer} from "../../redux/authorization"
import editPlayer from '../../redux/player'
import deletePlayer from '../../redux/player'
import EditPlayer from '../EditPlayer/editForm'

class PlayerProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.player.data._id || "",
            displayForm: false
        }
        this.removePlayer = this.removePlayer.bind(this)
        this.toggleDisplay = this.toggleDisplay.bind(this)
        this.editPlayer = this.editPlayer.bind(this)

    }

    // componentDidMount() {
    //     let { id } = this.props.match.params;
    //     this.getTodo(id);
    // }
    // componentWillReceiveProps(nextProps) {
    //     let nextId = nextProps.match.params.id
    //     let { id } = this.props.match.params;
    //     if (nextId !== id) {
    //         this.getTodo(nextId);
    //     }
    // }
    // getPlayer(id) {
    //     axios.get(todoItemUrl + id)
    //         .then((response) => {
    //             let { data } = response;
    //             this.setState({
    //                 todo: data,
    //                 loading: false
    //             });
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //             this.setState({
    //                 todo: {},
    //                 loading: false
    //             });
    //         });
    // }
    removePlayer() {
        console.log(this.props)
        let { id } = this.props.player.data._id;
        let { history } = this.props;

        axios.delete("/player")
            .then((response) => {
                alert(`Item ${id} was successfully removed!`);
                history.push("/");
            })
            .catch((err) => {
                console.error(err);
                history.push("/");
            })
    }
    toggleDisplay() {
        this.setState((prevState) => {
            return {
                displayForm: !prevState.displayForm
            }
        })
    }
    editPlayer(editedPlayer) {
        let { id } = this.props.player.data._id;
        axios.put("/player", editedPlayer)
            .then((response) => {
                let { data } = response;
                console.log(response.data.player)
                this.setState({
                    player: response.data.player,
                    displayForm: false
                });
            })
            .catch((err) => {
                console.error(err);
            })
    }

    render() {
        console.log(this.props)
        let player = this.props.player.data
        let { username, totalPoints, totalAttempts } = player
        let {id} = this.props.player.data._id

        let points = Number(totalPoints)
        let attempts = Number(totalAttempts)
        let scorePercent = ((totalPoints)/(totalAttempts))*100

        let formDisplay = {display: this.state.displayForm ? "inherit" : "none"}

        return (
            <div>
                <button onClick={this.toggleDisplay} >EDIT PROFILE</button>
                <div style={formDisplay} >
                    <EditPlayer {...player} submit={this.editPlayer}></EditPlayer>
                </div>
                <button onClick={this.removePlayer} >DELETE ACCOUNT</button>
                <h1>Welcome {username}</h1>
                <h2>Points: {totalPoints}</h2>
                <h2>Attempts: {totalAttempts}</h2>
                <h2>Score Percent: {scorePercent}%</h2>

                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, {deletePlayer, editPlayer})(PlayerProfile)