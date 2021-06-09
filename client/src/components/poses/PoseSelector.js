import React, { Component } from 'react';

class PoseSelector extends Component {

    state = {
        pose_id: 0
    }

    onChange = (event) => {
        event.preventDefault();
        this.setState({
            pose_id: event.target.value
        })
        this.props.updateValue(event.target.value);

    }

    display = () => {
        return (
            <>
               {this.props.select === "addToSeq" ?
                    <label htmlFor="pose">Add a Pose: </label>
                :
                    <label htmlFor="pose">Choose a Pose: </label>}
                    {this.props.poses.length !== 0 ? // TO-DO Can this.state.pose_id be handled completely from PoseContainer?
                        <select name="pose_id" onChange={this.onChange} value={this.state.pose_id} onClick={this.props.onClick}>
                            <option disabled value="">Select a Pose</option>
                            {this.props.poses.map(pose => <option key={pose.id} value={pose.id}>{pose.name}</option>)}
                        </select> : null
                }
            </>)

    }

    /* TO-DO: change to search by category or search via another way */
    render() {
        return (
            <>
                {this.display()}
            </>)
    }
}


export default PoseSelector;