import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SeqPoseList from './SeqPoseList';
//import LoadingSpinner from '../LoadingSpinner';
import { getSequence } from '../../actions/sequences';
import SeqInfo from './SeqInfo';
//import { getPoses } from '../../actions/poses';
//import { checkAuth } from '../../actions/auth';

class SeqShowNewest extends Component {

    state = {
        seconds_per_breath: 3, // TO-DO: Configurable setting by user
        num_breaths: 1,
        sequence: {},
        counter: 0, // current pose index selection
        time: 0, // for tracking of time passed for current pose
        isLoaded: false,
        pauseClicked: false,
        end: false
    }


    /* used when user refreshes the page and we need to get the sequence from props
       otherwise the state never changes since this is repeatedly called */
    static getDerivedStateFromProps(props, current_state) {

        // if state sequence is not set yet and sequence from props is available
        // set the initial state for sequence
        if (Object.keys(current_state.sequence).length === 0 && 
            Object.keys(props.sequence).length !== 0 && 
            props.match.id !== "add" ) {
                SeqShowNewest.sortPoses(props.sequence.pose_in_seqs)
                console.log("SHOW -> SETTING UP INITIAL SEQUENCE ONCE")
                return {
                    ...current_state,
                    sequence: {
                        ...props.sequence
                    }
                }
        } else {
            return current_state;
        }
    }

    componentDidMount = () => {
        //console.log("SeqShow -> componentDidMount")
        let id = this.props.match.params.id;

        // if user refreshes the page or arrives here directly
        if (this.props.sequences.length === 0 && 
            this.props.match.params.id !== "add" && 
            this.props.match.url === `/sequences/${id}`) {
            console.log("SHOW -> REFRESH/DIRECT")

            // make request to server to retrieve sequence
            this.props.getSequence(parseInt(this.props.match.params.id))
            .then(() => {
                this.setState({
                    ...this.state,
                    sequence: this.props.sequence,
                    num_breaths: this.props.sequence.pose_in_seqs !== undefined && 
                        this.props.sequence.pose_in_seqs.length !== 0 
                        ? this.props.sequence.pose_in_seqs[0].num_breaths
                        :1,
                    isLoaded: true
                })
            })
            .catch(err => console.log("Caught!"))
        } else {
            console.log("SHOW -> NAVIGATE FROM LIST")

            // if user accesses the sequence from the sequence list
            // find the sequence based on path id from sequence list
            const sequence = this.props.sequences.find(sequence =>
                sequence.id === parseInt(this.props.match.params.id));

            // set initial
            if (sequence) {
                SeqShowNewest.sortPoses(sequence.pose_in_seqs)
                let num_breaths = 1;
                if (sequence !== undefined && sequence.pose_in_seqs.length !== 0) {
                    num_breaths = sequence.pose_in_seqs[0].num_breaths
                }
                this.setState(prevState => ({
                    ...prevState,
                    sequence: sequence,
                    num_breaths: num_breaths,
                    isLoaded: true
                }))
            } else {
                this.setState({
                    ...this.state,
                    isLoaded: true
                })
            }
        }
    }

    componentWillUnmount() {
        // clear out the timers
        if (this.timeoutID) {
            clearTimeout(this.timeoutID);
        }
        if (this.intervalID) {
            clearInterval(this.intervalID);
        }
    }

    /* class method that sorts the in order
        of pose order */
    static sortPoses = (posesInSeq) => {
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

    display = (data) => {
        let sequence = {};

        sequence= this.state.sequence;
        if (Object.keys(sequence).length !== 0) {
            if (sequence.pose_in_seqs.length !== 0)
                SeqShowNewest.sortPoses(sequence.pose_in_seqs);
            return (
                <div className="genericInnerContainer">
                    <div className="highlightPose">   
                        <h1 className="center">
                            {/* name of sequence */}
                            <NavLink to={`/sequences/${sequence.id}`} 
                                className="no-ul heading"
                                title="Show Sequence"
                                onClick={this.reset}>
                                    {sequence.name.toUpperCase()}
                            </NavLink>
                            &nbsp;
                            {/* edit link */}
                            <NavLink to={`/sequences/edit/${sequence.id}`} title="Edit">
                                <span className="material-icons edit">edit</span>
                            </NavLink>
                        </h1>
                        <SeqInfo 
                            sequence={sequence} 
                            data={data}
                            changePause={this.changePause}
                            reset={this.reset}
                            poses={sequence.poses} />
                        <SeqPoseList 
                            posesInSeq={sequence.pose_in_seqs}
                            poses={this.props.poses}
                            current={data.counter}/>                            
                    </div>
                 </div>                
            )
        } else {
            return null
        }
    }

    render() {
        const {isLoaded, ...data} = this.state;
        return isLoaded ?
            <div>
                {this.display(data)}
            </div> : null
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
            end: false
        })
    }

    /* start timer from scratch or from pause based on the current pose by user's click to start/restart */
    startPoseChange = () => {

        // timeoutID that sets out the time before changing to the next pose
        this.timeoutID = setTimeout(this.changePose, (this.state.num_breaths*this.state.seconds_per_breath-this.state.time)*1000);

        // timer that counts per second
        this.intervalID = setInterval(this.timedCount, 1000)

        // set state to back to pauseClicked to true
        this.setState({
            ...this.state,
            pauseClicked: true,
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

            //set new timers based on updated values of current pose
            this.timeoutID = setTimeout(this.changePose, this.state.num_breaths*this.state.seconds_per_breath*1000)
            this.intervalID = setInterval(this.timedCount, 1000)
        } else if (this.state.sequence.pose_in_seqs) {

            //update state to the last pose
            this.setState({
                ...this.state,
                counter: this.state.counter,
                num_breaths: this.state.sequence.pose_in_seqs.length ? this.state.sequence.pose_in_seqs[this.state.counter].num_breaths : 1,
                pauseClicked: false
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
    return {
        sequences: state.sequences.sequences,

        // needed for when user goes directly to page
        sequence: state.sequences.selSequence,
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (SeqShowNewest);
