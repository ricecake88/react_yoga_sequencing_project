import React, { Component }from 'react';
import { connect } from 'react-redux';
import YogaCategoryList from '../components/categories/YogaCategoryList'
import { getYogaCategories, deleteCategory } from '../actions/yogaCategories';

class YogaCategoryContainer extends Component {

    componentDidMount = () => {
        console.log(">>>YogaCategoryContainer -> componentDidMount")
        console.log(this.props)
         this.props.getCategories(this.props.user);
    }

    render() {
        console.log(">>>YogaCategoryContainer -> render")
        console.log(this.props.categories)
        console.log("After categories")
        return <div>
            ==ADD A CATEGORY STILL NEEDS TO BE DONE ==<br/>
            <YogaCategoryList categories={this.props.categories} delete={this.props.deleteCategory} user={this.props.user}/>
        </div>
    }
}

const mapStateToProps = (state) => {
    console.log(">>YogaCategoryContainer -> mapStateToProps");
    console.log(state);
    return {
        categories: state.yogaCategories.categories,
        user: state.auth.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: (user) => dispatch(getYogaCategories(user)),
        deleteCategory: (user) => dispatch(deleteCategory(user))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (YogaCategoryContainer);