import React, { Component } from 'react';
import Categories from './Categories';
import { connect } from 'react-redux';
import CategoryAdd from './CategoryAdd';
import { addCategory, getCategories } from '../../actions/categories';
import { addSequence } from '../../actions/sequences';
import PoseAdd from '../sequences/PoseAdd';

class SeqForm extends Component {

    state = {
            name: '',
            category: null,
            poses: [],
            pose_id: 0,
            poses_in_seq: [],
            errors: []
    }

    componentDidMount = () => {
        console.log("components/sequences/SeqForm ->component did mount");
        console.log(this.props.user);
        this.props.getCategories(this.props.user);

    }

    onChange = (event) => {
        console.log("Sequence Form -> onChange()")
        console.log(event.target.name)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log("on Submit")
        console.log(this.state);
        let sequence = {}
        if (this.state.category !== "Add Category") {
            sequence = {
            name: this.state.name,
            category_id: parseInt(this.state.category),
            user_id: this.props.user.id,
            poses_in_seq: this.state.poses_in_seq
            }
        } else {
            this.state.errors.push("ERROR category is illegal")
        }
        this.props.addSequence(sequence)
        this.setState({
            name: '',
            category_id: null
        })
    }

    onClickAddPose = (event) => {
        event.preventDefault();
        console.log("onClickAddPose");
        console.log(event.target.value)
        const pose = this.props.poses.find(pose => pose.id === parseInt(event.target.value));
        const pose_in_seq = {
            pose_id: pose.id,
            num_breaths: 0,
            pose_order: 0
        }
        this.setState({
            //pose_id: event.target.value,
            poses: [...this.state.poses, pose],
            poses_in_seq: [...this.state.poses_in_seq, pose_in_seq ]
        })
     
    }

    render() {
        console.log(">>> SequenceForm -> SeqForm")
        console.log(this.props)
        //Sequence.create!(:id => 1, :name => "Testing 2", :user_id => 2, :category_id => 4, :pose_in_seqs_attributes => [{:pose_id => 0, :num_breaths => 2, :pose_order => 1}, {:pose_id => 1, :num_breaths => 3, :pose_order => 0}]
        return(
        <div>
            <form onSubmit={this.onSubmit}>
                <label htmlFor="name"> Sequence Name: </label>
                <input type="name" name="name" onChange={this.onChange} value={this.state.name}/><br/>

                <select value={this.state.category} name="category" onChange={this.onChange}>
                    <Categories categories={this.props.categories} addCategory={this.props.addCategory}/>
                </select>
                <CategoryAdd user={this.props.currentUser} addTrue={this.state.category} name="category" addCategory={this.props.addCategory} onChange={this.onChange}/><br/>
                <label htmlFor="AddPose">Add a Pose</label>
                {/*<PoseSelector poses={this.props.poses} addPose={true}/><br/>*/}
                <PoseAdd poses={this.props.poses} onClick={this.onClickAddPose} addedPoses={this.state.poses}/><br/>
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
        addSequence: (sequence) => dispatch(addSequence(sequence)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeqForm);