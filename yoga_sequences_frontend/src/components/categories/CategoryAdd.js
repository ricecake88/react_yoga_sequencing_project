import React, { Component } from 'react';

class CategoryAdd extends Component {

    state = {
        category: ''
    }

    onChange = (event) => {
        this.setState({
            category: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.addCategory(this.state.category);
        this.setState({
            category: ''
        })
    }

    render() {
        return (
        <>
            <form onSubmit={this.onSubmit}>
            <input type="text" name="category" value={this.state.category} onChange={this.onChange}/>
            <button>Add</button>
            </form>
        </>)
    }
}
export default CategoryAdd;