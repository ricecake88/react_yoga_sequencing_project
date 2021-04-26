import React, { Component } from 'react';
import Categories from './Categories';
import { connect } from 'react-redux';
import SeqCategoryAdd from './SeqCategoryAdd';
import { addCategory, getCategories } from '../../actions/categories';
import { editSequence } from '../../actions/sequences';
import { getPoses } from '../../actions/poses';
import { deletePoseFromSeq, addPoseToSeq } from '../../actions/poseInSeq'
import PoseAdd from '../sequences/PoseAdd';
import LoadingSpinner from '../LoadingSpinner';

import {v4 as uuid} from 'uuid';

class SeqForm extends Component {

    state = {
        sequence: {},
        name: null,
        category_id: null,
        isLoaded: false,
        pose_in_seqs:[]
    }

    componentDidMount = () => {
        console.log("components/sequences/SeqForm ->component did mount");
        console.log(this.props.user);
        this.props.getCategories(this.props.user);
        this.props.getPoses();
        if (this.props.sequences.length !== 0) {
            const sequence = this.props.sequences.find(sequence => sequence.id === parseInt(this.props.match.params.id))
            this.setState({
                sequence: sequence,
                name: sequence.name,
                category_id: sequence.category_id,
                pose_in_seqs: sequence.pose_in_seqs,
                isLoaded: true
            })
        }
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
                ...this.state.sequence,
                name: this.state.name,
                category_id: parseInt(this.state.category_id),
                user_id: this.props.user.id,
                pose_in_seqs: this.state.pose_in_seqs
            }
        } else {
            this.state.errors.push("ERROR category is illegal")
        }
        this.props.editSequence(sequence)
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
            //num_breaths: pose.num_breaths,
            num_breaths: 1,
            pose_order: this.state.pose_in_seqs.length
        }
        this.props.addPoseToSeq(this.state.sequence.id, pose_in_seq);
        this.setState({
            ...this.state,
            pose_in_seqs: [...this.state.pose_in_seqs, pose_in_seq ]
        })
        console.log(this.state.pose_in_seqs);

    }

    onClickDeletePose = (event, local_pose_id, id) => {
        event.preventDefault()
        console.log("onClickDeletePose")
        console.log(id);
        this.props.deletePoseFromSeq(id)
        debugger
        this.setState(prevState => ({
            ...this.state,
            pose_in_seqs: prevState.pose_in_seqs.filter((pose, index) => index !== local_pose_id)
        }))
        console.log(this.state)
    }

    onBlur = (event, poseElementId) => {
        event.preventDefault();
        console.log("onBlur");
        console.log(event.target.name);
        console.log(event.target.value);
        console.log(poseElementId);
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
        const source_num_breaths = items[result.source.index].num_breaths
        let reorderedItem = items.splice(result.source.index, 1)[0];
        reorderedItem.num_breaths = source_num_breaths;
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
        const {isLoaded, ...data} = this.state;
        return(
            isLoaded ?
            <div>
            <form onSubmit={this.onSubmit}>
                <label htmlFor="name"> Sequence Name: </label>
                <input type="name" name="name" onChange={this.onChange} value={this.state.name}/><br/>

                <select value={this.state.category_id} name="category_id" onChange={this.onChange}>
                    <Categories categories={this.props.categories} addCategory={this.props.addCategory} selectedCategoryId={this.state.category_id}/>
                </select>
                <SeqCategoryAdd user={this.props.currentUser} addTrue={this.state.category_id} name="category_id" addCategory={this.props.addCategory} onChange={this.onChange}/><br/>

                <label htmlFor="AddPose">Add a Pose</label>
                <PoseAdd poses={this.props.poses} onClick={this.onClickAddPose} addedPoses={this.state.pose_in_seqs} delete={this.onClickDeletePose} onBlur={this.onBlur} onDrag={this.handleOnDragEnd} onChange={this.onChange}/><br/>
                <input type="submit"></input>
            </form>
        </div> : <LoadingSpinner />)
    }
}

function mapStateToProps(state) {
    console.log("\t>>>SeqContainer -> mapStateToProps")
    console.log(state);
    return {
        categories: state.categories.categories,
        user: state.auth.currentUser,
        poses: state.poses.poses,
        sequences: state.sequences.sequences
     }
}

function mapDispatchToProps(dispatch) {
    console.log("\tCategories >> mapDispatchToProps");
    return {
        addCategory: (category) => dispatch(addCategory(category)),
        getCategories: (user) => dispatch(getCategories(user)),
        getPoses: () => dispatch(getPoses()),
        editSequence: (sequence) => dispatch(editSequence(sequence)),
        deletePoseFromSeq: (pose) => dispatch(deletePoseFromSeq(pose)),
        addPoseToSeq: (id, pose) => dispatch(deletePoseFromSeq(id, pose))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeqForm);