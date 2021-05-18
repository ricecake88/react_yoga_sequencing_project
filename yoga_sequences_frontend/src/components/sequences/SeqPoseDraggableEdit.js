import React, { Component } from 'react';

class SeqPoseDraggableEdit extends Component {

    render() {
        const pose = this.props.poses.find(pose => pose.id === this.props.poseInSeq.pose_id)
        return (
            <>
                {/* find pose name */}
                {Object.keys(pose).length !== 0 ? <div className="first">{pose.name}</div> : null}

                {/* Input for num_breaths */}
                <span className="second">
                    <input key={this.props.poseInSeq.num_breaths} 
                        type="text" 
                        defaultValue={this.props.poseInSeq.num_breaths} 
                        name="num_breaths" 
                        onChange={(event) =>this.props.onChange(event)} 
                        onBlur={(event) => this.props.onBlur(event, this.props.index)}>
                    </input>
                </span>

                {/* Remove button for third */}
                <span className="third">
                {this.props.route === "Add" ?
                    <button onClick={(event) => this.props.delete(event, this.props.index )}>X</button>
                :
                    <button onClick={(event) => this.props.delete(event, this.props.poseInSeq.id, this.props.index )}>X</button>
                }
                </span>

        </>)
    }
}

export default SeqPoseDraggableEdit;