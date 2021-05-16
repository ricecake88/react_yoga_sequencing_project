import React, { Component} from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
//import SeqFormNew from '../components/sequences/SeqFormNew';
import SeqListNew from '../components/sequences/SeqListNew';
import { getSequences, deleteSequence} from '../actions/sequences'
import { getCategories } from '../actions/categories';
import { getPoses } from '../actions/poses';
import LoadingSpinner from '../components/LoadingSpinner';
import Error from '../components/errors/Error';

// TO-DO: Add in categories and select sequence by category
class SeqListContainer extends Component {

    state = {
        isLoaded: false
    }

    componentDidMount = () => {
        //this.props.getPoses()
        //.catch(err => console.log(err));
        this.props.getSequences(this.props.auth.currentUser)
        .catch(err => console.log(err));
        //this.props.getCategories(this.props.auth.currentUser)
        //.catch(err => console.log(err));
        this.setState({
            isLoaded: true
        })
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    onDelete = (id) => {
        this.props.deleteSequence(id)
        .catch(err => console.log(err))
      }

    render() {

        const { isLoaded } = this.state;
        return (
            isLoaded ?
            <>
                <h1>Sequences <NavLink className="link no-ul" to="/sequences/add"><span title="New Sequence">+</span></NavLink></h1>
                <Error error={this.props.error}/>
                    <SeqListNew 
                        //poses={this.props.poses}
                        //sequences={this.props.sequences}
                        //categories={this.props.categories}
                        onDelete={this.onDelete}/>
                    </>
            : <LoadingSpinner />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        //poses: state.poses.poses,
        //sequences: state.sequences.sequences,
        //categories: state.categories.categories,
        //loggedIn: state.auth.loggedIn,
        auth: state.auth,
        error: state.error.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        //getPoses: () => dispatch(getPoses()),
        getSequences: (user) => dispatch(getSequences(user)),
        //getCategories: (user) => dispatch(getCategories(user)),
        deleteSequence: (id) => dispatch(deleteSequence(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeqListContainer);