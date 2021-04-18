import React, { Component } from 'react';

class PoseTable extends Component  {

    state = {
        numBreaths: 0,
        poseOrder: 0,
        count: 0,
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        console.log("Pose Table")
        return (
            <>
                {this.props.poses.map((pose,index) =>
                    <li key={index}>
                        <span>{pose.name}</span>
                        <span><input type="text" name="num_breaths" onChange={this.onChange} onBlur={(event) => this.props.onBlur(event, pose.id)}></input></span>
                        <span><input type="text" name="pose_order" onChange={this.onChange} onBlur={(event) => this.props.onBlur(event, pose.id)}></input></span>
                        <span><button onClick={(event) => this.props.delete(event, index)}>X</button></span>
                    </li>)}
            </>
        )
    }
}

export default PoseTable;