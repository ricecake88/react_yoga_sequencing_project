import React, { Component } from 'react';

class CategoryAdd extends Component {

    state = {
        category: '',
    }

    onChange = (event) => {
        this.setState({
            category: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.addCategoryCallback(this.state.category)
        this.setState({
            category: ''
        })
    }

    render() {
        return (
        <>
            <form onSubmit={this.onSubmit}>
                <label htmlFor="category">Name:</label>
                <input type="text" name="category" 
                    value={this.state.category} 
                    onChange={this.onChange} 
                    placeholder="New Category"
                    onClick={this.props.onClick}/>
                <button>Add</button>
            </form>
        </>)
    }
}
export default CategoryAdd;