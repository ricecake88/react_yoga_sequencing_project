import React, { Component, useState } from 'react';
import { connect } from 'react-redux';

export function SeqCategoryAddHooks(props) {
    const [category_id, setCategoryId] = useState('');

    function onChange (event) {
        setCategoryId(event.target.value)
    }

    function onSubmit(event) {
        event.preventDefault();
        props.addCategory(category_id)
        setCategoryId('')
    }

    return (
        (props.addTrue === "Add Category") ?
        <>
        <label htmlFor="category_id">Add Category</label>
        <input type="text" name="category_id" value={category_id} onChange={onChange}></input>
        <button onClick={onSubmit}>Add</button>
        </>
            : null
    )
}

/*
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

export default connect() (SeqCategoryAdd);*/