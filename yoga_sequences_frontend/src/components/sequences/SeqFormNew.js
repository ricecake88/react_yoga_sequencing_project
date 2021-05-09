import React, { Component } from 'react';
import Categories from './Categories';
import Categories2 from './Categories2';
import { connect } from 'react-redux';
import SeqCategoryAdd from './SeqCategoryAdd';
import { addCategory, getCategories } from '../../actions/categories';
import { addSequence } from '../../actions/sequences';
import { editSequence, getSequence } from '../../actions/sequences';
import { deletePoseFromSeq } from '../../actions/poseInSeq'
import PoseAdd from './PoseAdd';
import { getPoses } from '../../actions/poses';
//import { checkAuth } from "../../actions/auth";
import LoadingSpinner from '../LoadingSpinner';
import SeqListNew from '../sequences/SeqListNew';
import Error from '../errors/Error';
import { ImFolderPlus } from 'react-icons/im';

class SeqFormNew extends Component {

    state = {
        sequence: {},
        name: '',
        category_id: '',
        pose_id: 0,
        pose_in_seqs: [],
        isLoaded: false,
        errors: [],
        saved: false
    }


    static getDerivedStateFromProps (props, current_state) {
        console.log("getDerivedStateFromProps")
        console.log(props);
        console.log(current_state);

        // on refresh or direct URL
        if (props.sequences.length === 0 && props.match.path === "/sequences/edit/:id") {
            // sequence from getSequence is returned and sequence for state has not yet been set
            // do this once
            if (Object.keys(props.sequence).length !== 0 && Object.keys(current_state.sequence).length === 0) {
                console.log("Setting it up initially")
                let name, category_id = '';
                let pose_in_seqs = [];
                name = props.sequence.name;
                category_id = props.sequence.category.id;
                if (props.sequence.pose_in_seqs.length !== 0) {
                    pose_in_seqs = props.sequence.pose_in_seqs
                    SeqFormNew.sortPoses2(props.sequence.pose_in_seqs)
                }
                return {
                    ...current_state,
                    sequence: props.sequence,
                    name: name,
                    category_id: category_id,
                    pose_in_seqs: pose_in_seqs
                }
            } else return current_state;
        } else return current_state;
    }

    componentDidMount = () => {
        console.log("components/sequences/SeqFormNew ->component did mount");
        console.log(this.props);
        console.log(this.state);
        let id = this.props.match.params.id;
        this.props.getPoses();
        if (this.props.sequences.length === 0 && this.props.match.path === "/sequences/edit/:id" ){
            console.log("Should not be in here")
            this.props.getSequence(this.props.match.params.id);
            let name, category_id = '';
            let pose_in_seqs = [];
            if (Object.keys(this.props.sequence).length !== 0) {
                name = this.props.sequence.name;
                category_id = this.props.sequence.category.id;
                if (this.props.sequence.pose_in_seqs.length !== 0) {
                    pose_in_seqs = this.props.sequence.pose_in_seqs
                    this.sortPoses(this.props.sequence.pose_in_seqs)
                }
            }
            this.setState(prevState => ({
                    ...prevState,
                    sequence: this.props.sequence,
                    //name: name,
                    category_id: category_id,
                    pose_in_seqs: pose_in_seqs,
                    isLoaded: true
                }))
           console.log(this.state);
        } else if  (this.props.match.path === "/sequences/edit/:id") {
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
        } else {
            this.setState({
                ...this.state,
                isLoaded: true
            })
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
            if (this.props.match.path === "/sequences/add") {
               this.props.addSequence(sequence)
               this.setState({
                    name: '',
                    category_id: "",
                    pose_in_seqs: [],
                    pose_id: 0,
                    sequence: {},
                })
            }
            else if (this.props.match.path === "/sequences/edit/:id") {
               this.props.editSequence(sequence);
               console.log(this.props.errors);
               console.log(this.props)
               this.setState({
                    ...this.state,
                    saved: true
               })
            }

        }

    }

    onClickAddPose = (event) => {
        event.preventDefault();
        console.log("onClickAddPose2");
        console.log(event.target.value)
        const pose = this.props.poses.find(pose => pose.id === parseInt(event.target.value));
        console.log(pose);
        // creating a new pose object
        let pose_in_seq = {
            name: pose.name,
            pose_id: pose.id,
            num_breaths:  1,
            pose_order: this.state.pose_in_seqs.length
        }
        //if (this.props.route === "Edit") {
        //    this.props.addPoseToSeq(this.state.sequence.id, pose_in_seq)
        //}
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
        let reorderedItem = items.splice(result.source.index, 1)[0];
        reorderedItem.num_breaths = source_num_breaths;
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


    static sortPoses2 = (posesInSeq) => {
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

    componentWillUnMount = () => {
        console.log("Sequence Form Unmounted");
    }

    render() {
        console.log(">>> SequenceFormNew -> SeqForm")
        console.log(this.props);
        console.log(this.state);
        //Sequence.create!(:id => 1, :name => "Testing 2", :user_id => 2, :category_id => 4, :pose_in_seqs_attributes => [{:pose_id => 0, :num_breaths => 2, :pose_order => 1}, {:pose_id => 1, :num_breaths => 3, :pose_order => 0}]
        const route = this.props.match.path.split("/")[2];
        console.log(route + "route")

        return (
            this.props.auth.loggedIn && this.props.user ?
                this.state.isLoaded ?
                    <div className="genericContainer">
                        <div className="genericInnerContainer">
                            {route === "add" ? <h1>Create a New Sequence</h1> : <h1>Edit Sequence</h1>}
                            {this.props.errors.length !== 0 ?
                                this.props.errors.map((error,index) => <Error key={index} className="errors" error={error}/>)
                            : this.state.saved ? "Saved" : null}
                            <form onSubmit={this.onSubmit}>
                                <label htmlFor="name"> Sequence Name: </label>
                                <input type="name" name="name" onChange={this.onChange} value={this.state.name}/><br/>

                                <label htmlFor="category">Category: </label>
                                {<select value={this.state.category_id} name="category_id" onChange={this.onChange}>
                                    <Categories categories={this.props.categories} addCategory={this.props.addCategory}/>
                                </select>}
                                <Categories2 user={this.props.user} addCategory={this.props.addCategory } id={this.state.category_id} onChange={this.onChange}/>
                                <SeqCategoryAdd user={this.props.user} addTrue={this.state.category_id} name="category_id" addCategory={this.props.addCategory} onChange={this.onChange}/><br/>

                                <PoseAdd poses={this.props.poses} onClick={this.onClickAddPose} addedPoses={this.state.pose_in_seqs} delete={this.onClickDeletePose} onBlur={this.onBlur} onDrag={this.handleOnDragEnd} onChange={this.onChange} /><br/>
                                {(route === "add") ?
                                    <input type="submit" value="Create A New Sequence"></input>
                                : <input type="submit" value="Save Changes"></input>}
                            </form>
                        {/*{route === "add" ? <SeqListNew poses={this.props.poses} delete={this.onDelete} sequences={this.props.sequences} categories={this.props.categories}/> : null}*/}
                        {/*<SeqListNew poses={this.props.poses} delete={this.onDelete} sequences={this.props.sequences} categories={this.props.categories}/>*/}
                        </div>
                    </div>
                : null
            : null
        )
    }
}

function mapStateToProps(state) {
    //console.log("\t>>>SeqContainer -> mapStateToProps")
    //console.log(state);
    //debugger
    return {
        poses: state.poses.poses,
        sequences: state.sequences.sequences,
        categories: state.categories.categories,
        user: state.auth.currentUser,
        auth: state.auth,
        errors: state.sequences.errors,
        loggedIn: state.auth.loggedIn,
        requesting: state.sequences.requesting,
        sequence: state.sequences.selSequence
     }
}

function mapDispatchToProps(dispatch) {
    //console.log("\tCategories >> mapDispatchToProps");
    return {

        // functions required
        addCategory: (category) => dispatch(addCategory(category)),
        addSequence: (sequence) => dispatch(addSequence(sequence)),
        editSequence: (sequence) => dispatch(editSequence(sequence)),
        deletePoseFromSeq: (pose) => dispatch(deletePoseFromSeq(pose)),
        getPoses: () => dispatch(getPoses()),

        // functions that get called upon refresh or direct page
        getSequence: (id) => dispatch(getSequence(id)),
        getCategories: (user) => dispatch(getCategories(user))

        //dispatchCheckAuth: () => dispatch(checkAuth()),
        //getSequences: (user) => dispatch(getSequences(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeqFormNew);