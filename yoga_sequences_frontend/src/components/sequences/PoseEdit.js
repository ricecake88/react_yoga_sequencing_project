import React, { Component } from 'react';

class PoseEdit extends Component {

    render() {
        console.log("PoseEdit");
        console.log(this.props.poseInSeq)
        return (
        <>
            {this.props.poses.map(pose => {
                return (pose.id === this.props.poseInSeq.pose_id) ? pose.name : null
            })}
            {/* Input for num_breaths */}
            <span>
                <input key={this.props.poseInSeq.num_breaths} type="text" defaultValue={this.props.poseInSeq.num_breaths} name="num_breaths" onChange={(event) =>this.props.onChange(event)} onBlur={(event) => this.props.onBlur(event, this.props.index)}></input>
            </span>
            {this.props.route === "Add" ?
                <span><button onClick={(event) => this.props.delete(event, this.props.index )}>X</button></span>
            :
                <span><button onClick={(event) => this.props.delete(event, this.props.poseInSeq.id, this.props.index )}>X</button></span>}

        </>)
    }
}

export default PoseEdit;