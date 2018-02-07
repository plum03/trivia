import React, {Component} from 'react';
import {connect} from "react-redux";

import './Question.css'

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


    render() {
        let {loading, data} = this.props;
        let {questionId} = this.props.match.params;
        let currentQ = data.filter((question) => question.id.toString() === questionId)[0];
        console.log(currentQ.answers)
        console.log(this.state)

        return (loading
            ? <div>
                    ...Loading
                </div>
            : <div>
                <ul className="question" style={{listStyle: "none"}}>
                    <h2>{currentQ.question}</h2>
                    <li className="options">
                        <option className="answer-option" onClick={this.handleClick} value="1">{currentQ.option1}</option>
                        <option className="answer-option" onClick={this.handleClick} value="2">{currentQ.option2}</option>
                        <option className="answer-option" onClick={this.handleClick} value="3">{currentQ.option3}</option>
                        <option className="answer-option" onClick={this.handleClick} value="4">{currentQ.option4}</option>
                    </li>
                </ul>
                <h3 style={{color: this.state.color}} id="answer-message">{this.state.alertMsg}</h3>
            </div>)
    }
}

export default connect(state => state.questions, {})(Question);


