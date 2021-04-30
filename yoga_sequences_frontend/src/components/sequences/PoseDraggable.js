import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PoseEdit from '../sequences/PoseEdit';

class PoseDraggable extends Component  {

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
                                            <PoseEdit index={index} poseInSeq={poseInSeq} onChange={this.props.onChange} poses={this.props.poses} onBlur={this.props.onBlur} delete={this.props.delete}/>
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