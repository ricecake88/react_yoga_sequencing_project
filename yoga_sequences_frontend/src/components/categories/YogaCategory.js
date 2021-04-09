import React from 'react';

const YogaCategory = (props) => {
    console.log("in YogaCategory");
    console.log(props)
    return <div>
        <li>{props.category.name}
        <button onClick={() => props.delete(props.category.id)}>X</button>
        </li>
    </div>
}
export default YogaCategory;