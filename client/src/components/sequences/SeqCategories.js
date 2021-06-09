import React, { Component } from 'react';
import { connect} from 'react-redux'
import SeqCategoryAdd from './SeqCategoryAdd';
import { SeqCategoryAddHooks } from './SeqCategoryAddHooks';

class SeqCategories extends Component {


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
            {/*<SeqCategoryAdd
               addTrue={this.props.id}
               //name="category_id"
               addCategory={this.props.addCategory}
               onChange={this.props.onChange}/>
            <br/>*/}
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

export default connect(mapStateToProps)(SeqCategories);