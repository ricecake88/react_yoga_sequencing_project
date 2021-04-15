import React, { Component } from 'react';
import Seq from '../sequences/Seq';

class SeqList extends React.Component {
    render() {
    return(
        <div>
        {this.props.sequences.map((seq) => {
            <Seq key={seq.id} sequence={seq}/>
        })}
        </div>)
    }
}

export default SeqList;