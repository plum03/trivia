import axios from 'axios'
const url = "/player/"

export function getPlayers() {
    return (dispatch) => {
        axios
        .get(url)
        .then((response) => {
            dispatch({
                type: "GET_PLAYERS",
                players: response.data
            })
        })
        .catch(err => {
            console.error(err)
        })
    }
}

export function addPlayer() {
    return (dispatch) => {
        axios
        .get(url)
        .then((response) => {
            dispatch({
                type: "ADD_PLAYER",
                newIssue: response.data
            })
        })
        .catch(err => {
            console.error(err)
        })
    }
}

export function login (user) {
    
}