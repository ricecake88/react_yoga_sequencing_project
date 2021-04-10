import React, { Component } from 'react';

class SeqList extends React.Component {
    render() {
        <div>
        {this.props.sequences.map((seq) => {
            <Seq key={seq.id} sequence={seq}/>
        })}
        </div>
    }
}

export default SeqList;