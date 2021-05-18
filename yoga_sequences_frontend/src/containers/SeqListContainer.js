import React, { Component} from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SeqList from '../components/sequences/SeqList';
import { getSequences, deleteSequence} from '../actions/sequences'
import LoadingSpinner from '../components/LoadingSpinner';
import Error from '../components/errors/Error';

// TO-DO: Add in categories and select sequence by category
class SeqListContainer extends Component {

    state = {
        isLoaded: false,
        message: ''
    }

    componentDidMount = () => {
        this.props.getSequences(this.props.user)
        .catch(err => console.log(err));
        this.setState({
            ...this.state,
            isLoaded: true
        })
    }

    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };
    }

    onDelete = (id) => {
        this.props.deleteSequence(id)
        .then(response => {
            this.setState({
                ...this.state,
                message: "Sequence Deleted."
            })
        })
        .catch(err => console.log(err))
      }

    render() {

        const { isLoaded } = this.state;
        return (
            isLoaded ?
            <>
                <h1 className="center">Sequences <NavLink className="link no-ul" to="/sequences/add"><span title="New Sequence">+</span></NavLink></h1>
                <div className="message">{this.state.message}</div>
                <Error error={this.props.error}/>
                <SeqList
                    onDelete={this.onDelete}/>
                 </>
            : <LoadingSpinner />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.currentUser,
        error: state.error.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getSequences: (user) => dispatch(getSequences(user)),
        deleteSequence: (id) => dispatch(deleteSequence(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeqListContainer);