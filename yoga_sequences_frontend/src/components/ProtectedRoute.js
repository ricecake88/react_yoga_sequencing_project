import React, { Component } from "react";
import { connect } from "react-redux";
import SeqList from '../components/sequences/SeqList';
import { getSequences, deleteSequence} from '../actions/sequences'
import { getCategories } from '../actions/categories';
import { getPoses } from '../actions/poses';

class ProtectedRoute extends Component {

  componentDidMount = () => {
    console.log("Protected Route -> componentDidMount");
    console.log(this.props)
    this.props.getSequences(this.props.user);
    this.props.getCategories(this.props.user);
    this.props.getPoses();
  }

  onDelete = (id) => {
    this.props.deleteSequence(id)
  }

  render() {
    console.log("ProtectedRoute -> render ()")
    console.log(this.props)
    return (
      <div>
        <SeqList sequences={this.props.sequences} delete={this.onDelete} categories={this.props.categories} poses={this.props.poses}/>
      </div>
    );
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
    getSequences: (user) => dispatch(getSequences(user)),
    getCategories: (user) => dispatch(getCategories(user)),
    getPoses: () => dispatch(getPoses()),
    deleteSequence: (id) => dispatch(deleteSequence(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);