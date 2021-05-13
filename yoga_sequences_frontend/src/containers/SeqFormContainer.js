import React, { Component} from 'react';
import { connect } from 'react-redux';
import { NavLink, BrowserRouter, Router, Route, Switch } from "react-router-dom";
//import SeqFormNew from '../components/sequences/SeqFormNew';
import SeqList from '../components/sequences/SeqListNew';
import { getSequences, deleteSequence} from '../actions/sequences'
import { getCategories } from '../actions/categories';
import { getPoses } from '../actions/poses';
import Error from '../components/errors/Error';
import LoadingSpinner from '../components/LoadingSpinner';
import SeqFormNewest from '../components/sequences/SeqFormNewest';
import SeqShow from '../components/sequences/SeqShow';
import { clearErrorMessage } from '../actions/errors';

class SeqFormContainer extends Component {

    state = {
        isLoaded: false
    }

    componentDidMount = () => {
        this.props.getPoses();
        this.props.getSequences(this.props.user);
        this.props.getCategories(this.props.user);
        this.setState({
            isLoaded: true
        })
    }

    onClick = () => {
        console.log("onClick")
        this.props.clearErrorMessage()
    }

    render() {
        console.log(">>>SeqFormContainer->render()")
        console.log(this.props)
        console.log(this.props.poses)
        console.log(this.props.sequences)
        const { isLoaded } = this.state;
        return (
            isLoaded ?
                <div>
                    {/*<SeqForm route={"Add"} />*/}
                    {/*{this.props.location.status !== undefined ? <div>{this.props.location.status}</div> : null}*/}
                    {/*<Error error={this.props.error}/>*/}
                    {/*<SeqListNewest poses={this.props.poses} sequences={this.props.sequences} categories={this.props.categories} match={this.props.match}/>
                    <NavLink className="link" to="/sequences/add">Create New Sequence</NavLink>*/}
                    <SeqFormNewest 
                        categories={this.props.categories} 
                        poses={this.props.poses} 
                        match={this.props.match} 
                        onClick={this.onClick}
                    />
                </div>
            : null
        )
    }
}

const mapStateToProps = (state) => {
    return {
        poses: state.poses.poses,
        sequences: state.sequences.sequences,
        user: state.auth.currentUser,
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
        clearErrorMessage: () => dispatch(clearErrorMessage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeqFormContainer);