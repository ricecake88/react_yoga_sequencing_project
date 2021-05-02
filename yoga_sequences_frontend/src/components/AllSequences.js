import React, { Component } from "react";
import { connect } from "react-redux";
import SeqList from './sequences/SeqList';
import { getSequences, deleteSequence} from '../actions/sequences'
import { getCategories } from '../actions/categories';
import { getPoses } from '../actions/poses';
import LoadingSpinner from './LoadingSpinner'


class AllSequences extends Component {

  state = {
    isLoaded: false
  }

  componentDidMount = () => {
    console.log("Protected Route -> componentDidMount");
    console.log(this.props)

    //// get initial state of sequences
    //this.props.getSequences(this.props.user);

    // get initial state of categories
    this.props.getCategories(this.props.user);

    // get data on poses
    this.props.getPoses();

    this.setState({
      isLoaded: true
    })
  }

  onDelete = (id) => {
    this.props.deleteSequence(id)
  }

  render() {
    console.log("ProtectedRoute -> render ()")
    console.log(this.props)
    const { isLoaded } = this.state
    return (
      isLoaded ?
      <div>
        <SeqList user={this.props.user} delete={this.onDelete} categories={this.props.categories} poses={this.props.poses}/>
      </div> : <LoadingSpinner />
    );
  }
}

const mapStateToProps = (state) => {
  return {
      poses: state.poses.poses,
      //sequences: state.sequences.sequences,
      user: state.auth.currentUser,
      categories: state.categories.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //getSequences: (user) => dispatch(getSequences(user)),
    getCategories: (user) => dispatch(getCategories(user)),
    getPoses: () => dispatch(getPoses()),
    deleteSequence: (id) => dispatch(deleteSequence(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllSequences);