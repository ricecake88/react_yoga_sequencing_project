import React from 'react';

const PoseList = ({poses}) => {
    console.log("PoseList");
    console.log(poses);
    return (
        <>
        {poses.map(pose => <div key={pose.id}>{pose.name}</div>)}
        </>
    )
}

export default PoseList;