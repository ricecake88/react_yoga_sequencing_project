import React from 'react';
import {v1 as uuid} from 'uuid';

const Pose = ({pose}) => {
    return (
        <div>
            <p>
            Name: {pose.name}<br/>
            Sanskrit: {pose.sanskrit}<br/>
            Category: {pose.category}<br/>
            Tags: {pose.tags.map(tag => <span key={uuid()}>#{tag} </span>)}<br/>
            Video: {pose.video}<br/>
            Image: {pose.image}<br/>
            URL: {pose.url}<br/>
            Description: {pose.description}<br/>
            </p>
        </div>
    )
}
export default Pose;