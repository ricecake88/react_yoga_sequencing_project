import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { BrowserRouter, NavLink } from 'react-router-dom';
//import PoseList from '../components/sequences/PoseList';
import LoadingSpinner from '../components/LoadingSpinner';
//import SeqInfo from '../components/sequences/SeqInfo';
import SeqShowNewest from '../components/sequences/SeqShowNewest';
import { getSequences } from '../actions/sequences';
import { getPoses } from '../actions/poses';

import Error from '../components/errors/Error';

class SeqShowContainer extends Component {

    state = {
        isLoaded: false
    }

    componentDidMount = () => {
        this.props.getSequences(this.props.auth.currentUser)
        .catch(err => console.log(err));
        this.props.getPoses()
        .catch(err => console.log(err));
        this.setState({
            isLoaded: true
        })
    }

    display = () => {
        return (
            <div className="genericContainer">
                <Error error={this.props.error}/>
                <SeqShowNewest 
                    //sequences={this.props.sequences}
                    match={this.props.match} 
                    poses={this.props.poses}/>
            </div>
        )

    }

    render() {
        return this.state.isLoaded ?
                <div>{this.display()}</div> 
               : <LoadingSpinner />
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        getSequences: (user) => dispatch(getSequences(user)),
        getPoses: () => dispatch(getPoses())
    }
}

const mapStateToProps = (state) => {
    return {
        poses: state.poses.poses,
        //requesting: state.sequences.requesting,
        auth: state.auth,
        error: state.error.error
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (SeqShowContainer);

