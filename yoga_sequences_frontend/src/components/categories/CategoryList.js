import React from 'react';
import Category from './Category';

const CategoryList = (props) => {
    return props.categories.length !== 0? props.categories.map(category => <Category key={category.id} category={category} deleteCategory={props.deleteCategory}/>) : null
}

export default CategoryList;