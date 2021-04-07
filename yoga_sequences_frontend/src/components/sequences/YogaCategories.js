import React, { Component } from 'react';
import { connect } from 'react-redux';
import YogaCategoryAdd from '../sequences/YogaCategoryAdd';
import { addYogaCategory } from '../../actions/yogaSeq';
import { getYogaCategories } from '../../actions/yogaSeq';

class YogaCategories extends Component {

 state = {
     name: ''
 }

  componentDidMount = () => {
      console.log("component did mount")
      this.props.getCategories();
      console.log(this.props.categories)
  }

  onChange = (event) => {
    console.log("Selected onChangeCategory");
     this.setState({
            [event.target.name]: event.target.value
        })
  }

  onSubmit = (event) => {
    event.preventDefault();
  }

  display() {
        console.log(">>>YogaCategories")
        return (
        <div>
        <select value={this.state.name} name="name" onChange={this.onChange}>
            <option disabled value="">Select a Category</option>
            {this.props.categories.map(category => <option key={category.id} value={category.name}>{category.name}</option>)}
            <option value="Add Category">Add Category</option>
            </select>
            <YogaCategoryAdd user={this.props.currentUser} addTrue={this.state.name} name="name" addCategory={this.props.addCategory} onChange={this.onChange}/>
            </div>
        )
  };

   render() {
        return(
        <div>
            {this.display()}
        </div>)
    }
}

function mapStateToProps(state) {
    console.log("\t>>>YogaSeqContainer -> mapStateToProps")
    console.log(state);
    return {
        categories: state.yogaCategories.categories,
        user: state.auth.currentUser
     }
}

function mapDispatchToProps(dispatch) {
    console.log("\tYogaCategories >> mapDispatchToProps");
    return {
        addCategory: (category) => dispatch(addYogaCategory(category)),
        getCategories: () => dispatch(getYogaCategories)
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (YogaCategories);