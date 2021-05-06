import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, NavLink } from 'react-router-dom';
import PoseShowInSeq from '../sequences/PoseShowInSeq';
import PoseList from '../sequences/PoseList';
import LoadingSpinner from '../LoadingSpinner';
import { getSequence } from '../../actions/sequences';
import SeqInfo from '../sequences/SeqInfo';

class SeqShow extends Component {

    state = {
        seconds_per_breath: 3,
       // num_breaths:  this.props.sequences.find(sequence =>
        //    sequence.id === parseInt(this.props.match.params.id)).pose_in_seqs[0].num_breaths,
        num_breaths: 1,
        sequence: {},
        counter: 0, // current pose index selection
        time: 0, // for tracking of time passed for current pose
        isLoaded: false,
        pauseClicked: false,
        end: false
    }


    /* used when user refreshes the page and we need to get the sequence from props
        since this before componentDidMount, otherwise the state never changes */
    static getDerivedStateFromProps(props, current_state) {
        console.log("in getDerivedStateFromProps")
        if (current_state.sequence !== props.sequence) {
            return {
                ...current_state,
                sequence: props.sequence
            }
        } else {
            return current_state;
        }
    }

    componentDidMount = () => {
        console.log("SeqShow -> componentDidMount")
        console.log(this.props);

        // if user refreshes the page
        if (this.props.sequences.length === 0 && this.props.match.path === '/sequences/:id') {
            console.log("Call getSequence");
            this.props.getSequence(parseInt(this.props.match.params.id))
            this.setState({
                ...this.state,
                sequence: this.props.sequence,
                num_breaths: this.props.sequence.pose_in_seqs !== undefined && this.props.sequence.pose_in_seqs.length !== 0 ? this.props.sequence.pose_in_seqs[0].num_breaths:1,
                isLoaded: true
            })
        } else {
            // if user access the sequence from the sequence list
            const sequence = this.props.sequences.find(sequence =>
                sequence.id === parseInt(this.props.match.params.id));
            console.log(sequence)
            let num_breaths = 1;
            if (sequence && sequence.pose_in_seqs.length !== 0) {
                num_breaths = sequence.pose_in_seqs[0].num_breaths
            }
            // set initial
            if (sequence) {
                this.sortPoses(sequence.pose_in_seqs)
                this.setState(prevState => ({
                    ...prevState,
                    sequence: sequence,
                    num_breaths: num_breaths,
                    isLoaded: true
                }))
            }
        }
    }

    componentWillUnmount() {
        // clears out the timers
        if (this.timeoutID) {
            clearTimeout(this.timeoutID);
        }
        if (this.intervalID) {
            clearInterval(this.intervalID);
        }
    }

    sortPoses = (posesInSeq) => {
        if (!posesInSeq && posesInSeq.length !== 0) {
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
        if (sequence.pose_in_seqs.length !== 0  && data.counter === sequence.pose_in_seqs.length-1 && data.end) {
            return "You have reached the end of your yoga practice! Namaste!"
        } else {

            return (
                <>
                    <NavLink to={`/sequences/edit/${sequence.id}`}>Edit</NavLink>
                    Category: {sequence.category.name}
                    {sequence.pose_in_seqs.length !== 0 ?
                        sequence.pose_in_seqs.map(pose =>
                            <span key={pose.id}>{pose.name}</span>)
                    : null}
                    {sequence.pose_in_seqs.length !== 0 ?
                        <PoseShowInSeq poses={this.props.poses} pose={sequence.pose_in_seqs[data.counter]}/>
                    : null}
                    {data.counter+1 < sequence.pose_in_seqs.length ?  "Next Pose" : "Last Pose"}
                    {data.counter+1 < sequence.pose_in_seqs.length ?
                        this.props.poses.find(pose => pose.id === sequence.pose_in_seqs[data.counter+1].pose_id).name
                    : null }
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

    displaySequenceDirectPath = (data) => {
        console.log("displaySequenceDirectPath")
        console.log(this.state)
        console.log(this.props)
        const sequence = this.state.sequence;
        return (
            (sequence !== undefined && Object.keys(sequence).length !== 0 )?
            <div className="sequenceShowContainer">
                <div className="sequenceShowDiv">
                    <div className="highlightPose">
                        <NavLink to={`/sequence/${sequence.id}`} className="no-ul" onClick={this.reset}>
                            <h1 className="center">{sequence !== undefined ? sequence.name.toUpperCase() : null}</h1>
                        </NavLink>
                        <SeqInfo sequence={sequence} data={data} changePause={this.changePause} reset={this.reset} poses={sequence.poses} />
                    </div>
                    {/*<button onClick={this.changePause}>{data.pauseClicked ? 'Pause' : 'Start'}</button>
                    <button onClick={this.reset}>Reset</button>*/}

                    <PoseList posesInSeq={sequence.pose_in_seqs} poses={this.props.poses} current={data.counter}/>
                 </div>
            </div> : null
        )
    }

    /* shows the pose in sequence and the list of poses */
    displaySequence = (data) => {
        //console.log("displaySequence2");
        //console.log(data);
        const sequence = this.props.sequences.find(sequence =>
            sequence.id === parseInt(this.props.match.params.id));
        //console.log(sequence)
        this.sortPoses(sequence.pose_in_seqs)
        return (
                <div className="sequenceShowContainer">
                    <div className="sequenceShowDiv">
                        <div className="highlightPose">
                            <NavLink to={`/sequence/${sequence.id}`} className="no-ul" onClick={this.reset}>
                                <h1 className="center">{sequence.name.toUpperCase()}</h1>
                            </NavLink>
                            {this.poseInfo(sequence, data)}
                        </div>
                        {/*<button onClick={this.changePause}>{data.pauseClicked ? 'Pause' : 'Start'}</button>
                        <button onClick={this.reset}>Reset</button>*/}

                        <PoseList posesInSeq={sequence.pose_in_seqs} poses={this.props.poses} current={data.counter}/>
                     </div>
                </div>
        )
    }

    display = (data) => {
        console.log("in display")
        console.log(this.props);
        console.log(this.state);
        let sequence = {};

        // get state sequence if user refreshed or went directly to this page
        if (this.props.sequences.length === 0 && this.props.match.path === '/sequences/:id' && Object.keys(this.state.sequence).length !== 0)
            sequence = this.state.sequence;

        // find sequences if props.sequences is not empty (viewing from list)
        if (this.props.sequences.length !== 0) {
            sequence = this.props.sequences.find(sequence =>
                    sequence.id === parseInt(this.props.match.params.id));
        }

        // sort the poses if they and sequence exists
        if (Object.keys(sequence).length !== 0 && sequence.pose_in_seqs.length !== 0)
            this.sortPoses(sequence.pose_in_seqs);

        return (
            (sequence !== undefined && Object.keys(sequence).length !== 0 )?
            <div className="sequenceShowContainer">
                <div className="sequenceShowDiv">
                    <div className="highlightPose">
                        <NavLink to={`/sequence/${sequence.id}`} className="no-ul" onClick={this.reset}>
                            <h1 className="center">{sequence !== undefined ? sequence.name.toUpperCase() : null}</h1>
                        </NavLink>
                        <SeqInfo sequence={sequence} data={data} changePause={this.changePause} reset={this.reset} poses={sequence.poses} />
                    </div>
                    {/*<button onClick={this.changePause}>{data.pauseClicked ? 'Pause' : 'Start'}</button>
                    <button onClick={this.reset}>Reset</button>*/}

                    <PoseList posesInSeq={sequence.pose_in_seqs} poses={this.props.poses} current={data.counter}/>
                 </div>
            </div> : null
        )

    }
    //render() {
    //    //console.log("Sequence Show");
    //    //console.log(this.props);
    //    const {isLoaded, ...data} = this.state;
    //    return isLoaded && !this.props.requesting ?
    //            <div>
    //                {this.props.sequences.length === 0 && this.props.match.path === '/sequences/:id' && Object.keys(this.state.sequence).length !== 0 ?
    //                    this.displaySequenceDirectPath(data)
    //                : this.displaySequence(data)}
    //            </div> : <LoadingSpinner />
    //}

    render() {
        const {isLoaded, ...data} = this.state;
        return isLoaded ?
            <div>
                {this.display(data)}
            </div> : <LoadingSpinner />
    }
    /* reset the sequence after user presses stop */
    reset = () => {

        // clears out the timers
        if (this.timeoutID) {
            clearTimeout(this.timeoutID);
        }
        if (this.intervalID) {
            clearInterval(this.intervalID);
        }

        // reset all values back to initial start value
        this.setState({
            ...this.state,
            counter: 0,
            num_breaths: this.state.sequence.pose_in_seqs.length !== 0 ? this.state.sequence.pose_in_seqs[0].num_breaths : 1,
            pauseClicked: false,
            time: 0,
            end: true
        })
    }

    /* start timer from scratch or from pause based on the current pose by user's click to start/restart */
    startPoseChange = () => {
        //console.log("startPose")

        // timeoutID that sets out the time before changing to the next pose
        this.timeoutID = setTimeout(this.changePose, (this.state.num_breaths*this.state.seconds_per_breath-this.state.time)*1000);

        // timer that counts per second
        this.intervalID = setInterval(this.timedCount, 1000)

        // set state to back to pauseClicked to true
        this.setState({
            ...this.state,
            pauseClicked: true,
            //counter: 0,
            //num_breaths: this.state.sequence.pose_in_seqs[this.state.counter].num_breaths,
            //time: 0,
            //end: false
        })
    }

    /* clear the timer for the current pose to pause everything upon user's click for pause*/
    stopPoseChange = () => {

        //clear timers and intervals
        if (this.timeoutID)
            clearTimeout(this.timeoutID);
        if (this.intervalID)
            clearInterval(this.intervalID);

        // set pause Clicked state back to false
        this.setState({
            ...this.state,
            pauseClicked: false
        })
    }

    /* toggles timer from pause to continue */
    changePause = () => {
        console.log("Change Pause")
        if (this.state.pauseClicked) {
            this.stopPoseChange();
        } else {
            this.startPoseChange();
        }
    }

    /* normal counter that counts per second */
    timedCount = () => {
        this.setState({
            ...this.state,
            time: this.state.time + 1
        })
    }

    /* update state based on next pose information*/
    changePose = () => {
        console.log("changePose")
        console.log(this.state.sequence)

        // check if there are any poses in the sequence and check whether or not it's at the last pose
        if (this.state.sequence.pose_in_seqs && this.state.counter + 1 < this.state.sequence.pose_in_seqs.length) {

            // clear timers associated with previous pose
            if (this.timeoutID)
                clearTimeout(this.timeoutID);
            if (this.intervalID)
                clearInterval(this.intervalID);

            // update state to next pose
            this.setState(prevState => ({
                ...prevState,
                counter: prevState.counter + 1,
                num_breaths: prevState.sequence.pose_in_seqs[prevState.counter + 1].num_breaths,
                pose: prevState.sequence.pose_in_seqs[prevState.counter + 1],
                time: 0
            }))
            //console.log(this.state);

            //set new timers based on updated values of current pose
            this.timeoutID = setTimeout(this.changePose, this.state.num_breaths*this.state.seconds_per_breath*1000)
            this.intervalID = setInterval(this.timedCount, 1000)
        } else if (this.state.sequence.pose_in_seqs) {
            //console.log("This is the end?");
            //clearTimeout(this.timeoutID)
            //clearInterval(this.intervalID)

            //update state to the last pose
            this.setState({
                ...this.state,
                counter: this.state.counter,
                num_breaths: this.state.sequence.pose_in_seqs.length ? this.state.sequence.pose_in_seqs[this.state.counter].num_breaths : 1,
                pauseClicked: false,
                end: true
            })

            // clear timers and update state
            this.stopClock();
        }
    }

    /* function called once the sequence finishes */
    stopClock = () => {

        // clear timers
        if (this.timeoutID)
            clearTimeout(this.timeoutID);
        if (this.intervalID)
            clearInterval(this.intervalID);

        // update state to end the sequence and reset the time
        this.setState({
            ...this.state,
            //counter: 0,
            //num_breaths: this.state.sequence.pose_in_seqs.length ? this.state.sequence.pose_in_seqs[this.state.counter].num_breaths : 1,
            pauseClicked: false,
            time: 0,
            end: true
        })
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSequence: (id) => dispatch(getSequence(id))
    }
}

const mapStateToProps = (state) => {
    //console.log("seqShow -> mapStateToProps")
    //console.log(state);
    return {
        sequences: state.sequences.sequences,
        sequence: state.sequences.selSequence, // needed for when user goes directly to page
        categories: state.categories.categories,
        poses: state.poses.poses,
        user: state.auth.currentUser,
        requesting: state.sequences.requesting,
        loggedIn: state.auth.loggedIn
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (SeqShow);

