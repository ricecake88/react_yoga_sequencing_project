import React from 'react';
import Category from './Category';

const CategoryList = (props) => {
    return props.categories && props.categories.length !== 0 ? props.categories.sort(function(a, b) {return b.id - a.id}).map(category => <Category key={category.id} category={category} deleteCategory={props.deleteCategory}/>) : null
}

export default CategoryList;