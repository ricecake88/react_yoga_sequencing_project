import React, { Component } from 'react';
import { connect } from 'react-redux';
import PoseShowInSeq from '../sequences/PoseShowInSeq';
import LoadingSpinner from '../LoadingSpinner';

class SeqShow extends Component {

    state = {
        seconds_per_breath: 3,
        num_breaths: 1,
        pose: {},
        sequence: {},
        counter: 0,
        time: 0,
        isLoaded: false,
        pauseClicked: false
    }

    componentDidMount = () => {
        console.log("SeqShow -> componentDidMount")
        console.log(this.props);
        const sequence = this.props.sequences.find(sequence =>
            sequence.id === parseInt(this.props.match.params.id));
        console.log(sequence)
        if (sequence) {
            this.sortPoses(sequence.pose_in_seqs)
            this.setState(prevState => ({
                ...prevState,
                sequence: sequence,
                isLoaded: true
            }))
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutID)
    }

    onChange = () => {
        console.log("on Change");
    }

    sortPoses = (posesInSeq) => {
        if (posesInSeq.length !== 0) {
            posesInSeq.sort((a, b) => {
                if (a.pose_order < b.pose_order) {
                    return -1;
                }
                if (a.pose_order > b.pose_order) {
                    return 1;
                }
            return 0;
            })
        }
    }

    displaySequence = (data) => {
        console.log("displaySequence");
            console.log(data);
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
                            /*<PoseShowInSeq poses={this.props.poses} pose={data.sequence.pose_in_seqs[data.counter]} onChange={this.onChange}/>*/
                            <PoseShowInSeq poses={this.props.poses} pose={data.sequence.pose_in_seqs[data.counter]} onChange={this.onChange}/>
                        : null}
                        {data.sequence.pose_in_seqs.length !== 0  && data.counter === data.sequence.pose_in_seqs.length-1 ? "Last Pose" : ""}
                        <p>Time:{data.time}</p>
                        <button onClick={this.changePause}>{data.pauseClicked ? 'Pause' : 'Start'}</button>
                        <button onClick={this.reset}>Reset</button>
                    </div>
            )
    }

    render() {
        const {isLoaded, ...data} = this.state;
        return isLoaded ? <div>
            {this.displaySequence(data)}
        </div> : <LoadingSpinner />
    }

    reset = () => {
        if (this.timeoutID) {
            clearTimeout(this.timeoutID);
        }
        this.setState({
                ...this.state,
                counter: 0,
                pauseClicked: false,
                time: 0
            })
    }

    startPoseChange = () => {
        console.log("startPose")
        //this.interval = setInterval(this.changePose2, this.state.seconds_per_breath*1000);
        this.timeoutID = setTimeout(this.changePose, this.state.num_breaths*this.state.seconds_per_breath*1000);
        this.intervalID = setInterval(this.timedCount, 1000)
        this.setState({
            ...this.state,
            pauseClicked: true
        })
    }

    stopPoseChange = () => {
        clearTimeout(this.timeoutID);
        clearTimeout(this.intervalID)
        this.setState({
            ...this.state,
            pauseClicked: false
        })
    }

    changePause = () => {
        if (this.state.pauseClicked) {
            this.stopPoseChange();
        } else {
            this.startPoseChange();
        }
    }

    timedCount = () => {
        this.setState({
            ...this.state,
            time: this.state.time + 1
        })
    }

    changePose = () => {
        console.log("changePose")
        console.log(this.state.sequence)
        if (this.state.sequence.pose_in_seqs && this.state.counter + 1 < this.state.sequence.pose_in_seqs.length) {
            console.log("yay")
            clearTimeout(this.timeoutID)
            clearInterval(this.intervalID)
            this.setState(prevState => ({
                ...prevState,
                counter: prevState.counter + 1,
                num_breaths: prevState.sequence.pose_in_seqs[prevState.counter + 1].num_breaths,
                time: 0
            }))
            console.log(this.state);
            this.timeoutID = setTimeout(this.changePose, this.state.num_breaths*this.state.seconds_per_breath*1000)
            this.intervalID = setInterval(this.timedCount, 1000)
        } else if (this.state.sequence.pose_in_seqs) {
            clearTimeout(this.timeoutID)
            clearInterval(this.intervalID)
            console.log("no")
            this.setState({
                ...this.state,
                counter: this.state.counter,
                num_breaths: this.state.sequence.pose_in_seqs[this.state.counter].num_breaths
            })
            this.stopClock();
        }
    }

    stopClock = () => {
        clearTimeout(this.timeoutID)
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

