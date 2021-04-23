import React, { Component } from 'react';
import { connect } from 'react-redux';

class PoseShowInSeq extends Component {

    state = {
        num_breaths: 1,
        poses: this.props.pose_in_seqs
    }

    componentDidMount = () => {
        this.interval = setInterval(() => {
            this.setState(prevState => ({
                num_breaths: Date.now()}, prevState.num_breaths*1000)
            )
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return <div>
            {this.state.num_breaths}
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