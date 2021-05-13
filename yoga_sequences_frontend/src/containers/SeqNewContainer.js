import React, { Component} from 'react';
import { connect } from 'react-redux';
import { NavLink, BrowserRouter, Router, Route, Switch } from "react-router-dom";
//import SeqFormNew from '../components/sequences/SeqFormNew';
import SeqListNew from '../components/sequences/SeqListNew';
import { getSequences, deleteSequence} from '../actions/sequences'
import { getCategories } from '../actions/categories';
import { getPoses } from '../actions/poses';
import LoadingSpinner from '../components/LoadingSpinner';
import SeqFormNew from '../components/sequences/SeqFormNew';
import SeqShow from '../components/sequences/SeqShow';

class SeqNewContainer extends Component {

    state = {
        isLoaded: false
    }

    componentDidMount = () => {
        this.props.getPoses();
        this.props.getSequences(this.props.auth.currentUser);
        this.props.getCategories(this.props.auth.currentUser);
        this.setState({
            isLoaded: true
        })
    }

    onDelete = (id) => {
        this.props.deleteSequence(id)
      }

    render() {
        console.log(">>>SeqContainer->render()")
        console.log(this.props)
        console.log(this.props.poses)
        console.log(this.props.sequences)
        const { isLoaded } = this.state;
        return (
            isLoaded ?
                <div>
                    <SeqListNew poses={this.props.poses} sequences={this.props.sequences} categories={this.props.categories} onDelete={this.onDelete}/>
                    <NavLink className="link" to="/sequences/add">Create New Sequence</NavLink>
                </div>
            : null
        )
    }
}

const mapStateToProps = (state) => {
    return {
        poses: state.poses.poses,
        sequences: state.sequences.sequences,
        categories: state.categories.categories,
        loggedIn: state.auth.loggedIn,
        auth: state.auth,
        error: state.error.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getPoses: () => dispatch(getPoses()),
        getSequences: (user) => dispatch(getSequences(user)),
        getCategories: (user) => dispatch(getCategories(user)),
        deleteSequence: (id) => dispatch(deleteSequence(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeqNewContainer);