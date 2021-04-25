import React, { Component } from 'react';
import { connect } from 'react-redux';

class PoseShowInSeq extends Component {

    state = {
        isLoaded: false
    }



    render() {
        return <div onChange={this.props.onChange()}>
           {this.props.pose.id}
        </div>
    }
}


export default connect() (PoseShowInSeq);

/*const SeqShow = ({match}) => {
    console.log(match)
    return <div>
        Selected: {match.params.id}
    </div>
}

export default SeqShow;*/