import React, { Component } from 'react';
import { connect} from 'react-redux'
import { getCategories } from '../../actions/categories';

class Categories2 extends Component {


  componentDidMount = () => {
    this.props.getCategories(this.props.user);
  }

 /* onChange = (event) => {
    console.log("Selected onChangeCategory");
     this.setState({
            [event.target.name]: event.target.value
        })
  }*/

  onSubmit = (event) => {
    event.preventDefault();
  }

  display() {
        console.log(">>>Categories2")
        console.log(this.props)
        console.log(this.props.categories)
        console.log(Object.keys(this.props.categories).length)
        return (
        <>
        <div>
        <select value={this.props.id} name="category_id" onChange={this.props.onChange}>
            <option disabled value="">Select a Category</option>
            {Object.keys(this.props.categories).length !== 0 ?
              this.props.categories.sort((a,b) => b.id - a.id).map(category => {
                 return (category.name === "Uncategorized" ?
                  <option key={category.id} value={category.id} disabled>Uncategorized</option> :
                  <option key={category.id} value={category.id}>{category.name}</option>)
              }) : null}
            <option value="Add Category">Add Category</option>
            </select>
        </div>
            {/*<CategoryAdd user={this.props.currentUser} addTrue={this.state.name} name="name" addCategory={this.props.addCategory} onChange={this.onChange}/>*/}
        </>
        )
  };

   render() {
        return(
        <>
            {this.display()}
        </>)
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories
    }
}

const mapDispatchToProps =(dispatch) => {
    return {
        getCategories: (user) => dispatch(getCategories(user))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Categories2);