import React, { Component} from 'react';
import { connect } from 'react-redux';
import { getSequences } from '../actions/sequences'
import { getCategories } from '../actions/categories';
import { getPoses } from '../actions/poses';
import { clearErrorMessage } from '../actions/errors';
import LoadingSpinner from '../components/LoadingSpinner';
import SeqForm from '../components/sequences/SeqForm';

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
        const { isLoaded } = this.state;
        return (
            isLoaded ?
                <div>
                    <SeqForm
                        sequences={this.props.sequences}
                        match={this.props.match}
                        clearErrorMessage={this.props.clearErrorMessage}
                        onDeleteSeq={this.onDelete}
                    />

                </div>
            : <LoadingSpinner />
        )
    }
}


const mapStateToProps = (state) => {
    return {
        sequences: state.sequences.sequences,
        auth: state.auth,
        error: state.error.error,
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