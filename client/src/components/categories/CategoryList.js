import React from 'react';
import Category from './Category';

const CategoryList = (props) => {
    return (
        props.categories && props.categories.length !== 0 ? 
            <div className="sequenceContainerGrid2">
                <div className="header">Category</div>
                <div className="header">Delete</div>
                {props.categories.sort(function(a, b) {return b.id - a.id}).map(category => 
                    <Category key={category.id} category={category} deleteCategory={props.deleteCategory}/>)}
            </div>
        : null
    )
}

export default CategoryList;