import React from 'react';

const YogaPose = ({pose}) => {
    return (
        <div>
            <p>
            Name: {pose.name}<br/>
            Sanskrit: {pose.sanskrit}<br/>
            Category: {pose.category}<br/>
            Tags: {pose.tags.map(tag => <span>{tag}</span>)}<br/>
            Video: {pose.video}<br/>
            Image: {pose.image}<br/>
            URL: {pose.url}<br/>
            Description: {pose.description}<br/>
            </p>
        </div>
    )
}
export default YogaPose;