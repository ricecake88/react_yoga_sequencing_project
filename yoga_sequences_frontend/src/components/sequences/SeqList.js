import React, { Component } from 'react';
import { Link, Route, Router } from 'react-router-dom';

class SeqList extends Component {

    render() {
        console.log("SeqList");
        console.log(this.props);
        return(
            <div>
            {this.props.sequences.length !== 0 ?
                this.props.sequences.map(seq => {
                    return <span key={seq.id}>
                            <Link to={`sequence/${seq.id}`} >{seq.name}</Link>
                            <button onClick={() => this.props.delete(seq.id)}>X</button>
                            <Link to={`sequence/edit/${seq.id}`}>Edit</Link>
                        </span>
                }) : null}
            </div>
            )
    }
}

export default SeqList;