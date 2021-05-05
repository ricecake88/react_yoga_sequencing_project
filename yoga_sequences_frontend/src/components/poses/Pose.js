import React from 'react';
import {v1 as uuid} from 'uuid';

const Pose = ({pose}) => {
    return (
        <div>
            <p>
            <span className="label">Name</span>: {pose.name}<br/>
            <span className="label">Sanskrit</span>: {pose.sanskrit}<br/>
            <span className="label">Category</span>: {pose.category}<br/>
            <span className="label">Tags</span>: {pose.tags.map(tag => <span key={uuid()}>#{tag} </span>)}<br/>
            <span className="label">Video</span>: {pose.video}<br/>
            <span className="label">Image</span>: {pose.image}<br/>
            <span className="label">URL</span>: {pose.url}<br/>
            <span className="label">Description</span>: {pose.description}<br/>
            </p>
        </div>
    )
}
export default Pose;