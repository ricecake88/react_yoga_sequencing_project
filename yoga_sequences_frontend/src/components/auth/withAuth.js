import React from "react";
import { connect } from "react-redux";
import { checkAuth } from "../../actions/auth";
import LoadingSpinner from "../LoadingSpinner";
import Login from "./Login";
import { clearErrorMessage } from "../../actions/errors";
import Error from "../errors/Error"

function withAuth(WrappedComponent) {
  class Wrapper extends React.Component {
    componentDidMount() {
      this.props.dispatchCheckAuth();
    }

    render() {
      if (!this.props.authChecked) {
        return <LoadingSpinner />;
      } else if (!this.props.loggedIn) {
        return (
          <div className="genericContainer">
            <Login />
            <p>You need to login to view this page.</p>
            <Error error={this.props.error} />
          </div>
        );
      } else {
        return <WrappedComponent {...this.props} />;
      }
    }
  }

  const mapStateToProps = (state) => {
    return {
      authChecked: state.auth.authChecked,
      loggedIn: state.auth.loggedIn,
      currentUser: state.auth.currentUser,
      error: state.error.error

    }

  }

  // const mapStateToProps = ({
  //   auth: { authChecked, loggedIn, currentUser }
  //     }) => {
  //       return { authChecked, loggedIn, currentUser };
  //   };

  const mapDispatchToProps = (dispatch) => {
    return {
      dispatchCheckAuth: () => dispatch(checkAuth()),
      clearErrorMessage: () => dispatch(clearErrorMessage())
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(Wrapper);
}

export default withAuth;