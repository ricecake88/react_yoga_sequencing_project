import React, { Component } from 'react';
import Pose from './Pose';

class PoseSelector extends Component {


    state = {
        pose: {}
    }

    componentDidMount = () => {
        if (Object.keys(this.props.poses).length !== 0) {
            this.setState({
                pose: this.props.poses[0]
            })
        }
    }

    onChange = (event) => {
        event.preventDefault();
        this.setState({
            pose: this.props.poses.find((pose) => pose.id === parseInt(event.target.value))
        })

    }

    /* eventually... change to search by category or search via another way */
    render() {
        console.log("PoseSelector -> render()")
        console.log(this.props)
        return (
        <>
            <select name="pose" onChange={this.onChange}>
                <option disabled value="">Select a Pose</option>
            {Object.keys(this.props.poses).length !== 0 ?
                this.props.poses.map(pose => <option key={pose.id} value={pose.id}>{pose.name}</option>)
            : null}
            </select>
            <> {this.props.addTrue ?
               Object.keys(this.state.pose).length !== 0 ?
                <Pose key={this.state.pose} pose={this.state.pose}/> : null
               :null}
               </>
        </>
        )
    }
}

export default PoseSelector;