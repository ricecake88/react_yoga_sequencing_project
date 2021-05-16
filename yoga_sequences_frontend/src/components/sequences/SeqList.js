import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class SeqList extends Component {

    render() {
        return (
            this.props.sequences.length !== 0 ?
                <>
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
                                    <span onClick={() => this.props.onDelete(seq.id)} 
                                        className="material-icons delete" title="Delete">delete_outline</span>
                                </div>
                                <div className="head">
                                    <NavLink to={`/sequences/edit/${seq.id}`} >
                                        <span className="material-icons edit" title="Edit">edit</span></NavLink>
                                </div>
                            </Fragment>
                        })}
                    </div>
                </>
            : <>No Sequences Found. <br/>
              <NavLink className="link no-ul" to="/sequences/add">Start creating your own!</NavLink></>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sequences: state.sequences.sequences,
    }
}

export default connect(mapStateToProps) (SeqList);