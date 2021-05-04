import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSequences, deleteSequence } from '../../actions/sequences'
import LoadingSpinner from '../LoadingSpinner'


//import SeqForm from '../sequences/SeqForm';

class SeqListNew extends Component {

    state = {
        isLoaded: false
    }

    componentDidMount = () => {
        this.props.getSequences(this.props.user);
        this.setState({
            isLoaded: true
        })
    }
    onDelete = (id) => {
        this.props.deleteSequence(id)
      }

    //TODO - get Sequences move it from the SeqContainer to SeqList
    render() {
        console.log("SeqList");
        console.log(this.props);
        return (
            !this.props.seqRequesting && this.state.isLoaded ?
                this.props.sequences.length !== 0 ?
                    <div>
                      <div className="sequenceContainer">
                        <h1>MY SEQUENCES</h1>
                        <div className="sequenceContainerGrid">
                            <div className="header">Name</div>
                            <div className="header">Delete</div>
                            <div className="header">Edit</div>
                            {this.props.sequences.map(seq => {
                                return <Fragment key={seq.id}>
                                    {/*<div className="head"><NavLink to={`/sequence/${seq.id}`}>{seq.name}</NavLink></div>*/}
                                    <NavLink to={`/sequence/${seq.id}`}><div className="head">{seq.name}</div></NavLink>
                                    <div className="head"><span onClick={() => this.onDelete(seq.id)} className="material-icons delete">delete_outline</span></div>
                                    <div className="head"><NavLink to={`/sequence/edit/${seq.id}`} ><span className="material-icons edit">edit</span></NavLink></div>
                                </Fragment>
                            })}
                        </div>
                      </div>
                    </div> : null
                : <LoadingSpinner />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSequences: (user) => dispatch(getSequences(user)),
        deleteSequence: (id) => dispatch(deleteSequence(id)),
    }
}

const mapStateToProps = (state) => {
    return {
        sequences: state.sequences.sequences,
        seqRequesting: state.sequences.requesting,
        user: state.auth.currentUser
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (SeqListNew);