import React, { Component } from 'react';
import PoseSelector from '../components/poses/PoseSelector';
import Pose from '../components/poses/Pose';
import { connect } from 'react-redux';
import { getPoses } from '../actions/poses';
import LoadingSpinner from '../components/LoadingSpinner';

class PoseContainer extends Component {

    state = {
        // currently selected pose_id
        pose_id: 0,

        // pose related to pose_id
        pose: {},
        isLoaded: false

    }

    // set initial pose to the first one after componentDidMount
    // and retrieving list of poses 
    static getDerivedStateFromProps = (props, currentState) => {

        // when pose has not been set yet, set up the initial pose
        // only once
        if (Object.keys(currentState.pose).length === 0 && props.poses.length !== 0 && props.match.url === '/poses') {
            return {
                ...currentState,
                pose_id: 0,
                pose: props.poses.find(pose => pose.id === 0),
            }
        } return currentState;
    }

    updateValue = (val) => {
        //console.log("updating Value")
        //console.log(val)
        //updated pose based on selection
        this.setState({
            ...this.state,
            pose_id: parseInt(val),
            pose: this.props.poses.length !==0 ? this.props.poses.find(pose => pose.id === parseInt(val)) : {}
        })
    }

    componentDidMount = () => {

        // retrieve all poses
        this.props.getPoses();

        // update state to loaded once all poses have been retrieved
        this.setState({
            ...this.state,
            isLoaded: true
        })
    }

    displayPose = () => {
        //console.log("displayPose")
        //console.log(this.state.pose_id);
        // if the pose exists, update the pose with the latest related information
        // based on the select
        if (Object.keys(this.state.pose).length !== 0) {
            return <Pose key={this.state.pose_id} pose={this.state.pose} />
        }
    }

    render() {
        const { isLoaded } = this.state;
        return isLoaded ? <div>
            <h1>Poses</h1>
            {/*display the drop down select for all the poses, requires list of all poses and the
            callback to update the state based on selection */}
            <form>
                <PoseSelector poses={this.props.poses} updateValue={this.updateValue}/>
            </form>
                {/*display the Pose */}
                {this.displayPose()}
        </div> : <LoadingSpinner />
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