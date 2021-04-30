import React from 'react';
import Category from './Category';

const CategoryList = (props) => {
    return props.categories.map(category => <Category key={category.id} category={category} deleteCategory={props.deleteCategory}/>)
}

export default CategoryList;