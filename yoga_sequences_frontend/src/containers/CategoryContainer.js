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
        //console.log(">>>CategoryContainer -> componentDidMount")
        //console.log(this.props)

        //retrieve all the categories
        this.props.getCategories(this.props.user);

        // once categories are retrieved then set state to
        // isLoaded
        this.setState({
           isLoaded: true
        })
    }

    addCategory = (category) => {
        // dispatch add category
        // category is string
        this.props.addCategory(category)
    }

    render() {
        //console.log(">>>CategoryContainer -> render")
        //console.log(this.props.categories)
        //console.log("After categories")
        return this.state.isLoaded ?
                <div className="genericContainer">
                    <div className="genericInnerContainer">
                        {this.props.errors.map((error,index) => <div key={index}>{error}</div>)}
                        <CategoryAdd addCategory={this.addCategory} />
                        <CategoryList categories={this.props.categories} deleteCategory={this.props.deleteCategory} user={this.props.user}/>
                    </div>
                </div>
            : <LoadingSpinner />
    }
}

const mapStateToProps = (state) => {
    console.log(">>CategoryContainer -> mapStateToProps");
    console.log(state);
    return {
        categories: state.categories.categories,
        user: state.auth.currentUser,
        errors: state.categories.errors
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