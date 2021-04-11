import React, { Component } from 'react';


class Categories extends Component {


  onChange = (event) => {
    //console.log("Selected onChangeCategory");
     this.setState({
            [event.target.name]: event.target.value
        })
  }

  onSubmit = (event) => {
    event.preventDefault();
  }

  display() {
        //console.log(">>>Categories")
        //console.log(this.props.categories)
        //console.log(Object.keys(this.props.categories).length)
        return (
        <>
        {/*<select value={this.state.name} name="name" onChange={this.onChange}>*/}
            <option disabled value="">Select a Category</option>
            {Object.keys(this.props.categories).length !== 0 ? 
            this.props.categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)
            : null}
            <option value="Add Category">Add Category</option>
            {/*</select>*/}
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

export default Categories;