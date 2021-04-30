import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
//import SeqForm from '../sequences/SeqForm';

class SeqList extends Component {

    render() {
        console.log("SeqList");
        console.log(this.props);
        return(
            <div>
            {this.props.sequences.length !== 0 ?
                this.props.sequences.map(seq => {
                    return <span key={seq.id}>
                            <NavLink to={`sequence/${seq.id}`} >{seq.name}</NavLink>
                            <button onClick={() => this.props.delete(seq.id)}>X</button>
                            <NavLink to={`/sequence/edit/${seq.id}`}>Edit</NavLink>
                        </span>
                }) : null}
            </div>
            )
    }
}

export default SeqList;