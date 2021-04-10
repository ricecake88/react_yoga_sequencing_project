import React, { Component } from 'react';
import Categories from './Categories';
import { connect } from 'react-redux';
import CategoryAdd from './CategoryAdd';
import { addCategory, getCategories } from '../../actions/categories';
import { addSequence } from '../../actions/sequences';
import PoseSelector from '../poses/PoseSelector';

class SeqForm extends Component {

    state = {
            name: '',
            category_id: null
    }

    componentDidMount = () => {
        console.log("components/sequences/SeqForm ->component did mount");
        console.log(this.props.user);
        this.props.getCategories(this.props.user);

    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.addSequence(this.state)
        this.setState({
            name: '',
            category_id: null
        })
    }

    render() {
        return(
        <div>
            <form onSubmit={this.onSubmit}>
                <label htmlFor="Name"> Sequence Name: </label>
                <input type="name" name="name" onChange={this.onChange} value={this.state.name}/><br/>

                <select value={this.state.category_id} name="category_id" onChange={this.onChange}>
                    <Categories categories={this.props.categories} addCategory={this.props.addCategory}/>
                </select>
                <CategoryAdd user={this.props.currentUser} addTrue={this.state.category} name="category" addCategory={this.props.addCategory} onChange={this.onChange}/>
                <label htmlFor="AddPose">Add a Pose</label>
                <PoseSelector poses={this.props.poses} addPose={true}/><br/>
                <input type="submit"></input>
            </form>
        </div>)
    }
}

function mapStateToProps(state) {
    console.log("\t>>>SeqContainer -> mapStateToProps")
    console.log(state);
    return {
        categories: state.categories.categories,
        user: state.auth.currentUser
     }
}

function mapDispatchToProps(dispatch) {
    console.log("\tCategories >> mapDispatchToProps");
    return {
        addCategory: (category) => dispatch(addCategory(category)),
        getCategories: (user) => dispatch(getCategories(user)),
        addSequence: (sequence) => dispatch(addSequence(sequence))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeqForm);