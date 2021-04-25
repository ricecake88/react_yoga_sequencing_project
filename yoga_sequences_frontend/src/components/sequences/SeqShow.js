import React, { Component } from 'react';
import { connect } from 'react-redux';
import PoseShowInSeq from '../sequences/PoseShowInSeq';
import LoadingSpinner from '../LoadingSpinner';

class SeqShow extends Component {

    state = {
        seconds_per_breath: 2,
        num_breaths: 1,
        pose: {},
        sequence: {},
        counter: 0,
        time: 0,
        isLoaded: false
    }

    componentDidMount = () => {
        console.log("SeqShow -> componentDidMount")
        console.log(this.props);
        const sequence = this.props.sequences.find(sequence =>
            sequence.id === parseInt(this.props.match.params.id));
        if (sequence) {
            this.setState(prevState => ({
                ...this.state,
                sequence: sequence,
                isLoaded: true
            }))
        }
        this.interval = setInterval(this.updateCounter, this.state.seconds_per_breath*1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    onChange = () => {
        console.log("on Change");
    }

    displaySequence = (data) => {
        console.log("displaySequence");
            console.log(this.state);
            return (
                    <div>
                        Name: {data.sequence.name}<br></br>
                        Category: {data.sequence.category.name}
                        {data.sequence.pose_in_seqs.length !== 0 ?
                            data.sequence.pose_in_seqs.map(pose =>
                                <span key={pose.id}>{pose.name}</span>)
                        : null
                        }
                        {/*<PoseShowInSeq pose_in_seqs={data.sequence.poses_in_seqs}/>*/}
                        {data.sequence.pose_in_seqs.length !== 0 ?
                            <PoseShowInSeq pose={data.sequence.pose_in_seqs[data.counter]} onChange={this.onChange}/>
                        : null}
                    </div>
            )
    }

    render() {
        const {isLoaded, ...data} = this.state;
        return isLoaded ? <div>
            {this.displaySequence(data)}
        </div> : <LoadingSpinner />
    }

    updateCounter = () => {
        if (this.state.sequence.pose_in_seqs && this.state.counter + 1 < this.state.sequence.pose_in_seqs.length) {
            this.setState(prevState => ({
                ...this.state,
                counter: prevState.counter + 1
            }))
        } else {
            this.setState(prevState => ({
                ...this.state,
                counter: prevState.counter
            }))
            this.stopClock();
        }
    }

    stopClock = () => {
        clearInterval(this.interval)
    }
}

const mapStateToProps = (state) => {
    console.log("seqShow -> mapStateToProps")
    return {
        sequences: state.sequences.sequences,
        categories: state.categories.categories,
        poses: state.poses.poses
    }
}

export default connect(mapStateToProps) (SeqShow);

