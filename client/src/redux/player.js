import axios from 'axios';
import {login} from '../redux/authorization'


axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config
})

const url = "/player/"

export function verifyPlayer () {
    return (dispatch) => {
        axios.get(url + "verify")
        .then((response) => {
            let {success, player } = response.data
            dispatch(login(player, success))
        })
        .catch ((err) => {
            console.error(err)
        })
    } 
}

//get player edit player
export function editPlayer(data) {
    //make the put request, dispatches the action containing new player object
    return dispatch => {
        axios
            .put("/player", data)
            .then(response => {
                console.log(response.data)
                dispatch({
                    type: "EDIT_PLAYER",
                    player: response.data
                })
            })
    }
}

export function deletePlayer() {
    console.log(this.props + "delete")
    

}

export function addPoint(str) {
    return dispatch => {
        axios   
            .put("player:" + str)
            .then(response => {
                dispatch({
                    type: "ADD_POINT",
                    player: response.data
                })
            })
    }
}

export function addAttempt(str) {
    return dispatch => {
        axios.put("/player:" + str)
        .then(response => {
            dispatch({
                type: "ADD_ATTEMPT",
                player: response.data
            })
        })
    }
}


export default function playerReducer (data = {}, action) {
    switch (action.type) {
        case "ADD_ATTEMPT":
            return {
                player: action.data
            }
        
        case "EDIT_PLAYER": 
            return {
                player: action.data
            }

        case "ADD_POINT":
            return {
                player: action.data
            }

        case "ADD_ATTEMPT":
            return {
                player: action.data
            }
        
        
        default: 
            return data
    }
}


// /api/player/totalAttempts
// /api/player/totaPoints