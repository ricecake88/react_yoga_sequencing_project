import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SeqPoseDraggableEdit from './SeqPoseDraggableEdit';

class SeqPoseDraggable extends Component  {

    render() {
        console.log("Pose Draggable")
        console.log(this.props)
        return (
            <DragDropContext onDragEnd={this.props.onDrag}>
                <Droppable droppableId="poses">
                    {(provided) => (
                        <div className="droppable">
                            <div className="draggable-header">
                                <div className="first">Name</div>
                                <div className="second"># of Breaths</div>
                                <div className="third">Remove</div>
                            </div>
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                         {this.props.addedPoses.map((poseInSeq, index) => {
                             return (
                                 <Draggable key={index} draggableId={index.toString()} index={index}>
                                     {(provided) => (
                                        <div className="draggable" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <SeqPoseDraggableEdit index={index} poseInSeq={poseInSeq} onChange={this.props.onChange} poses={this.props.poses} onBlur={this.props.onBlur} delete={this.props.delete}/>
                                        </div>
                                     )}
                                </Draggable>
                             )
                         })}
                         {provided.placeholder}
                        </div></div>)}
                </Droppable>
            </DragDropContext>
        )
    }
}

export default SeqPoseDraggable;