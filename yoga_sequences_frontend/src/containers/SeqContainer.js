import React, { Component} from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import SeqForm from '../components/sequences/SeqForm';
import { getPoses } from '../actions/poses';

class SeqContainer extends Component {

    componentDidMount = () => {
        this.props.getPoses()
    }

    render() {
        console.log(">>>SeqContainer ->render()")
        console.log(this.props.poses)
        return (
            <div>==== Sequence Container===
                <SeqForm poses={this.props.poses}/>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(SeqContainer);