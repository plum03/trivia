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
                console.log(response.data)
                dispatch({type: "LOGIN", 
                // data: response.data
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

// const getURL = (data) => (dispatch, getState) => {
//     dispatch({
//         type: "GET_URL",
//         pathname: getState().router.pathname
//     })
// }

// export const setPathToAction = store => next => action => {
//     action.pathname = store.getState().router.pathname
//     next(action)
// }

//get player edit player
export function editPlayer(data) {
    //make the put request, dispatches the action containing new player object
    return dispatch => {
        axios
            .put(playerUrl, data)
            .then(response => {
                console.log(response.data)
            })
    }
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
            return player
            // get player case edit player case
        default:
            return player
    }
}