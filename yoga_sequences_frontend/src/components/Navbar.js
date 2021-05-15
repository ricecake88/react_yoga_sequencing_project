import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Logout from './auth/Logout';
import { checkAuth } from '../actions/auth';
import { clearErrorMessage } from '../actions/errors'


class Navbar extends React.Component {
  componentDidMount() {
    this.props.dispatchCheckAuth();
  }
  onClick = () => {
    this.props.clearErrorMessage();
  }
  renderAuthLinks() {
    console.log(this.props);
    const { authChecked, loggedIn, currentUser } = this.props;
    if (authChecked) {
      return loggedIn ? (
        <>
          <NavLink exact to='/sequences/add'
           className='authLink link no-ul'>
           +
         </NavLink>
          <NavLink exact to='/categories'
           className='authLink link no-ul'>
            Categories
         </NavLink>
          <NavLink exact to='/sequences'
           className='authLink link no-ul'
          >
            Sequences
          </NavLink>
          {currentUser.email}
          <Logout />
        </>
      ) : (
        <>
          <NavLink
            className='p-4 inline-block link'
            activeClassName='text-blue-900'
            exact
            to='/signup'
          >
            Sign Up
          </NavLink>
          <NavLink

            className='p-4 inline-block link'
            activeClassName='text-blue-900'
            exact
            to='/login'
          >
            Log In
          </NavLink>
        </>
      );
    } else {
      return null
    }
  }
render() {
  return (
    <nav className='navbar' onClick={this.onClick}>
      <div className='navbarContainer'>
        <div className='openLinks'>
          <NavLink
            //className='p-4 block sm:inline-block'
            //activeClassName='text-blue-900'
            className="openLink link no-ul"
            activeClassName="activeLink"
            exact
            to='/'
          >
            Normal Route
          </NavLink>

          <NavLink
            className="openLink link no-ul"
            activeClassName="activeLink link"
            exact to='/poses'>
            Poses
          </NavLink>
        </div>
        <div className='authLinks link'>
          {this.renderAuthLinks()}
        </div>
      </div>
    </nav>
  );
}
}

const mapStateToProps = ({ auth: { authChecked, loggedIn, currentUser } }) => {
  return { authChecked, loggedIn, currentUser };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchCheckAuth: () => dispatch(checkAuth()),
    clearErrorMessage: () => dispatch(clearErrorMessage())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);