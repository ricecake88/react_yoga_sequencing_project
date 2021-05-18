import React, { Fragment } from 'react';
import SeqCategories from './SeqCategories';
import SeqCategoryAdd from './SeqCategoryAdd';
import SeqPoseAdd from './SeqPoseAdd';
import SeqList from './SeqList';
import Error from '../errors/Error';

const Form  = (props) => {
    return (
        <Fragment>
        {props.route === "add" ? 
            <h1 className="center">Create a New Sequence</h1> 
        : <h1 className="center">Edit Sequence</h1>}
        {props.error !== null ? <Error error={props.error}/> : null}
        <div className="message">{props.message}</div>
        <form onSubmit={props.onSubmit}>
            <label htmlFor="name"> Sequence Name: </label>
            <input type="name" name="name" onChange={props.onChange} value={props.name} onClick={()=>props.onClick()}/><br/>
            <SeqCategories
                addCategory={props.addCategory } 
                id={props.category_id} 
                onChange={props.onChange}
                onClick={props.onClick}/>
            {/* TO-DO: Move this to SeqCategories */}
            <SeqCategoryAdd 
                addTrue={props.category_id} 
                name="category_id" 
                addCategory={props.addCategory} 
                onChange={props.onChange}/>
            <br/>
            <SeqPoseAdd 
                onClick={props.onClick}
                onClickAddPose={props.onClickAddPose} 
                addedPoses={props.pose_in_seqs} 
                delete={props.onClickDeletePose} 
                onBlur={props.onBlur} 
                onDrag={props.handleOnDragEnd} 
                onChange={props.onChange} />
            <br/>
            {(props.route === "add") ?
                <button type="submit" value="Save New Sequence">Save New Sequence</button>
            : <button type="submit" value="Save Changes">Save Changes</button>}
        </form>
        <br/>
        {props.route === "add" ?
            <SeqList />
        : null}
        </Fragment>
    )
}



export default (Form);