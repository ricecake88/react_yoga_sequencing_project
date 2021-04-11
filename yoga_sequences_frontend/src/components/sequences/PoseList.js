import React from 'react';

const PoseList = (poses) => {
    return (
        <>
        {poses.map(pose => <div>{pose.id}</div>)}
        </>
    )
}

export default PoseList;