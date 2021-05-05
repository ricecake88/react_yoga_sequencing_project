import React from 'react';

const PoseList = ({posesInSeq, poses, current}) => {
    console.log("PoseList");
    const posesAll = posesInSeq.map(poseInSeq => {
            return {
                ...poses.find(pose => poseInSeq.pose_id === pose.id),
                pose_order: poseInSeq.pose_order,
                num_breaths: poseInSeq.num_breaths,
                id: poseInSeq.id
            }
        })
    console.log(posesAll);

    return (
        <>
        <p>List of Poses</p>
            {posesAll.map((pose, index) => {
                return current === index ?
                    <div id={"pose" + pose.id} key={"pose" + pose.id} className="selectedPose">#{index+1} {pose.name} Number of Breaths: {pose.num_breaths}</div>
                    :
                    <div id={"pose" + pose.id} key={"pose" + pose.id}>#{index+1} {pose.name} Number of Breaths: {pose.num_breaths}</div>
            })}
        </>
    )
}

export default PoseList;