import React from 'react';

const Category = (props) => {
    //console.log("in Category");
    //console.log(props)
    return <div>
        {props.category.name === "Uncategorized" ?
        <li>Uncategorized</li>
        :
        <li>{props.category.name}
        <button onClick={() => props.delete(props.category.id)}>X</button>
        </li>}
    </div>
}
export default Category;