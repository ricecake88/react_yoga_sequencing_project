import React, { Component } from "react";
import { connect } from "react-redux";
import SeqList from '../components/sequences/SeqList';
import { getSequences, deleteSequence} from '../actions/sequences'

class ProtectedRoute extends Component {

  componentDidMount = () => {
    console.log("Protected Route -> componentDidMount");
    console.log(this.props)
    this.props.getSequences(this.props.user)
  }

  onDelete = (id) => {
    this.props.deleteSequence(id)
  }

  render() {
    console.log("ProtectedRoute -> render ()")
    console.log(this.props)
    return (
      <div>
        <SeqList sequences={this.props.sequences} delete={this.onDelete}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      poses: state.poses.poses,
      sequences: state.sequences.sequences,
      user: state.auth.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSequences: (user) => dispatch(getSequences(user)),
    deleteSequence: (id) => dispatch(deleteSequence(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);