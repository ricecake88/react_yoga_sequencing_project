import React, { Component } from 'react';

class YogaSeqForm extends Component {

    state = {
        name: ''
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log("onSubmit Form");
    }

    render() {
        return(
        <div>
            <form onSubmit={this.onSubmit}>
                <label htmlFor="Name"/>Yoga Sequence Name:
                <input type="name" name="name" onChange={this.onChange} value={this.props.name}/>
                <input type="submit"></input>
            </form>
        </div>)
    }
}

export default YogaSeqForm;