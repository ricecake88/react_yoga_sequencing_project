import React, { Component } from 'react';
import Seq from '../sequences/Seq';

class SeqList extends Component {

    render() {
        console.log("SeqList");
        console.log(this.props);
        return(
            <div>
            {this.props.sequences.length !== 0 ?
                this.props.sequences.map(seq => {
                    return <Seq key={seq.id} sequence={seq} delete={this.props.delete}></Seq>
                }) : null}
        </div>)
    }
}

export default SeqList;