import React, { Fragment } from 'react';

const SeqPoseList = ({posesInSeq, poses, current}) => {
    const posesAll = posesInSeq.map(poseInSeq => {
            return {
                ...poses.find(pose => poseInSeq.pose_id === pose.id),
                pose_order: poseInSeq.pose_order,
                num_breaths: poseInSeq.num_breaths,
                id: poseInSeq.id
            }
        })
    console.log(posesAll);

    function highlightCurrentPose(current, index, pose) {
        if (current === index) {
            return <>
                <div className="head selectedPose poseDiv">{index+1}. {pose.name} </div>
                <div className="head selectedPose poseDiv">{pose.num_breaths}</div></>
        } else {
            return <>
                <div className="head">{index+1}. {pose.name} </div>
                <div className="head">{pose.num_breaths}</div></>
        }
    }
    function display () {
        if (posesInSeq.length > 0) {
            return <>
                <div className="header">Poses</div>
                <div className="header">Number of Breaths</div>
                    {posesAll.map((pose,index) => {
                        return <Fragment key={"pose" + pose.id}>
                            {highlightCurrentPose(current, index, pose)}</Fragment>
                    })}
                
                </>
        }
    }

    return (
        <>
            <div className="sequenceContainerGrid2">
                {display()}
            </div>
        </>
    )
}

export default SeqPoseList;