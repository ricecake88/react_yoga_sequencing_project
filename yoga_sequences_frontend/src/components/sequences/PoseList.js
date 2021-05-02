import React from 'react';

const PoseList = ({posesInSeq, poses}) => {
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
        <><p>List of Poses</p>
        {posesAll.map((pose, index) => <div id={"pose" + pose.id} key={"pose" + pose.id}>#{index+1} {pose.name} Number of Breaths: {pose.num_breaths}</div>)}
        </>
    )
}

export default PoseList;