import React from 'react';
import YogaCategory from './YogaCategory';

const YogaCategoryList = (props) => {
    return props.categories.map(category => <YogaCategory key={category.id} category={category} user={props.user} delete={props.delete}/>)
}

export default YogaCategoryList;