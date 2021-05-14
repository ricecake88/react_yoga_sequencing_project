import React from 'react';
import { NavLink } from 'react-router-dom';
import PoseShowInSeq from '../sequences/PoseShowInSeq';

const SeqInfo = (props) => {
    //console.log("In SeqInfo");
    //console.log(props);
    const {sequence, data, changePause, reset, poses} = props
    return (
       sequence.pose_in_seqs.length !== 0  && data.counter === sequence.pose_in_seqs.length-1 && data.end ?
            "You have reached the end of your yoga practice! Namaste!"
        :
            <>
                Category: {sequence.category.name}
                {sequence.pose_in_seqs.length !== 0 ?
                    sequence.pose_in_seqs.map(pose =>
                        <span key={pose.id}>{pose.name}</span>)
                : null}
                {sequence.pose_in_seqs.length !== 0 ?
                    <PoseShowInSeq poses={poses} pose={sequence.pose_in_seqs[data.counter]}/>
                : null}
                {data.counter+1 < sequence.pose_in_seqs.length ?  "Next Pose: " : "Last Pose"}
                {data.counter+1 < sequence.pose_in_seqs.length ?
                    poses.find(pose => pose.id === sequence.pose_in_seqs[data.counter+1].pose_id).name
                : null }
                <div className="center">
                    <p>Time:{data.time}</p>
                    <span onClick={() => changePause()}>
                    {data.pauseClicked ?
                        <span className="material-icons click">pause</span>
                        : <span className="material-icons click">play_arrow</span>}
                    </span>
                    <span className="material-icons click" onClick={() => reset()}>stop</span>
                </div>
            </>
        )

}

export default SeqInfo;