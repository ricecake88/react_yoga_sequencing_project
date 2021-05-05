import React, { Component} from 'react';
import { connect } from 'react-redux';
import { NavLink, BrowserRouter, Router, Route, Switch } from "react-router-dom";
//import SeqFormNew from '../components/sequences/SeqFormNew';
import SeqListNew from '../components/sequences/SeqListNew';
import { getSequences, deleteSequence} from '../actions/sequences'
import { getCategories } from '../actions/categories';
import { getPoses } from '../actions/poses';
import LoadingSpinner from '../components/LoadingSpinner';


class SeqNewContainer extends Component {

    state = {
        isLoaded: false
    }

    componentDidMount = () => {
        this.props.getPoses();
        this.props.getSequences(this.props.user);
        this.props.getCategories(this.props.user);
        this.setState({
            isLoaded: true
        })
    }


    render() {
        console.log(">>>SeqContainer->render()")
        console.log(this.props.poses)
        console.log(this.props.sequences)
        const { isLoaded } = this.state;
        return (
            isLoaded ?
            <div>
                {/*<SeqForm route={"Add"} />*/}
                <SeqListNew poses={this.props.poses} sequences={this.props.sequences} categories={this.props.categories}/>
                <NavLink className="link" to="/sequences/add">Create New Sequence</NavLink>
            </div> : <LoadingSpinner />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        poses: state.poses.poses,
        sequences: state.sequences.sequences,
        user: state.auth.currentUser,
        categories: state.categories.categories
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getPoses: () => dispatch(getPoses()),
        getSequences: (user) => dispatch(getSequences(user)),
        getCategories: (user) => dispatch(getCategories(user)),


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeqNewContainer);