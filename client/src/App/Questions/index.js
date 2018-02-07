import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link, Switch, Route} from 'react-router-dom'

import Question from './Question'
import './Questions.css'

import {getQuestions} from '../../redux/question'

class Questions extends Component {
    constructor() {
        super();
       
    }

    componentDidMount() {
        let catId = this.props.match.params.categoryId;
        this
            .props
            .getQuestions(catId);
    }

    componentWillReceiveProps(nextProps) {
        let {categoryId} = this.props.match.params;
        let nextCatId = nextProps.match.params.categoryId;
        if (categoryId !== nextCatId) 
            this.props.getQuestions(nextCatId);
        }

    render() {

        let style = {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: "33.33%",
            backgroundColor: "azure",
            fontSize: "22px"
        }
        
        let {loading, data} = this.props.questions;
        // console.log(this.props) const myQ = questions.questions 
        const questionList = data.map((question, i) => {
            let {categoryId} = this.props.match.params;
            return <Link key={question.id} to={`/${categoryId}/${question.id}`}>{question.question}</Link>
        });

        
        return (loading
            ? <div>
                    ...Loading
                </div>
            : <div className="main-wrapper">
                <div >
                   <h1>{this.props.questions.data[0].category.name}</h1>
                    <div className="list-wrapper">{questionList}</div>
                </div>
                <div className="question-wrapper">
                    <Switch>
                        <Route
                            className="questions"
                            path="/:categoryId/:questionId"
                            component={Question}></Route>
                    </Switch>
                </div>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return {questions: state.questions}
}

export default connect(mapStateToProps, {getQuestions})(Questions)