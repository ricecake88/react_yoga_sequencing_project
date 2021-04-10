import React, { Component }from 'react';
import { connect } from 'react-redux';
import CategoryList from '../components/categories/CategoryList'
import { getCategories, deleteCategory } from '../actions/categories';

class CategoryContainer extends Component {

    componentDidMount = () => {
        console.log(">>>CategoryContainer -> componentDidMount")
        console.log(this.props)
         this.props.getCategories(this.props.user);
    }

    render() {
        console.log(">>>CategoryContainer -> render")
        console.log(this.props.categories)
        console.log("After categories")
        return <div>
            ==ADD A CATEGORY STILL NEEDS TO BE DONE ==<br/>
            <CategoryList categories={this.props.categories} delete={this.props.deleteCategory} user={this.props.user}/>
        </div>
    }
}

const mapStateToProps = (state) => {
    console.log(">>CategoryContainer -> mapStateToProps");
    console.log(state);
    return {
        categories: state.categories.categories,
        user: state.auth.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: (user) => dispatch(getCategories(user)),
        deleteCategory: (user) => dispatch(deleteCategory(user))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (CategoryContainer);