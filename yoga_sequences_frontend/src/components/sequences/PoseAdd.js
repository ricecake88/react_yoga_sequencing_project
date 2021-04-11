import React, { Component } from 'react';
import PoseSelector from '../poses/PoseSelector';
import PoseList from '../sequences/PoseList';

class PoseAdd extends Component {

    state = {
        poses: [],
        pose_id: 0,
    }

    onClick = (event) => {
        event.preventDefault();
        console.log("Pose Add to Sequence Click")
        this.setState({
            poses: [...this.state.poses]
        })
    }

    render() {
        console.log("PoseAdd");
        console.log(this.props.poses)
        return (
        <>
            <PoseSelector poses={this.props.poses} addTrue={true}/><br/>
            <button onClick={this.onClick}>+</button><br/>
            Poses that are added go here<br/>
            {(this.state.poses.length !== 0) ?
                <PoseList poses={this.state.poses}/> : null
            }
        </>)
    }
}

export default PoseAdd;