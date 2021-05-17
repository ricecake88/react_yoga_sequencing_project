import React, { Component} from 'react';
import { connect } from 'react-redux';
//import { NavLink, BrowserRouter, Router, Route, Switch } from "react-router-dom";
//import SeqFormNew from '../components/sequences/SeqFormNew';
//import SeqList from '../components/sequences/SeqListNew';
import { getSequences } from '../actions/sequences'
import { getCategories } from '../actions/categories';
import { getPoses } from '../actions/poses';
//import Error from '../components/errors/Error';
import LoadingSpinner from '../components/LoadingSpinner';
import SeqForm from '../components/sequences/SeqForm';
//import SeqShow from '../components/sequences/SeqShow_OLD';
import { clearErrorMessage } from '../actions/errors';

class SeqFormContainer extends Component {

    state = {
        isLoaded: false
    }

    componentDidMount = () => {
        this.props.getPoses()
        .catch(err => console.log(err));
        this.props.getSequences(this.props.auth.currentUser)
        .catch(err => console.log(err));
        this.props.getCategories(this.props.auth.currentUser)
        .catch(err => console.log(err));
        this.setState({
            isLoaded: true
        })
    }



    render() {
        console.log(">>>SeqFormContainer->render()")
        //console.log(this.props)
        //console.log(this.props.poses)
        //console.log(this.props.sequences)
        const { isLoaded } = this.state;
        return (
            isLoaded ?
                <div>
                    <SeqForm
                        sequences={this.props.sequences}
                        categories={this.props.categories} 
                        poses={this.props.poses} 
                        match={this.props.match} 
                        //onClick={this.onClick}
                        clearErrorMessage={this.props.clearErrorMessage}
                        //message={this.props.message}
                    />

                </div>
            : <LoadingSpinner />
        )
    }
}

/*const mapStateToProps = (state) => {
    return {
        poses: state.poses.poses,
        sequences: state.sequences.sequences,
        //user: state.auth.currentUser,
        categories: state.categories.categories,
        //loggedIn: state.auth.loggedIn,
        auth: state.auth,
        error: state.error.error,
        //message: state.sequences.message
    }
}*/

const mapStateToProps = (state) => {
    return {
        poses: state.poses.poses,
        sequences: state.sequences.sequences,
        //user: state.auth.currentUser,
        categories: state.categories.categories,
        //loggedIn: state.auth.loggedIn,
        auth: state.auth,
        error: state.error.error,
        //message: state.sequences.message
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