import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class PoseDraggable extends Component  {

    state = {
        num_breaths: 1,
        pose_order: 0,
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        console.log("Pose Draggable")
        console.log(this.props)
        return (
            <DragDropContext onDragEnd={this.props.onDrag}>
                <Droppable droppableId="poses">
                    {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef}>
                         {this.props.addedPoses.map((poseInSeq, index) => {
                             return (
                                 <Draggable key={index} draggableId={index.toString()} index={index}>
                                     {(provided) => (
                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            {this.props.poses.map(pose => {
                                                return (pose.id === poseInSeq.pose_id) ? pose.name : null
                                            })}
                                            <span><input type="text" value={this.state.num_breaths} name="num_breaths" onChange={this.onChange} onBlur={(event) => this.props.onBlur(event, index)}></input></span>
                                            <span><button onClick={(event) => this.props.delete(event, index)}>X</button></span>
                                        </li>
                                     )}
                                </Draggable>
                             )
                         })}
                         {provided.placeholder}
                        </ul>)}
                </Droppable>
            </DragDropContext>
        )
    }
}

export default PoseDraggable;