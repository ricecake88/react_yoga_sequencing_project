import React from "react";
import { connect } from "react-redux";

class ProtectedRoute extends React.Component {
  render() {
    return (
      <div>
        This is a protected route. It should only be visible to a user who is signed in.
      </div>
    );
  }
}

export default connect()(ProtectedRoute);