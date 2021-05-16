import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
//import { getSequences, deleteSequence } from '../../actions/sequences'
//import LoadingSpinner from '../LoadingSpinner'
//import SeqFormNew from '../sequences/SeqFormNew';

class SeqListNew extends Component {

   /* state = {
        isLoaded: false,
        //isEdit: false
    }

    componentDidMount = () => {
        //this.props.getSequences(this.props.user);
        this.setState({
            isLoaded: true
        })
    }*/

    render() {
        return (
            this.props.sequences.length !== 0 ?
                <div>
                    <div className="sequenceContainerGrid3">
                        <div className="header">Name</div>
                        <div className="header">Delete</div>
                        <div className="header">Edit</div>
                        {this.props.sequences.map(seq => {
                            return <Fragment key={seq.id}>
                                <div className="head">
                                    <NavLink to={`/sequences/${seq.id}`} className="link no-ul">{seq.name}</NavLink>
                                </div>
                                <div className="head">
                                    <span onClick={() => this.props.onDelete(seq.id)} className="material-icons delete" title="Delete">delete_outline</span>
                                </div>
                                <div className="head">
                                    <NavLink to={`/sequences/edit/${seq.id}`} ><span className="material-icons edit" title="Edit">edit</span></NavLink>
                                </div>
                            </Fragment>
                        })}
                    </div>
                </div>
            : <div>No Sequences Found.</div>
        )
    }
}

/*const mapDispatchToProps = (dispatch) => {
    return {
        //getSequences: (user) => dispatch(getSequences(user)),
        //deleteSequence: (id) => dispatch(deleteSequence(id)),
    }
}*/

const mapStateToProps = (state) => {
    return {
        sequences: state.sequences.sequences,
        //seqRequesting: state.sequences.requesting,
        //user: state.auth.currentUser,
        //loggedIn: state.auth.loggedIn
    }
}

export default connect(mapStateToProps) (SeqListNew);