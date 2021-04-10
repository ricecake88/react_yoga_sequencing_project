import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getPoses} from '../actions/poses';
import PoseSelector from '../components/poses/PoseSelector';

class PoseContainer extends Component {

    componentDidMount = () => {
        this.props.getPoses()
    }

    render() {
        return <div>
            <PoseSelector poses={this.props.poses} addTrue={false}/>
        </div>
    }
}

const mapStateToProps = (state) => {
    console.log("\t>>>PoseContainer -> mapSateToProps");
    console.log(state);
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