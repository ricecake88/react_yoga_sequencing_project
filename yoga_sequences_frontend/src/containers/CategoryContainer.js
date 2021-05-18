import React, { Component }from 'react';
import { connect } from 'react-redux';
import CategoryList from '../components/categories/CategoryList'
import { getCategories, deleteCategory, addCategory } from '../actions/categories';
import LoadingSpinner from '../components/LoadingSpinner';
import CategoryAdd from '../components/categories/CategoryAdd';
import Error from '../components/errors/Error';
import { clearErrorMessage } from '../actions/errors';

class CategoryContainer extends Component {

    state = {
        isLoaded: false,
    }

    componentDidMount = () => {
        //retrieve all the categories
        this.props.getCategories(this.props.auth.currentUser)
        .catch(err => console.log("getCategories -> " + err.error));

        // once categories are retrieved then set state to
        // isLoaded
        this.setState({
           isLoaded: true,
        })
    }

    addCategory = (category) => {
        this.props.addCategory(category)
        .catch(err => console.log("addCategory -> " + err.error));
    }

    onClick = () => {
        this.props.clearErrors();
    }
    
    render() {
        return (
            this.state.isLoaded && !this.state.requesting ?
                <div onClick={this.onClick}>
                    <h1 className="center">Categories</h1>
                    <Error error={this.props.error}/>
                    <CategoryAdd addCategoryCallback={this.addCategory} />
                    <CategoryList 
                        categories={this.props.categories} 
                        deleteCategory={this.props.deleteCategory} 
                        />
                 </div>
            : <LoadingSpinner />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories,
        error: state.error.error,
        auth: state.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: (user) => dispatch(getCategories(user)),
        deleteCategory: (user) => dispatch(deleteCategory(user)),
        addCategory: (category) => dispatch(addCategory(category)),
        clearErrors: () => dispatch(clearErrorMessage())
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (CategoryContainer);