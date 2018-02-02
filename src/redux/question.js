import axios from 'axios'

const rootUrl = "https://qriusity.com/v1/categories/"
const questUrl = "/questions"

export function getQuestions(catId) {
    return dispatch => {
        axios
            .get(rootUrl + catId + questUrl)
            .then((response) => {
                dispatch({type: "GET_QUESTIONS", questions: response.data})
            })
            .catch((err) => {
                console.log(err);
            })
    } 
}

export default function questReducer(questions = {loading: true, data: []}, action) {
    switch (action.type) {
        case "GET_QUESTIONS":
            return {
                loading: false,
                data: action.questions
            }
        default:
            return questions
    }
}
