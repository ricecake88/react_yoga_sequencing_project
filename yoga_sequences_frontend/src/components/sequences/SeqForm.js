import React, { Component } from 'react';
import Categories from './Categories';
import { connect } from 'react-redux';
import CategoryAdd from './CategoryAdd';
import { addCategory, getCategories } from '../../actions/categories';
import { addSequence } from '../../actions/sequences';
import PoseAdd from '../sequences/PoseAdd';
import {v4 as uuid} from 'uuid';

class SeqForm extends Component {

    state = {
            name: '',
            category_id: "",
            //poses: [],
            pose_id: 0,
            pose_in_seqs: [],
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

    /* this goes to the server */
    onSubmit = (event) => {
        event.preventDefault();
        console.log("on Submit")
        console.log(this.state);
        let sequence = {}
        if (this.state.category_id !== "Add Category") {
            sequence = {
            name: this.state.name,
            category_id: parseInt(this.state.category_id),
            user_id: this.props.user.id,
            pose_in_seqs: this.state.pose_in_seqs
            }
        } else {
            this.state.errors.push("ERROR category is illegal")
        }
        this.props.addSequence(sequence)
        this.setState({
            name: '',
            category_id: "",
            //poses: [],
            pose_in_seqs: [],
            pose_id: 0
        })
    }

    onClickAddPose = (event) => {
        event.preventDefault();
        console.log("onClickAddPose");
        console.log(event.target.value)
        const pose = this.props.poses.find(pose => pose.id === parseInt(event.target.value));
        const pose_in_seq = {
            name: pose.name,
            pose_id: pose.id,
            num_breaths: pose.num_breaths,
            pose_order: this.state.pose_in_seqs.length
        }
        this.setState({
            //pose_id: event.target.value,
            //poses: [...this.state.poses, pose],
            ...this.state,
            pose_in_seqs: [...this.state.pose_in_seqs, pose_in_seq ]
        })
        console.log(this.state.pose_in_seqs);

    }

    onClickDeletePose = (event, id) => {
        event.preventDefault()
        console.log("onClickDeletePose")
        console.log(id);
        debugger
        this.setState({
            ...this.state,
            pose_in_seqs: this.state.pose_in_seqs.filter((pose, index) => index !== id)
        })
        console.log(this.state)
    }

    onBlur = (event, poseElementId) => {
        event.preventDefault();
        console.log("onBlur");
        console.log(event.target.name);
        console.log(event.target.value);
        console.log(poseElementId);
       /* this.setState({
            ...this.state,
            pose_in_seqs: this.state.pose_in_seqs.map((pose, index) => {
                return index === poseElementId ? {...pose,
                    [event.target.name]: parseInt(event.target.value)}
                : pose
            })
        })*/
        this.setState(prevState => ({
            ...prevState,
            pose_in_seqs: prevState.pose_in_seqs.map((pose, index) => {
                return index === poseElementId ? {...pose,
                    [event.target.name]: parseInt(event.target.value)}
                : pose
            })
        }))

    }

    handleOnDragEnd = (result) => {
        console.log("In handleOnDragEnd")
        console.log(result);
        let items = Array.from(this.state.pose_in_seqs)
        const reorderedItem = items.splice(result.source.index, 1)[0];
        items.splice(result.destination.index, 0, reorderedItem);
        items.forEach((item, index) => {
            item.pose_order = index;
        })
        this.setState({
            pose_in_seqs: items
        })
    }

    render() {
        console.log(">>> SequenceForm -> SeqForm")
        console.log(this.props);
        console.log(this.state);
        //Sequence.create!(:id => 1, :name => "Testing 2", :user_id => 2, :category_id => 4, :pose_in_seqs_attributes => [{:pose_id => 0, :num_breaths => 2, :pose_order => 1}, {:pose_id => 1, :num_breaths => 3, :pose_order => 0}]
        return(
        <div>
            <form onSubmit={this.onSubmit}>
                <label htmlFor="name"> Sequence Name: </label>
                <input type="name" name="name" onChange={this.onChange} value={this.state.name}/><br/>

                <select value={this.state.category_id} name="category_id" onChange={this.onChange}>
                    <Categories categories={this.props.categories} addCategory={this.props.addCategory}/>
                </select>
                <CategoryAdd user={this.props.currentUser} addTrue={this.state.category_id} name="category_id" addCategory={this.props.addCategory} onChange={this.onChange}/><br/>
                <label htmlFor="AddPose">Add a Pose</label>
                {/*<PoseSelector poses={this.props.poses} addPose={true}/><br/>*/}
                <PoseAdd poses={this.props.poses} onClick={this.onClickAddPose} addedPoses={this.state.pose_in_seqs} delete={this.onClickDeletePose} onBlur={this.onBlur} onDrag={this.handleOnDragEnd}/><br/>
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