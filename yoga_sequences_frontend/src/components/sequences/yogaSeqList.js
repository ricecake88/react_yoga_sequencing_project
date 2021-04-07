import React, { Component } from 'react';

class yogaSeqList extends React.Component {
    render() {
        <div>
        {this.props.yogaSequences.map((seq) => {
            <YogaSeq key={seq.id} sequence={seq}/>
        })}
        </div>
    }
}

export default yogaSeqList;