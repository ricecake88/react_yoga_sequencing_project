import React from 'react';
import Draggable from 'react-draggable';

const PoseDraggableEditable = ({poses}) => {
    console.log("PoseDraggableEditable");
    const handleStart = (e, data) => {
        console.log(e, data);
      };
      const handleDrag = (e, data) => {
        console.log(e, data);
      };
      const handleStop = (e, data) => {
        console.log(e, data);
      };

    return (
        <>
        {poses.map(pose => 
            <Draggable 
            axis="y"
            handle=".handle"
            defaultPosition={{ x: 0, y: 0 }}
            position={null}
            grid={[25, 25]}
            scale={1}
            onStart={handleStart}
            onDrag={handleDrag}
            onStop={handleStop}            
                key={pose.id}>
                <div>
                <div className="handle">Drag from here</div>
                    <div>
                        {pose.name}
                    </div>
                </div>
            </Draggable>)

        }
        </>
    )
}

export default PoseDraggableEditable;