import React, { Component } from 'react';
import { connect } from 'react-redux';
import YogaCategoryAdd from '../sequences/YogaCategoryAdd';
import { addYogaCategory } from '../../actions/yogaCategories';
import { getYogaCategories } from '../../actions/yogaCategories';

class YogaCategories extends Component {

 state = {
     name: ''
 }

  componentDidMount = () => {
      console.log("components/sequences/YogaCategories ->component did mount");
      console.log(this.props.user);
      this.props.getCategories(this.props.user);
      
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
        getCategories: (user) => dispatch(getYogaCategories(user))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (YogaCategories);