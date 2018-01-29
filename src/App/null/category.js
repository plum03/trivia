import axios from 'axios'

const catUrl = "https://qriusity.com/v1/categories/search?name="


export default function catReducer(category =[], action) {
    switch(action.type) {
        case "GET_CATEGORY":
            return action.category       
        default:
            return category
    }
}

export function getCategory(category) {
    return dispatch => {
        axios
            .get(catUrl + category)
            .then((response) => {
                dispatch({
                    type: "GET_CATEGORY",
                    category: response.data[0].id
                })
            })
    }

}


