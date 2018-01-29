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
        this.state = {
            // showBig: true,
            // showSmall: false
        }
        // this.handleChange = this.handleChange.bind(this);
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

    handleChange(e) {
        this.props.history.push(e.target.value)
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
        console.log(this.props.questions.data)
        const questionList = data.map((question, i) => {
            let {categoryId} = this.props.match.params;
            return <Link key={question.id} to={`/${categoryId}/${question.id}`}>{question.question}</Link>
        });

        // const questionList2 = data.map((question, i) => {
        //     let {categoryId} = this.props.match.params;
        //     return <option value={`/${categoryId}/${question.id}`}><Link key={question.id} to={`/${categoryId}/${question.id}`}>{question.question}</Link></option>
        // });


            // This is causing an infinite loop, need to find another way to trigger the setState
            // window.addEventListener("resize", ()=> {
            //     if(window.outerWidth < 770) {
            //         this.setState({
            //             showBig: false,
            //             showSmall: true
            //         })
            //     }
    
            //     if(window.outerWidth > 770) {
            //         this.setState({
            //             showBig: true,
            //             showSmall: false
            //         })
            //     }
            // });
    
        
        

        return (loading
            ? <div>
                    ...Loading
                </div>
            : <div className="main-wrapper">
                <div >
                   
                    <div className="list-wrapper">{questionList}</div>
                    {/* {this.state.showSmall && <select className="answer-dropdown" onChange={this.handleChange}>
                        {questionList2}
                        </select>} */}
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