import React, { Component } from 'react';
import { connect } from 'react-redux';
import PoseShowInSeq from '../sequences/PoseShowInSeq';
import PoseList from '../sequences/PoseList';
import LoadingSpinner from '../LoadingSpinner';
//import { getSequences } from '../../actions/sequences';

class SeqShow extends Component {

    state = {
        seconds_per_breath: 3,
        num_breaths:  this.props.sequences.find(sequence =>
            sequence.id === parseInt(this.props.match.params.id)).pose_in_seqs[0].num_breaths,
        pose: {},
        sequence: {},
        counter: 0,
        time: 0,
        isLoaded: false,
        pauseClicked: false,
        end: false
    }

    componentDidMount = () => {
        console.log("SeqShow -> componentDidMount")
        console.log(this.props);
        //this.props.getSequences(this.props.user)
        const sequence = this.props.sequences.find(sequence =>
            sequence.id === parseInt(this.props.match.params.id));
        console.log(sequence)
        // set initial
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

    updateSequenceUponUpdate = () => {
        const sequence = this.props.sequences.find(sequence =>
            sequence.id === parseInt(this.props.match.params.id));
        console.log(sequence)
        // set initial
        if (sequence) {
            this.sortPoses(sequence.pose_in_seqs)
            this.setState(prevState => ({
                ...prevState,
                sequence: sequence,
                isLoaded: true
            }))
        }
    }

    poseInfo = (sequence, data) => {
        if (sequence.pose_in_seqs.length !== 0  && data.end) {
            return "You have reached the end of your yoga practice! Namaste!"
        } else {
            return (
                <>
                    Category: {sequence.category.name}
                    {sequence.pose_in_seqs.length !== 0 ?
                        sequence.pose_in_seqs.map(pose =>
                            <span key={pose.id}>{pose.name}</span>)
                    : null}
                    {sequence.pose_in_seqs.length !== 0 ?
                        <PoseShowInSeq poses={this.props.poses} pose={sequence.pose_in_seqs[data.counter]}/>
                    : null}
                    <div className="center">                                    
                        <p>Time:{data.time}</p>
                        <span onClick={this.changePause}>
                        {data.pauseClicked ? 
                            <span className="material-icons click">pause</span>
                            : <span className="material-icons click">play_arrow</span>}
                        </span>
                        <span className="material-icons click" onClick={this.reset}>stop</span>
                    </div>
                </>
            )        
        }
    }

    displaySequence = (data) => {
        console.log("displaySequence2");
            console.log(data);
            const sequence = this.props.sequences.find(sequence =>
                sequence.id === parseInt(this.props.match.params.id));
            console.log(sequence)
            this.sortPoses(sequence.pose_in_seqs)
            if (sequence.pose_in_seqs.length !== 0  && data.end) {

            }
            return (
                    <div className="sequenceShowContainer">
                        <div className="sequenceShowDiv">
                            <div className="highlightPose">
                                <h1 className="center">{sequence.name.toUpperCase()}</h1>
                                {this.poseInfo(sequence, data)}
                            </div>
                            {/*<button onClick={this.changePause}>{data.pauseClicked ? 'Pause' : 'Start'}</button>
                            <button onClick={this.reset}>Reset</button>*/}
                            <PoseList posesInSeq={sequence.pose_in_seqs} poses={this.props.poses} current={data.counter}/>
                         </div>
                    </div>
            )
    }

    render() {
        console.log("Sequence Show");
        console.log(this.props);

        const {isLoaded, ...data} = this.state;
        return isLoaded && !this.props.requesting ? <div>
            {this.displaySequence(data)}
        </div> : <LoadingSpinner />
    }

    reset = () => {
        if (this.timeoutID) {
            clearTimeout(this.timeoutID);
        }
        if (this.intervalID) {
            clearInterval(this.intervalID);
        }
        this.setState({
                ...this.state,
                counter: 0,
                num_breaths: this.state.sequence.pose_in_seqs[this.state.counter].num_breaths,
                pauseClicked: false,
                time: 0,
                end: true
            })
    }

    startPoseChange = () => {
        console.log("startPose")
        // timeoutID that sets out the time before changing to the next pose
        this.timeoutID = setTimeout(this.changePose, (this.state.num_breaths*this.state.seconds_per_breath-this.state.time)*1000);

        // timer that counts per second
        this.intervalID = setInterval(this.timedCount, 1000)
        this.setState({
            ...this.state,
            pauseClicked: true,
            //counter: 0,
            //num_breaths: this.state.sequence.pose_in_seqs[this.state.counter].num_breaths,
            //time: 0,
            end: false
        })
    }

    stopPoseChange = () => {
        clearTimeout(this.timeoutID);
        clearTimeout(this.intervalID);
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
            console.log("This is the end?");
            //clearTimeout(this.timeoutID)
            //clearInterval(this.intervalID)
            this.setState({
                ...this.state,
                counter: this.state.counter,
                num_breaths: this.state.sequence.pose_in_seqs[this.state.counter].num_breaths,
                pauseClicked: false,
                end: true
            })
            this.stopClock();
        }
    }

    stopClock = () => {
        clearTimeout(this.timeoutID);
        clearInterval(this.intervalID);
        this.setState({
            ...this.state,
            counter: 0,
            num_breaths: this.state.sequence.pose_in_seqs[0].num_breaths,
            pauseClicked: false,
            time: 0,
            end: true
        })        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //getSequences: (user) => dispatch(getSequences(user))
    }
}
const mapStateToProps = (state) => {
    console.log("seqShow -> mapStateToProps")
    console.log(state);
    return {
        sequences: state.sequences.sequences,
        categories: state.categories.categories,
        poses: state.poses.poses,
        user: state.auth.currentUser,
        requesting: state.sequences.requesting,
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (SeqShow);

