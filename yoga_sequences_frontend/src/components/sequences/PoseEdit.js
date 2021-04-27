import React, { Component } from 'react';

class PoseEdit extends Component {

    // state = {
    //     num_breaths: this.props.num_breaths,
    // }

    // onChange = (event) => {
    //     this.setState({
    //         num_breaths: parseInt(event.target.value)
    //     })
    // }
    render() {
        console.log("PoseEdit");
        console.log(this.props.poseInSeq)
        return (
        <>
            {this.props.poses.map(pose => {
                return (pose.id === this.props.poseInSeq.pose_id) ? pose.name : null
            })}
            <span><input key={this.props.poseInSeq.num_breaths} type="text" defaultValue={this.props.poseInSeq.num_breaths} name="num_breaths" onChange={(event) =>this.props.onChange(event)} onBlur={(event) => this.props.onBlur(event, this.props.index)}></input></span>
            {/*<span><input type="text" value={this.props.poseInSeq.num_breaths} name="num_breaths" onChange={(event) =>this.props.onChange(event)}></input></span>*/}

            <span><button onClick={(event) => this.props.delete(event, this.props.index, this.props.poseInSeq.id)}>X</button></span>
        </>)
    }
}

export default PoseEdit;