import React, { Component } from 'react';



class PoseSelector extends Component {

    state = {
        pose_id: 0
    }

    onChange = (event) => {
        console.log("PoseSelector -> onChange")
        console.log(event.target.value);
        event.preventDefault();
        this.setState({
            pose_id: event.target.value
        })
        this.props.updateValue(event.target.value);

    }

    display = () => {
        console.log("in display")
        console.log(this.state)
        console.log(this.props.poses)

        return (
            <>
            {this.props.poses.length !== 0 ?
                <select name="pose_id" onChange={this.onChange} value={this.state.pose_id}>
                    <option disabled value="">Select a Pose</option>
                    {this.props.poses.map(pose => <option key={pose.id} value={pose.id}>{pose.name}</option>)}
                </select> : null}
            </>)
       
    }

    /* eventually... change to search by category or search via another way */
    render() {
        console.log("PoseSelector -> render()")
        console.log(this.props);
        console.log(this.state);
        return (
            <>
                {this.display()}
            </>)
    }
}


export default PoseSelector;