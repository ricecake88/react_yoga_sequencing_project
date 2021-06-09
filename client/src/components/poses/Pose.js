import React from 'react';
import {v1 as uuid} from 'uuid';


const Pose = ({pose}) => {
    return (
        <div className="margin10">
            <span className="big">{pose.name}</span><br/>
            <img src={require(`../../assets/images/poses/${pose.image}.png`).default} className="poseImg" alt={pose.image}/><br/>
            <span className="propertyFieldName">Sanskrit</span>: {pose.sanskrit}<br/>
            <span className="propertyFieldName">Category</span>: {pose.category}<br/>
            <span className="propertyFieldName">Tags</span>: {pose.tags.map(tag => <span key={uuid()}>#{tag} </span>)}<br/>
            <a href={`${pose.video}`}>YouTube</a><br/>
            <a href={`${pose.url}`}>More Information</a><br/>
            <p><span className="propertyFieldName">Description</span>: {pose.description}<br/></p>
        </div>
    )
}
export default Pose;