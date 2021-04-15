import React, { Component } from 'react';
import { connect } from 'react-redux';

class CategoryAdd extends Component {
    state = {
        category: ''
    }

    onChange = (event) => {
        //console.log("CategoryAdd onChange")
        //console.log(event.target)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        //console.log(this.state.category)
        this.props.addCategory(this.state.category)
        this.setState({
            category:''
        })
    }

    render() {
        //console.log("CategoryAdd -> render()")
        //console.log(this.props)
        return (this.props.addTrue === "Add Category") ?
         (
                <>
                <label htmlFor="category">Add Category</label>
                <input type="text" name="category" value={this.state.category} onChange={this.onChange}></input>
                <button onClick={this.onSubmit} id="addCategory">Add</button>
                </>
        ) : null
    }
}

export default connect() (CategoryAdd);