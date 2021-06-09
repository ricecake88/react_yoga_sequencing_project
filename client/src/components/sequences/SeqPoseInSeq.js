import React, { Component } from 'react';
import { connect } from 'react-redux';

class SeqPoseInSeq extends Component {

    render() {
        const pose = this.props.poses.find(pose => pose.id === this.props.pose.pose_id);
        return (
            pose !== undefined ?
             <div>
                {/* for debugging
                <p>{this.props.pose.id}</p>
                <p>{this.props.pose.pose_order}</p>
                */}
                <p className="big center">{pose.name}</p>
                <img src={require(`../../assets/images/poses/${pose.image}.png`).default}
                    alt={`${pose.image}`}
                    className="poseImg"/><br/>
                {/*
                <p>{pose.url}</p>
                <p>{pose.video}</p>*/}
                <p>{pose.description}</p>
                {/*<p>{this.props.pose.num_breaths}</p>*/}
            </div> : null
        )
    }
}


export default connect() (SeqPoseInSeq);
