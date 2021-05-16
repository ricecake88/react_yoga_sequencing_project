import React, { Fragment } from 'react';
import Categories2 from './Categories2';
//import { connect } from 'react-redux';
import SeqCategoryAdd from './SeqCategoryAdd';
//import { addCategory } from '../../actions/categories';
//import { addSequence } from '../../actions/sequences';
//import { editSequence } from '../../actions/sequences';
//import { deletePoseFromSeq } from '../../actions/poseInSeq'
import PoseAdd from './PoseAdd';
//import Login from '../auth/Login';
import Error from '../errors/Error';

const Form  = (props) => {
    return (
        <Fragment>
        {props.route === "add" ? <h1>Create a New Sequence</h1> : <h1>Edit Sequence</h1>}
        {props.error !== null ? <Error className="errors" error={props.error}/> : null}
        {props.message}
        <form onSubmit={props.onSubmit}>
            <label htmlFor="name"> Sequence Name: </label>
            <input type="name" name="name" onChange={props.onChange} value={props.name} onClick={()=>props.onClick()}/><br/>
            <Categories2 
                user={props.auth.currentUser}
                categories={props.categories}
                addCategory={props.addCategory } 
                id={props.category_id} 
                onChange={props.onChange}
                onClick={props.onClick}/>
            <SeqCategoryAdd 
                user={props.auth.currentUser} 
                addTrue={props.category_id} 
                name="category_id" 
                addCategory={props.addCategory} 
                onChange={props.onChange}/><br/>
            <PoseAdd 
                poses={props.poses} 
                onClick={props.onClick}
                onClickAddPose={props.onClickAddPose} 
                addedPoses={props.pose_in_seqs} 
                delete={props.onClickDeletePose} 
                onBlur={props.onBlur} 
                onDrag={props.handleOnDragEnd} 
                onChange={props.onChange} /><br/>
            {(props.route === "add") ?
                <input type="submit" value="Create A New Sequence"></input>
            : <input type="submit" value="Save Changes"></input>}
        </form>
        </Fragment>
    )
}



export default (Form);