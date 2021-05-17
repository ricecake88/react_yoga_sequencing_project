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
           className='link no-ul'
           activeClassName="activeLink"
           >
           +
         </NavLink>
          <NavLink exact to='/categories'
           className='link no-ul'
           activeClassName="activeLink"
           >
            Categories
         </NavLink>
          <NavLink exact to='/sequences'
           className='link no-ul'
           activeClassName="activeLink"
          >
            Sequences
          </NavLink>
          {currentUser.email}
          <Logout />
        </>
      ) : (
        <>
          <NavLink
            className='no-ul link'
            activeClassName='activeLink'
            exact
            to='/signup'
          >
            Sign Up
          </NavLink>
          <NavLink

            className='no-ul link'
            activeClassName='activeLink'
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
            className="link no-ul"
            activeClassName="activeLink"
            exact
            to='/'
          >
            Home
          </NavLink>

          <NavLink
            className="link no-ul"
            activeClassName="activeLink"
            exact to='/poses'>
            Poses
          </NavLink>
        </div>
        <div className='authLinks'>
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