import React, { Component} from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import SeqForm from '../components/sequences/SeqForm';
import { getPoses } from '../actions/poses';
import { getSequences } from '../actions/sequences';
import SeqList from '../components/sequences/SeqList';

class SeqContainer extends Component {

    componentDidMount = () => {
        this.props.getPoses()
    }

    render() {
        console.log(">>>SeqContainer ->render()")
        console.log(this.props.poses)
        console.log(this.props.sequences)
        return (
            <div>==== Sequence Container===
                <SeqForm poses={this.props.poses}/>
                <SeqList sequences={this.props.sequences}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        poses: state.poses.poses,
        sequences: state.sequences.sequences,
        user: state.currentUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getPoses: () => dispatch(getPoses()),
        getSequences: () => dispatch(getSequences())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeqContainer);