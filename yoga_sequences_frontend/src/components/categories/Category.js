import React from 'react';

const Category = (props) => {
    console.log("in Category");
    console.log(props)
    return <div>
        <li>{props.category.name}
        <button onClick={() => props.delete(props.category.id)}>X</button>
        </li>
    </div>
}
export default Category;