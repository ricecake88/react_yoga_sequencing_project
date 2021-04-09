import React, { Component } from 'react';
import { connect } from 'react-redux';

class YogaCategoryAdd extends Component {
    state = {
        category: ''
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.category)
        this.props.addCategory(this.state.category)
        this.setState({
            category:''
        })
    }

    render() {
        return (this.props.addTrue === "Add Category") ?
         (
             <form onSubmit={this.onSubmit} id="addCategory">
                <label htmlFor="category">Add Category</label>
                <input type="text" name="category" value={this.state.category} onChange={this.onChange}></input>
                <button>Add</button>
            </form>
        ) : ''
    }
}

export default connect() (YogaCategoryAdd);