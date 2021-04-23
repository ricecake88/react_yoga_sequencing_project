import React, { Component} from 'react';
import { connect } from 'react-redux';
import SeqForm from '../components/sequences/SeqForm';
import SeqList from '../components/sequences/SeqList';
import { getSequences, deleteSequence} from '../actions/sequences'
import { getCategories } from '../actions/categories';
import { getPoses } from '../actions/poses';

class SeqContainer extends Component {

    componentDidMount = () => {
        this.props.getPoses()
        this.props.getSequences(this.props.user);
        this.props.getCategories(this.props.user);
    }

    onDelete = (id) => {
        this.props.deleteSequence(id)
      }


    render() {
        console.log(">>>SeqContainer ->render()")
        console.log(this.props.poses)
        console.log(this.props.sequences)
        return (
            <div>==== Sequence Container===
                <SeqForm poses={this.props.poses}/>
                <SeqList poses={this.props.poses} delete={this.onDelete} sequences={this.props.sequences} categories={this.props.categories}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        poses: state.poses.poses,
        sequences: state.sequences.sequences,
        user: state.auth.currentUser,
        categories: state.categories.categories
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getPoses: () => dispatch(getPoses()),
        getSequences: (user) => dispatch(getSequences(user)),
        getCategories: (user) => dispatch(getCategories(user)),
        deleteSequence: (id) => dispatch(deleteSequence(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeqContainer);