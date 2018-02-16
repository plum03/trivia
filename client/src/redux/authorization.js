import axios from "axios";

axios
    .interceptors
    .request
    .use((config) => {
        const token = localStorage.getItem("token");
        config.headers.Authorization = `Bearer ${token}`;
        return config
    })

const playerUrl = "/player/"

export function getPlayer() {
    return (dispatch) => {
        axios
            .get(playerUrl)
            .then((response) => {
                dispatch({type: "GET_PLAYER", player: response.data})
            })
            .catch(err => {
                console.error(err)
            })
    }
}

export function signup(player) {
    return dispatch => {
        axios
            .post("/auth/signup", player)
            .then(response => {
                dispatch({type: "SIGNUP", player: response.data})
            })
    }
}

export function login(player, success) {
    return dispatch => {
        axios
            .post("/auth/login", player)
            .then(response => {
                let { token, success, player } = response.data
                localStorage.setItem("token", token)
                dispatch({type: "LOGIN", 
                player,
                success
            })
            })
    }
}

export function logout(history) {
    localStorage.removeItem("token");
    // history.push("/");
    return {type: "LOGOUT"}
}


export function verifyPlayer () {
    return (dispatch) => {
        axios.get(playerUrl + "verify")
        .then((response) => {
            let {success, player } = response.data
            dispatch(login(player, success))
        })
        .catch ((err) => {
            console.error(err)
        })
    } 
}

export default function authReducer(player = {
    loading: false,
    data: {},
    isAuthenticated: false
}, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                data: {
                    ...action.player,
                    token: action.token
                },
                loading: false,
                isAuthenticated: action.success
            }
        case "LOGOUT":
            return {
                loading: false,
                data: {},
                isAuthenticated: false
            }
            // get player case edit player case
        default:
            return player
    }
}