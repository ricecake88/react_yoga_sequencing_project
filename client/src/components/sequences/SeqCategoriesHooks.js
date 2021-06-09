import React, { Component } from 'react';
import { connect, useSelector} from 'react-redux'
import SeqCategoryAdd from './SeqCategoryAdd';
import { SeqCategoryAddHooks } from './SeqCategoryAddHooks';

export function SeqCategoriesHooks(props) {
    const categories = useSelector(state => state.categories.categories)

    return (
        <>
        <label htmlFor="category">Category: </label>
        <select value={props.id} name="category_id" onChange={props.onChange} onClick={props.onClick}>
            <option disabled value="">Select a Category</option>
            {Object.keys(categories).length !== 0 ?
              categories.sort((a,b) => b.id - a.id).map(category => {
                 return (category.name === "Uncategorized" ?
                  <option key={category.id} value={category.id} disabled>Uncategorized</option> :
                  <option key={category.id} value={category.id}>{category.name}</option>)
              }) : null}
            <option value="Add Category">Add Category</option>
            </select>
            <SeqCategoryAddHooks
               addTrue={props.id}
               //name="category_id"
               addCategory={props.addCategory}
            onChange={props.onChange}/>
        </>
        )
}

/*class SeqCategories extends Component {


  display() {

        return (
        <>
        <label htmlFor="category">Category: </label>
        <select value={this.props.id} name="category_id" onChange={this.props.onChange} onClick={this.props.onClick}>
            <option disabled value="">Select a Category</option>
            {Object.keys(this.props.categories).length !== 0 ?
              this.props.categories.sort((a,b) => b.id - a.id).map(category => {
                 return (category.name === "Uncategorized" ?
                  <option key={category.id} value={category.id} disabled>Uncategorized</option> :
                  <option key={category.id} value={category.id}>{category.name}</option>)
              }) : null}
            <option value="Add Category">Add Category</option>
            </select>
            <SeqCategoryAddHooks
               addTrue={this.props.id}
               //name="category_id"
               addCategory={this.props.addCategory}
            onChange={this.props.onChange}/>
        </>
        )
  };

   render() {
        return <>{this.display()}</>
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories
    }
}

export default connect(mapStateToProps)(SeqCategories);*/