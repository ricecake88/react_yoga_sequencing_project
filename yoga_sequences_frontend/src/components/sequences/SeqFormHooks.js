import React, { Component } from 'react';
import { connect, useSelector } from 'react-redux';
impor { createSelector } from 'reselect';
import { addCategory, getCategories } from '../../actions/categories';
import { addSequence } from '../../actions/sequences';
import { editSequence, getSequence, deleteSequence } from '../../actions/sequences';
import { deletePoseFromSeq } from '../../actions/poseInSeq';
import { setError } from '../../actions/errors';
//import Form from './Form';
import SeqCategories from './SeqCategories';
import { SeqCategoriesHooks } from './SeqCategoriesHooks';
//import SeqCategoryAdd from './SeqCategoryAdd';
import SeqPoseAdd from './SeqPoseAdd';
import SeqList from './SeqList';
import Error from '../errors/Error';

class SeqForm extends Component {

    state = {
        sequence: {},
        name: '',
        category_id: '',
        pose_id: 0,
        //pose_in_seqs: [],
        isLoaded: false,
        message: ''
    }


    /* gets called before componentDidMount, which sets up
       initial values state values */
    static getDerivedStateFromProps (props, current_state) {

        // on refresh or direct URL
        if (props.match.path === "/sequences/edit/:id") {

            // sequence from getSequence is returned and sequence for state has not yet been set
            // do this once when sequence has been received yet the state has not been set
            if (Object.keys(props.sequence).length !== 0 && Object.keys(current_state.sequence).length === 0) {


                //let pose_in_seqs = [];
                let name= props.sequence.name;
                let category_id = props.sequence.category.id;
                if (props.sequence.pose_in_seqs.length !== 0) {
                    //pose_in_seqs = props.sequence.pose_in_seqs
                    SeqForm.sortPoses(props.sequence.pose_in_seqs)
                }

                // set up state so the page will render with these properties
                // after componentDidMount (after retrieving sequence)
                return {
                    ...current_state,
                    sequence: props.sequence,
                    name: name,
                    category_id: category_id,
                    //pose_in_seqs: SeqForm.sortPoses(props.sequence.pose_in_seqs)
                }
            } else return current_state;
        } else return current_state;
    }

    componentDidMount = () => {

        // came through direct, therefore passed props may not be available yet
        if (this.props.sequences.length === 0 && this.props.match.path === "/sequences/edit/:id" ){

            // retrieve sequence associated with id in URL
            this.props.getSequence(this.props.match.params.id)
            .catch(err => console.log(err));

            //initialize state variables
            //let pose_in_seqs = [];

            // sequence has been retrieved
            if (Object.keys(this.props.sequence).length !== 0) {

                // update state with values from sequence information
                if (this.props.sequence.pose_in_seqs.length !== 0) {
                    //pose_in_seqs = this.props.sequence.pose_in_seqs
                    SeqForm.sortPoses(this.props.sequence.pose_in_seqs)
                }
            }

            // set state with new information if available
            // and set isLoaded to true since request to retrieve
            // sequence has been initiated
            this.setState(prevState => ({
                ...prevState,
                sequence: this.props.sequence,
                //pose_in_seqs: pose_in_seqs,
                isLoaded: true
            }))
           //console.log(this.state);
        } else if  (this.props.match.path === "/sequences/edit/:id") {

            // edit path, props are available immediately through SeqFormContainer
            if (this.props.sequences.length !== 0) {
                const sequence = this.props.sequences.find(sequence => sequence.id === parseInt(this.props.match.params.id))

                // sort poses in the sequence by pose order
                SeqForm.sortPoses(sequence.pose_in_seqs);
                this.setState({
                    sequence: sequence,
                    name: sequence.name,
                    category_id: sequence.category.id,
                    //pose_in_seqs: sequence.pose_in_seqs,
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

    onClick = () => {
        this.props.clearErrorMessage();
        this.setState({
            ...this.state,
            message: ''
        })
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    /* this goes to the server */
    onSubmit = (event) => {
        event.preventDefault();
        let sequence = {};
        this.onClick();

        // if the category state is not adding a category
        if (this.state.category_id !== "Add Category") {
            sequence = {
                ...this.state.sequence,
                name: this.state.name,
                category_id: parseInt(this.state.category_id),
                user_id: this.props.user.id,
                //pose_in_seqs: this.state.pose_in_seqs
            }
            if (this.props.match.path === "/sequences/add") {
               this.props.addSequence(sequence)
               .then(resp => {
                    this.setState({
                        name: '',
                        category_id: "",
                        //pose_in_seqs: [],
                        pose_id: 0,
                        sequence: {},
                        message: 'Saved Sequence.'
                    })
                })
                .catch(err => console.log(err))

            }
            else if (this.props.match.path === "/sequences/edit/:id") {
               this.props.editSequence(sequence)
               .then(resp => {
                    this.setState({
                    name: '',
                    category_id: "",
                    //pose_in_seqs: [],
                    pose_id: 0,
                    sequence: {},
                    message: 'Saved Sequence.'
                    })
                }).catch(err => console.log(err))
            }

        } else {
            // category state is still in adding a category when
            // user tries to submit
            this.props.setError('Category not added, cannot submit.')
        }

    }


    onClickAddPose = (event) => {
        event.preventDefault();

        const pose = this.props.poses.find(pose => pose.id === parseInt(event.target.value));

        // creating a new pose object
        let pose_in_seq = {
            name: pose.name,
            pose_id: pose.id,
            num_breaths:  1,
            pose_order: Object.keys(this.state.sequence).length !== 0 ? this.state.sequence.pose_in_seqs.length : 0
        }
        // this isn't called to duplicate the behaviour in creating a new object
        /*if (this.props.route === "Edit") {
            this.props.addPoseToSeq(this.state.sequence.id, pose_in_seq)
        }*/
        this.setState({
            ...this.state,
            sequence: {
                ...this.state.sequence,
                pose_in_seqs: Object.keys(this.state.sequence).length !== 0 ? [...this.state.sequence.pose_in_seqs, pose_in_seq ] : [pose_in_seq]
            }
        })

    }

    /* delete pose from state pose_in_seqs and
       also the database pose_in_seqs */
    onClickDeletePose = (event, id, localPoseId) => {
        event.preventDefault()

        // if the id is not defined (meaning this is the edit view)
        // delete the pose from the sequence database, otherwise
        // edit does not update the pose_in_seqs in seq
        if (id !== undefined && localPoseId !== undefined) {
            this.props.deletePoseFromSeq(id);
        }

        // remove the pose_in_seqs state
        this.setState({
            ...this.state,
            sequence: {
                ...this.state.sequence,
                pose_in_seqs: this.state.sequence.pose_in_seqs.filter((pose, index) => index !== localPoseId)
            }
        })

    }

    /* update the num_breaths of the pose in seqs element
       once input is no longer selected */
    onBlur = (event, poseElementId) => {
        this.setState(prevState => ({
            ...prevState,
            sequence: {
                ...prevState.sequence,
                pose_in_seqs: prevState.sequence.pose_in_seqs.map((pose, index) => {
                    return index === poseElementId ? {...pose,
                        num_breaths: parseInt(event.target.value)}
                    : pose
                })
            }
        }))
    }

    /* when pose element has finished being dragged
        update the pose_order and the related num
        breaths */
    handleOnDragEnd = (result) => {

        let items = Array.from(this.state.sequence.pose_in_seqs)

        // get the num_breaths of the pose element being dragged
        const source_num_breaths = items[result.source.index].num_breaths

        // get the reordered item
        let reorderedItem = items.splice(result.source.index, 1)[0];

        // reset the num_breaths to dragged pose element to what it was previously
        reorderedItem.num_breaths = source_num_breaths;

        // place reordered item to destination index
        items.splice(result.destination.index, 0, reorderedItem);

        // re number the pose_order of each pose element by index
        items.forEach((item, index) => {
            item.pose_order = index;
        })

        // update the pose_in_seqs to the reordered list of poses in sequence
        this.setState({
            ...this.state,
            sequence: {
                ...this.state.sequence,
                pose_in_seqs: items
            }
        })
    }

    /* reorder pose in sequences by pose_order */
    static sortPoses = (posesInSeq) => {

        // verify if pose in sequences are not empty
        if (posesInSeq.length !== 0) {

            // order pose in sequences in ascending order
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

    onDeleteSeq = (id) => {
        this.props.deleteSequence(id)
        .then(resp => {
            this.setState({
                ...this.state,
                message: 'Sequence Deleted.'
            })
        })
        .catch(err => console.log(err))
    }

    /*render() {
        // get the route based on path - edit or add
        const route = this.props.match.path.split("/")[2];

        return (
            this.state.isLoaded ?
                <Form
                    route={route}
                    error={this.props.error}
                    message={this.state.message}

                    // form props
                    onSubmit={this.onSubmit}
                    onChange={this.onChange}
                    name={this.state.name}
                    onClick={this.onClick}

                    // category props
                    category_id={this.state.category_id}
                    addCategory={this.props.addCategory}

                    // pose props
                    onClickAddPose={this.onClickAddPose}
                    //pose_in_seqs={this.state.pose_in_seqs}
                    pose_in_seqs={this.state.sequence.pose_in_seqs}
                    onClickDeletePose={this.onClickDeletePose}
                    onBlur={this.onBlur}
                    handleOnDragEnd={this.handleOnDragEnd}

                    onDeleteSeq={this.onDeleteSeq}
                />
            : null
        )
    }*/


    render() {
        const route = this.props.match.path.split("/")[2];
        return (
            this.state.isLoaded ?
                <>
                    {route === "add" ? 
                        <h1 className="center">Create a New Sequence</h1> 
                    : <h1 className="center">Edit Sequence</h1>}
                    <Error error={this.props.error}/>
                    <div className="message">{this.state.message}</div>
                    <form onSubmit={this.onSubmit}>
                        <label htmlFor="name"> Sequence Name: </label>
                        <input type="name" name="name" onChange={this.onChange} value={this.state.name} onClick={()=>this.onClick()}/><br/>
                        {/*<SeqCategories
                            addCategory={this.props.addCategory } 
                            id={this.state.category_id} 
                            onChange={this.onChange}
                        onClick={this.onClick}/>*/}
                        <SeqCategoriesHooks
                            addCategory={this.props.addCategory } 
                            id={this.state.category_id} 
                            onChange={this.onChange}
                            onClick={this.onClick}/>                        
                        <SeqPoseAdd 
                            onClick={this.onClick}
                            onClickAddPose={this.onClickAddPose} 
                            addedPoses={this.state.sequence.pose_in_seqs} 
                            delete={this.onClickDeletePose} 
                            onBlur={this.onBlur} 
                            onDrag={this.handleOnDragEnd} 
                            onChange={this.onChange} />
                        <br/>
                        {route === "add" ?
                            <button type="submit" value="Save New Sequence">Save New Sequence</button>
                        : <button type="submit" value="Save Changes">Save Changes</button>}
                    </form>
                    <br/>
                    {route === "add" ?
                        <SeqList onDelete={this.onDeleteSeq}/>
                    : null}
                </>
            : null
        )        
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.currentUser,
        error: state.error.error,
        poses: state.poses.poses,
        sequence: state.sequences.selSequence
     }
}

function mapDispatchToProps(dispatch, props) {
    return {

        // functions required regardless of navigating from container or refresh/direct
        addCategory: (category) => dispatch(addCategory(category)),
        addSequence: (sequence) => props.match.path === "/sequences/add" ? dispatch(addSequence(sequence)) : null,
        editSequence: (sequence) => props.match.path === "/sequences/edit/:id" ? dispatch(editSequence(sequence)) : null,
        deletePoseFromSeq: (pose) => dispatch(deletePoseFromSeq(pose)),

        // related to sequence list
        deleteSequence: (id) => dispatch(deleteSequence(id)),

        // functions only needed upon refresh or directly accessed
        getSequence: (id) => props.sequences.length === 0 ? dispatch(getSequence(id)) : null,
        getCategories: (user) => props.sequences.length === 0 ? dispatch(getCategories(user)) : null,
        setError: (msg) => dispatch(setError(msg))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeqForm);