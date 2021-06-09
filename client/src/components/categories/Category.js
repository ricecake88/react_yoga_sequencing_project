import React from 'react';

const Category = (props) => {
    return (
        <>
            <div className="head">
                {props.category.name === "Uncategorized" ?
                     <span className="gray">Uncategorized</span>
                : props.category.name}</div>
            <div className="head">
                {props.category.name === "Uncategorized" ? 
                    null 
                : <span onClick={() => props.deleteCategory(props.category.id)} className="material-icons delete">delete_outline</span>}
            </div>
        </>
    )
}
export default Category;