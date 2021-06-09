import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';
import SeqShow from '../components/sequences/SeqShow';
import Error from '../components/errors/Error';
import { getSequences } from '../actions/sequences';
import { getPoses } from '../actions/poses';

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
                <SeqShow
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
        auth: state.auth,
        error: state.error.error
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (SeqShowContainer);

