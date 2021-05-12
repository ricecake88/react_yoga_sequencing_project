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
        //console.log(">>>CategoryContainer -> componentDidMount")
        //console.log(this.props)

        //retrieve all the categories
        this.props.getCategories(this.props.auth.currentUser);

        // once categories are retrieved then set state to
        // isLoaded
        this.setState({
           isLoaded: true,
        })
    }

    addCategory = (category) => {
        // dispatch add category
        // category is string
        this.props.addCategory(category)
    }

    onClick = () => {
        this.props.clearErrors();
    }

    render() {
        console.log(">>>CategoryContainer -> render")
        //console.log(this.props.categories)
        //console.log("After categories")
        console.log(this.props)
        return (
            this.state.isLoaded && !this.state.requesting ?
                <div className="genericContainer">
                    <div className="genericInnerContainer" onClick={this.onClick}>
                        {/*his.props.errors.map((error,index) => <Error key={index} error={error}/>)*/}
                        <Error error={this.props.error}/>
                        <CategoryAdd addCategory={this.addCategory} />
                        <CategoryList categories={this.props.categories} deleteCategory={this.props.deleteCategory} user={this.props.user}/>
                     </div>
                 </div>
            : <LoadingSpinner />
        )
    }
}

const mapStateToProps = (state) => {
    console.log(">>CategoryContainer -> mapStateToProps");
    console.log(state);
    return {
        categories: state.categories.categories,
        //user: state.auth.currentUser,
        error: state.error.error,
        auth: state.auth,
        //errors: state.categories.errors,
        //global_errors: state.errors
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