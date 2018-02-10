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

export function addPoint(player) {
    return dispatch => {
        axios   
            .put(url, player)
            .then(response => {
                dispatch({
                    type: "ADD_POINT",
                    player: response.data
                })
            })
    }
}


// /api/player/totalAttempts
// /api/player/totaPoints