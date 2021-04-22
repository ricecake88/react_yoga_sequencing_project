import React, { Component } from 'react';
import { Link, Route, Router } from 'react-router-dom';
import Seq from '../sequences/Seq';

class SeqList extends Component {

    render() {
        console.log("SeqList");
        console.log(this.props);
        return(
            <div>
            {this.props.sequences.length !== 0 ?
                this.props.sequences.map(seq => {
                    {/*return <Link to={`sequence/${seq.id}`} key={seq.id}><Seq sequence={seq} delete={this.props.delete}></Seq></Link>*/}
                    return <span key={seq.id}><Link to={`sequence/${seq.id}`} >{seq.name}</Link><button onClick={() => this.props.delete(seq.id)}>X</button></span>
                }) : null}
            </div>
            )
    }
}

export default SeqList;