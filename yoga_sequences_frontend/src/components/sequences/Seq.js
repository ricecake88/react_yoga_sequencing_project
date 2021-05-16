import React from 'react';

const Seq = (props) => {
    //console.log("Seq Component");
    //console.log(props)
    return  (
        <span>
        {props.sequence.name}
        {props.sequence.category}
        <button onClick={() => props.delete(props.sequence.id)}>X</button><br/>
        </span>
    )
}
export default Seq;