# Trivia App

This single page application lets you to test your knowledge of various trivia, organized by category.

Trivia categories are displayed at the top of the page and, as you click on a category, the app pulls a lists of questions from the Qriusity API.

Scroll through the questions, and when you see one that interests you, click on it and the full question along with possible answers will appear on the page.

Click on the answer(s) and a message will display letting you know whether it was the correct answer or not.

When you are ready to move on, just select another question from the list, or click on a new category to see different questions.

Note: Do you like to multitask?  Me too!  Which is why I've implemented responsive design tactics.  So shrink the page down and keep on playing.  (If you answered no, that's okay too.  Expand the page to it's full width and enjoy!)


## Built With

* [ReactJS](https://reactjs.org/) - The web framework used
* [Redux](https://redux.js.org/) - State Management
* [Qriusity](https://qriusity.com/) - Trivia API
* [Axios](https://github.com/axios/axios) - enables AJAX
* React-Router - enables SPA design
* Redux Thunk - permits asynchronous action calls
* Javascript, HTML, CSS - for your enjoyment 


## Screenshots

### Initial view 
![Homepage Screenshot](public/images/main-full-screen.png)

### Questions List view
![App Screenshot](public/images/app-full-screen.png)

### Small screen view

<img src="public/images/app-small.png" width="500px">


## Code Examples

Using Redux, the app is able to retrieve questions corresponding to each category clicked on by the user and loads the data into the global store.

```
export function getQuestions(catId) {
    return dispatch => {
        axios
            .get(rootUrl + catId + questUrl)
            .then((response) => {
                dispatch({type: "GET_QUESTIONS", questions: response.data})
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

```

I used ReactJS to handle the state changes for the Question component.  This allows a message to display letting the user know whether the selected answer is correct or not.  State changes also determine the color of the message and clear the message when a new question is selected.

```
class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertMsg: "",
            color: "crimson"
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        let { value } = e.target
        let {questionId} = this.props.match.params;
        let currentQ = this.props.data.filter((question) => question.id.toString() === questionId)[0];

        this.setState(() => {
            return {
                alertMsg: currentQ.answers.toString() === value ? "Correct" : "Try again",
                color: currentQ.answers.toString() === value ? "lime" : "crimson",
            } 
        })      
    }

    componentWillReceiveProps() {
        this.setState ({
            alertMsg: ""
        })
    }

```

## Features for Future Versions

[1] Point-tracking system
[2] Users can query the API for more categories


## Author

* **Erica Stone** [plum03](https://github.com/plum03)


## Acknowledgments

* Hat tip to the creators of Qriusity for this API and for making the documentation so easy to follow!


