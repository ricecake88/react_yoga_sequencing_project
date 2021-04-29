import React, { Component }from 'react';
import { connect } from 'react-redux';
import CategoryList from '../components/categories/CategoryList'
import { getCategories, deleteCategory, addCategory } from '../actions/categories';
import LoadingSpinner from '../components/LoadingSpinner';
import CategoryAdd from '../components/categories/CategoryAdd';

class CategoryContainer extends Component {

    state = {
        isLoaded: false
    }

    componentDidMount = () => {
        console.log(">>>CategoryContainer -> componentDidMount")
        console.log(this.props)
         this.props.getCategories(this.props.user);
         this.setState({
             isLoaded: true
         })
    }

    addCategory = (category) => {
        this.props.addCategory(category)
    }

    render() {
        console.log(">>>CategoryContainer -> render")
        console.log(this.props.categories)
        console.log("After categories")
        return this.state.isLoaded ? <div>
            <CategoryAdd addCategory={this.addCategory} />
            <CategoryList categories={this.props.categories} deleteCategory={this.props.deleteCategory} user={this.props.user}/>
        </div> : <LoadingSpinner />
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
        deleteCategory: (user) => dispatch(deleteCategory(user)),
        addCategory: (category) => dispatch(addCategory(category))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (CategoryContainer);