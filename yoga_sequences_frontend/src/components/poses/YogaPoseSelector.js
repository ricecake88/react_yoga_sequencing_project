import React, { Component } from 'react';
import { connect } from 'react-redux';
import YogaPose from '../poses/YogaPose';

class YogaPoseSelector extends Component {

    state = {
        yoga_pose: {}
    }

    onChange = (event) => {
        event.preventDefault();
        this.setState({
            yoga_pose: this.props.poses.find((pose) => pose.id === parseInt(event.target.value))
        })

    }

    /* eventually... change to search by category or search via another way */
    render() {
        return (
        <div>
            <select name="yogaPoses" onChange={this.onChange}>
                {this.props.poses.map(pose => <option key={pose.id} value={pose.id}>{pose.name}</option>)}
            </select>
            <div>
               {Object.keys(this.state.yoga_pose).length !== 0 ?
                <YogaPose key={this.state.yoga_pose.id} pose={this.state.yoga_pose}/> : null }
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        poses: state.poses.poses
    }
}
export default connect(mapStateToProps) (YogaPoseSelector);