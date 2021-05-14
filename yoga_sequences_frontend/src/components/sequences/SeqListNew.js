import React, { Component, Fragment } from 'react';
import { BrowserRouter, NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSequences, deleteSequence } from '../../actions/sequences'
import LoadingSpinner from '../LoadingSpinner'
//import SeqFormNew from '../sequences/SeqFormNew';
import Login from "../../components/auth/Login";

class SeqListNew extends Component {

    state = {
        isLoaded: false,
        isEdit: false
    }

    componentDidMount = () => {
        //this.props.getSequences(this.props.user);
        this.setState({
            isLoaded: true
        })
    }


    edit = (id) => {
        console.log(id);
        this.setState({
            isEdit: true
        })
    }

    //TODO - get Sequences move it from the SeqContainer to SeqList
    render() {
        console.log("SeqList");
        console.log(this.props);
        return (
            this.props.loggedIn ?
                !this.props.seqRequesting && this.state.isLoaded ?
                    this.props.sequences.length !== 0 ?
                        <div className="sequenceContainer">
                            <h1>ALL SEQUENCES</h1>
                            <div className="sequenceContainerGrid">
                                <div className="header">Name</div>
                                <div className="header">Delete</div>
                                <div className="header">Edit</div>
                                {this.props.sequences.map(seq => {
                                    return <Fragment key={seq.id}>
                                        <NavLink to={`/sequences/${seq.id}`}><div className="head">{seq.name}</div></NavLink>
                                        <div className="head"><span onClick={() => this.props.onDelete(seq.id)} className="material-icons delete">delete_outline</span></div>
                                        <div className="head"><NavLink to={`/sequences/edit/${seq.id}`} ><span className="material-icons edit" onClick={() => this.edit(seq.id)}>edit</span></NavLink></div>
                                    </Fragment>
                                })}
                            </div>
                        </div>
                    : <div>No Sequences Found.</div>
                : null
            : <Login />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //getSequences: (user) => dispatch(getSequences(user)),
        //deleteSequence: (id) => dispatch(deleteSequence(id)),
    }
}

const mapStateToProps = (state) => {
    return {
        sequences: state.sequences.sequences,
        seqRequesting: state.sequences.requesting,
        user: state.auth.currentUser,
        loggedIn: state.auth.loggedIn
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (SeqListNew);