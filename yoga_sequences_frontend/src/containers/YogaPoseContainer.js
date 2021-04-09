import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getYogaPoses} from '../actions/yogaPoses';
import YogaPoseSelector from '../components/poses/YogaPoseSelector';

class YogaPoseContainer extends Component {

    componentDidMount = () => {
        this.props.getPoses()
    }

    render() {
        return <div>
            <YogaPoseSelector poses={this.props.poses}/>
        </div>
    }
}

const mapStateToProps = (state) => {
    console.log("\t>>>YogaPoseContainer -> mapSateToProps");
    console.log(state);
    return {
        poses: state.poses.poses
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getPoses: () => dispatch(getYogaPoses())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(YogaPoseContainer);