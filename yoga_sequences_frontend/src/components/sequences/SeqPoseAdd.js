import React, { Component } from 'react';
import { connect } from 'react-redux';
import PoseSelector from '../poses/PoseSelector';
import SeqPoseDraggable from './SeqPoseDraggable';

class PoseAdd extends Component {

    state = {
        pose_id: 0,
        pose: this.props.poses.find(pose => pose.id === 0),
    }

    updateNumBreaths = (id) => {
        const pose = this.props.poses.find(pose => pose.id === parseInt(id));
        this.setState({
            ...this.state,
            pose_id: parseInt(id),
            pose: pose

        })
    }

    render() {
        return (
        <>
            <PoseSelector poses={this.props.poses} updateValue={this.updateNumBreaths} select="addToSeq" onClick={this.props.onClick}/>
                <button onClick={this.props.onClickAddPose} value={this.state.pose_id}>+</button><br/>

            {(this.props.addedPoses.length !== 0) ?
                <SeqPoseDraggable poses={this.props.poses} addedPoses={this.props.addedPoses} delete={this.props.delete} onBlur={this.props.onBlur} onDrag={this.props.onDrag} onChange={this.props.onChange}/> : null
            }
        </>)
    }
}

const mapStateToProps = (state) => {
    return {
        poses: state.poses.poses
    }
}
export default connect(mapStateToProps) (PoseAdd);