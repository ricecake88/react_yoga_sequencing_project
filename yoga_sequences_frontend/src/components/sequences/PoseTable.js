import React from 'react';

const PoseTable = ({poses}) => {
    console.log("PoseList");
    console.log(poses);
    return (
        <>
        <table>
            <tbody><tr><thead>Name</thead></tr></tbody>
        {poses.map(pose => <tr key={pose.id}><td>{pose.name}</td></tr>)}
        </table>
        </>
    )
}

export default PoseTable;