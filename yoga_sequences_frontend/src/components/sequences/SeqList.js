import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSequences } from '../../actions/sequences'
import LoadingSpinner from '../LoadingSpinner'

//import SeqForm from '../sequences/SeqForm';

class SeqList extends Component {

    state = {
        isLoaded: false
    }

    componentDidMount = () => {
        this.props.getSequences(this.props.user);
        this.setState({
            isLoaded: true
        })
    }
    //TODO - get Sequences move it from the SeqContainer to SeqList
    render() {
        console.log("SeqList");
        console.log(this.props);
        return( !this.props.seqRequesting && this.state.isLoaded ?
            <div>
            {this.props.sequences.length !== 0 ?
                this.props.sequences.map(seq => {
                    return <Fragment key={seq.id}><div><h1>All Sequences</h1>
                            <NavLink to={`/sequence/${seq.id}`} >{seq.name}</NavLink>
                            <button onClick={() => this.props.delete(seq.id)}>X</button>
                            <NavLink to={`/sequence/edit/${seq.id}`}>Edit</NavLink>
                        </div></Fragment>
                }) : null}
            </div> : <LoadingSpinner />
            )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSequences: (user) => dispatch(getSequences(user))
    }
}

const mapStateToProps = (state) => {
    return {
        sequences: state.sequences.sequences,
        seqRequesting: state.sequences.requesting,
        user: state.auth.currentUser
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (SeqList);