import React from 'react';
import {v1 as uuid} from 'uuid';

const Pose = ({pose}) => {
    return (
        <div className="margin10">
            <span className="big">{pose.name}</span><br/>
            <span className="propertyFieldName">Sanskrit</span>: {pose.sanskrit}<br/>
            <span className="propertyFieldName">Category</span>: {pose.category}<br/>
            <span className="propertyFieldName">Tags</span>: {pose.tags.map(tag => <span key={uuid()}>#{tag} </span>)}<br/>
            <span className="propertyFieldName">Video</span>: {pose.video}<br/>
            <span className="propertyFieldName">Image</span>: <img src={`../../assets/${pose.image}`} title={pose.image} alt={pose.image}/><br/>
            <span className="propertyFieldName">URL</span>: {pose.url}<br/>
            <p><span className="propertyFieldName">Description</span>: {pose.description}<br/></p>
        </div>
    )
}
export default Pose;