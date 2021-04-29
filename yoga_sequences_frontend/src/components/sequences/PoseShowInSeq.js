import React, { Component } from 'react';
import { connect } from 'react-redux';

class PoseShowInSeq extends Component {

    render() {
        const pose = this.props.poses.find(pose => pose.id === this.props.pose.pose_id);
        return (
            pose !== undefined ?
             /*<div onChange={this.props.onChange()}>*/
             <div>
                <p>{this.props.pose.id}</p>
                <p>{this.props.pose.pose_order}</p>
                <p>{pose.name}</p>
                <p>{pose.description}</p>
                <p>{this.props.pose.num_breaths}</p>
            </div> : null
        )
    }
}


export default connect() (PoseShowInSeq);

/*const SeqShow = ({match}) => {
    console.log(match)
    return <div>
        Selected: {match.params.id}
    </div>
}

export default SeqShow;*/