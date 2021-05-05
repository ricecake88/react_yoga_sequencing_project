import React, { Component } from 'react';
import PoseSelector from '../poses/PoseSelector';
import PoseDraggable from '../sequences/PoseDraggable';

class PoseAdd extends Component {

    state = {
        //poses: [], // < ---- move this to Sequence Form, test if I can submit a sequence with multiple poses first
        pose_id: 0,
        pose: this.props.poses.find(pose => pose.id === 0),
    }

    updateValue = (id) => {
        const pose = this.props.poses.find(pose => pose.id === parseInt(id));
        this.setState({
            ...this.state,
            pose_id: parseInt(id),
            pose: pose

        })
    }

    render() {
        console.log("PoseAdd");
        console.log(this.props)
        return (
        <>
            <PoseSelector poses={this.props.poses} updateValue={this.updateValue} select="addToSeq"/>
                <button onClick={this.props.onClick} value={this.state.pose_id}>+</button><br/>

            {(this.props.addedPoses.length !== 0) ?
                <PoseDraggable poses={this.props.poses} addedPoses={this.props.addedPoses} delete={this.props.delete} onBlur={this.props.onBlur} onDrag={this.props.onDrag} onChange={this.props.onChange}/> : null
            }
        </>)
    }
}

export default PoseAdd;