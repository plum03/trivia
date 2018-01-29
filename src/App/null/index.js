import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

import {getCategory} from '../../redux/category'
import { getQuestions } from '../../redux/question'

let categoryArr = ["Animated Movies", "Biology", "Random Trivia", "TV Trivia", "Who Sings It (2000)", "Vampire"];


class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {  
        categoryArr.map((catName) => {
            this.props.getCategory(catName)
        })
        
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.category.length !== nextProps.category.length) {
            this.setState( {         category: nextProps.category     }) }
    }


   
    render() {
        
        return (
            // map through the categories array and create <Link to="/trivia/{category}/">
            <div>
                {categoryArr.map((category, i) => {
                    return (
                        <Link to={`/${category}`} key={i + category}>{category}</Link>
                    )
                })}               
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {category: state.category}
}


export default connect(mapStateToProps, {getCategory})(Category)
