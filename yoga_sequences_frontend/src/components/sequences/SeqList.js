import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class SeqList extends Component {

    state = {
        searchTerm: ''
    }

    onChange = (event) => {
        this.setState({
            searchTerm: event.target.value
        })
    }

    filteredSequences() {
        const search = this.state.searchTerm.toLowerCase();
        return this.props.sequences.filter(sequence => {
            return sequence.name.toLowerCase().includes(search)
        })
    }

    render() {
        return (
            this.props.sequences.length !== 0 ?
                <>
                <input type="text" value={this.state.searchTerm} onChange={this.onChange} name="searchTerm" />
                    <div className="sequenceContainerGrid3">
                        <div className="header">Name</div>
                        <div className="header">Delete</div>
                        <div className="header">Edit</div>
                        {this.filteredSequences().map(seq => {
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