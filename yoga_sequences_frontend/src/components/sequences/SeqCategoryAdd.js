import React, { Component } from 'react';
import { connect } from 'react-redux';

class SeqCategoryAdd extends Component {
    state = {
        category_id: ''
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.addCategory(this.state.category_id)
        this.setState({
            category_id:''
        })
    }

    render() {
        return (this.props.addTrue === "Add Category") ?
                <>
                <label htmlFor="category_id">Add Category</label>
                <input type="text" name="category_id" value={this.state.category_id} onChange={this.onChange}></input>
                <button onClick={this.onSubmit} id="addCategory">Add</button>
                </>
         : null
    }
}

export default connect() (SeqCategoryAdd);