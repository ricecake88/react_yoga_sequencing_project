import React, { Component } from 'react';

class SeqPoseDraggableEdit extends Component {

    render() {
        console.log("SeqPoseDraggableEdit");
        console.log(this.props.poseInSeq)
        return (
            <>
                {/* find pose name */}
                {this.props.poses.map(pose => {
                    return (pose.id === this.props.poseInSeq.pose_id) ? <div className="first">{pose.name}</div> : null
                })}
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