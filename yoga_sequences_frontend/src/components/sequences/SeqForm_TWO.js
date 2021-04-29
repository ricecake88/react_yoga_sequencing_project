import React, { Component } from 'react';
import Categories from './Categories';
import { connect } from 'react-redux';
import SeqCategoryAdd from './SeqCategoryAdd';
import { addCategory, getCategories } from '../../actions/categories';
import { addSequence } from '../../actions/sequences';
import { editSequence } from '../../actions/sequences';
import { deletePoseFromSeq, addPoseToSeq } from '../../actions/poseInSeq'
import PoseAdd from './PoseAdd';
import { getPoses } from '../../actions/poses';
import { checkAuth } from "../../actions/auth";

class SeqForm_TWO extends Component {

    state = {
        sequence: {},
        name: '',
        category_id: '',
        pose_id: 0,
        pose_in_seqs: [],
        errors: [],
        isLoaded: false
    }

    componentDidMount = () => {
        console.log("components/sequences/SeqForm2 ->component did mount");
        console.log(this.props.user);
        //this.props.getCategories(this.props.user);
        //this.props.getPoses();
        this.props.dispatchCheckAuth();        
        if (this.props.route === "Edit") {
            if (this.props.sequences.length !== 0) {
                const sequence = this.props.sequences.find(sequence => sequence.id === parseInt(this.props.match.params.id))
    
                // sort poses in the sequence by pose order
                this.sortPoses(sequence.pose_in_seqs);
                this.setState({
                    sequence: sequence,
                    name: sequence.name,
                    category_id: sequence.category_id,
                    pose_in_seqs: sequence.pose_in_seqs,
                    isLoaded: true
                })
            }            
        }

    }

    onChange = (event) => {
        console.log("Sequence Form 2 -> onChange()")
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
        let sequence = {};
        if (this.state.category_id !== "Add Category") {
            sequence = {
                ...this.state.sequence,
                name: this.state.name,
                category_id: parseInt(this.state.category_id),
                user_id: this.props.user.id,
                pose_in_seqs: this.state.pose_in_seqs
            }
            if (this.props.route === "Add")
               this.props.addSequence(sequence)
            else if (this.props.route === "Edit")
               this.props.editSequence(sequence)            
        } else {
            this.state.errors.push("ERROR category is illegal")
        }
        this.setState({
            name: '',
            category_id: "",
            pose_in_seqs: [],
            pose_id: 0
        })
    }

    onClickAddPose = (event) => {
        event.preventDefault();
        console.log("onClickAddPose2");
        console.log(event.target.value)
        const pose = this.props.poses.find(pose => pose.id === parseInt(event.target.value));
        // creating a new pose object
        let pose_in_seq = {
            name: pose.name,
            pose_id: pose.id,
            num_breaths:  1,
            pose_order: this.state.pose_in_seqs.length
        }
        //if (this.props.route === "Edit") {
        //    this.props.addPoseToSeq(this.state.sequence.id, pose_in_seq)
       // }
        this.setState({
            ...this.state,
            pose_in_seqs: [...this.state.pose_in_seqs, pose_in_seq ]
            })
        console.log(this.state.pose_in_seqs);

    }

    onClickDeletePose = (event, id, localPoseId) => {
        event.preventDefault()
        console.log("onClickDeletePose")
        console.log("id + " + id);
        console.log("localPoseId " + localPoseId);
        if (id !== undefined && localPoseId !== undefined) {
            this.props.deletePoseFromSeq(id);          
        } 
        this.setState({
            ...this.state,
            pose_in_seqs: this.state.pose_in_seqs.filter((pose, index) => index !== localPoseId)
        })
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
                //debugger
                return index === poseElementId ? {...pose,
                    num_breaths: parseInt(event.target.value)}
                : pose
            })
        }))
        //debugger

    }

    handleOnDragEnd = (result) => {
        console.log("In handleOnDragEnd")
        console.log(result);
        let items = Array.from(this.state.pose_in_seqs)
        const source_num_breaths = items[result.source.index].num_breaths
        //debugger
        let reorderedItem = items.splice(result.source.index, 1)[0];
        reorderedItem.num_breaths = source_num_breaths;
       // debugger
        items.splice(result.destination.index, 0, reorderedItem);
        items.forEach((item, index) => {
            item.pose_order = index;
        })
        this.setState({
            ...this.state,
            pose_in_seqs: items
        })
    }

    sortPoses = (posesInSeq) => {
        if (posesInSeq.length !== 0) {
            posesInSeq.sort((a, b) => {
                if (a.pose_order < b.pose_order) {
                    return -1;
                }
                if (a.pose_order > b.pose_order) {
                    return 1;
                }
            return 0;
            })
        }
    }

    render() {
        console.log(">>> SequenceForm -> SeqForm")
        console.log(this.props);
        console.log(this.state);
        //Sequence.create!(:id => 1, :name => "Testing 2", :user_id => 2, :category_id => 4, :pose_in_seqs_attributes => [{:pose_id => 0, :num_breaths => 2, :pose_order => 1}, {:pose_id => 1, :num_breaths => 3, :pose_order => 0}]
        const route = this.props.route;
        return(
        <div>
            {route == "Add" ?
            <p>Create a New Sequence</p>
            : <p>Edit Sequence</p>}
            <form onSubmit={this.onSubmit}>
                <label htmlFor="name"> Sequence Name: </label>
                <input type="name" name="name" onChange={this.onChange} value={this.state.name}/><br/>

                <select value={this.state.category_id} name="category_id" onChange={this.onChange}>
                    <Categories categories={this.props.categories} addCategory={this.props.addCategory}/>
                </select>
                <SeqCategoryAdd user={this.props.currentUser} addTrue={this.state.category_id} name="category_id" addCategory={this.props.addCategory} onChange={this.onChange}/><br/>
                <label htmlFor="AddPose">Add a Pose</label>

                <PoseAdd route={this.props.route} poses={this.props.poses} onClick={this.onClickAddPose} addedPoses={this.state.pose_in_seqs} delete={this.onClickDeletePose} onBlur={this.onBlur} onDrag={this.handleOnDragEnd} onChange={this.onChange} /><br/>
                {(route === "Add") ?
                    <input type="submit" value="Create Sequence"></input>
                : <input type="submit" value="Save Changes"></input>}
            </form>
        </div> )
    }
}

function mapStateToProps(state) {
    console.log("\t>>>SeqContainer -> mapStateToProps")
    console.log(state);
    return {
        poses: state.poses.poses,
        sequences: state.sequences.sequences,        
        categories: state.categories.categories,
        user: state.auth.currentUser,
        auth: state.auth
     }
}

function mapDispatchToProps(dispatch) {
    console.log("\tCategories >> mapDispatchToProps");
    return {
        addCategory: (category) => dispatch(addCategory(category)),
        //getCategories: (user) => dispatch(getCategories(user)),
        addSequence: (sequence) => dispatch(addSequence(sequence)),
        //getPoses: () => dispatch(getPoses()),
        editSequence: (sequence) => dispatch(editSequence(sequence)),
        deletePoseFromSeq: (pose) => dispatch(deletePoseFromSeq(pose)),
        //addPoseToSeq: (sequence_id, pose) => dispatch(addPoseToSeq(sequence_id, pose)),
        dispatchCheckAuth: () => dispatch(checkAuth())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeqForm_TWO);