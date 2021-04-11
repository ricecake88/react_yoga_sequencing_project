import React, { Component } from 'react';
import PoseSelector from '../components/poses/PoseSelector';
import Pose from '../components/poses/Pose';
import { connect } from 'react-redux';
import { getPoses } from '../actions/poses';

class PoseContainer extends Component {

    state = {
        pose_id: 0,
        pose: this.props.poses.length !==0 ? this.props.poses.find(pose => pose.id === 0) : {}

    }

    updateValue = (val) => {
        console.log("updating Value")
        console.log(this.props.poses)
        this.setState({
            pose_id: parseInt(val),
            pose: this.props.poses.length !==0 ? this.props.poses.find(pose => pose.id === parseInt(val)) : {}
        })
    }

    componentDidMount = () => {
        this.props.getPoses();
    }

    displayPose = () => {
        console.log("displayPose")
        if (Object.keys(this.state.pose).length !== 0) {
            return <Pose key={this.state.value} pose={this.state.pose} />
        } else {
            console.log("BLAH")
        }
    }
    render() {
        return <>
            <PoseSelector poses={this.props.poses} updateValue={this.updateValue}/>
            {this.displayPose()}
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        poses: state.poses.poses
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getPoses: () => dispatch(getPoses())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PoseContainer);