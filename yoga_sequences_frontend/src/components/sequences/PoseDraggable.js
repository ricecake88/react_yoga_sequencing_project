import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class PoseTable extends Component  {

    state = {
        num_breaths: 1,
        pose_order: 0,
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


/*     render() {
        console.log("Pose Draggable")
        return (
            <DragDropContext>
                <Droppable droppableId="poses">
                {(provided) => (
                    <ul className="poses" {...provided.droppableProps} ref={provided.innerRef}>
                    {this.props.poses.map((pose, index) => {
                        return (
                            <Draggable key={pose.id} draggableId={pose.id} index={index} >
                            {(provided) => {
                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <span>{pose.name}</span>
                                <span><input type="text" name="numBreaths" onChange={this.onChange} onBlur={(event) => this.props.onBlur(event, pose.id)}></input></span>
                                <span><input type="text" name="poseOrder" onChange={this.onChange} onBlur={(event) => this.props.onBlur(event, pose.id)}></input></span>
                                <span><button onClick={(event) => this.props.delete(event, pose.id)}>X</button></span>
                                </li>}}
                        </Draggable>
                        )}
                    )}
                    </ul>
                )}
                </Droppable>
            </DragDropContext>
        )
    } */

    render() {
        console.log("Pose Draggable")
        console.log(this.props)
        return (
            <DragDropContext onDragEnd={this.props.onDrag}>
                <Droppable droppableId="poses">
                    {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef}>
                         {this.props.poses.map((pose, index) => {
                             return (
                                 <Draggable key={index} draggableId={index.toString()} index={index}>
                                     {(provided) => (
                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            {pose.name}
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

export default PoseTable;