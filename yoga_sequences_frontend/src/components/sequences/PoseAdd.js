import React, { Component } from 'react';
import PoseSelector from '../poses/PoseSelector';
import PoseList from '../sequences/PoseList';
import PoseTable from '../sequences/PoseTable';
import PoseDraggable from '../sequences/PoseDraggable';

class PoseAdd extends Component {

    state = {
        //poses: [], // < ---- move this to Sequence Form, test if I can submit a sequence with multiple poses first
        pose_id: 0,
        pose: this.props.poses.find(pose => pose.id === 0),
    }

    onClick = (event) => {
        event.preventDefault();
        console.log("Pose Add to Sequence Click");
        console.log(event.target.value)
        /*const pose = this.props.poses.find(pose => pose.id === parseInt(event.target.value));
        this.setState({
            //pose_id: event.target.value,
            poses: [...this.state.poses, pose]
        })*/

    }

    updateValue = (id) => {
        const pose = this.props.poses.find(pose => pose.id === parseInt(id));
        this.setState({
            pose_id: parseInt(id),
            //poses: [...this.state.poses, pose]

        })
    }

    render() {
        console.log("PoseAdd");
        console.log(this.props)
        return (
        <>
            <PoseSelector poses={this.props.poses} updateValue={this.updateValue}/>
            {/*<button onClick={this.onClick} value={this.state.pose_id}>+</button><br/>*/}
            <button onClick={this.props.onClick} value={this.state.pose_id}>+</button><br/>
            {/*(this.state.poses.length !== 0) ?
                <PoseList poses={this.state.poses}/> : null
            */}
            {/*(this.props.addedPoses.length !== 0) ?
                <PoseList poses={this.props.addedPoses}/> : null
            */}
            {/*(this.props.addedPoses.length !== 0) ?
                <PoseTable poses={this.props.addedPoses} delete={this.props.delete} onBlur={this.props.onBlur}/> : null
            */}
            {(this.props.addedPoses.length !== 0) ?
                <PoseDraggable poses={this.props.poses} addedPoses={this.props.addedPoses} delete={this.props.delete} onBlur={this.props.onBlur} onDrag={this.props.onDrag}/> : null
            }
        </>)
    }
}

export default PoseAdd;