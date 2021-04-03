import React from "react";
import { connect } from "react-redux";
import { signupUser } from "../../actions/auth";

class Signup extends React.Component {
  state = {
    email: "",
    password: "",
    errors: {status: {message: ""}}
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props
      .dispatchSignupUser({ email, password })
      .then(() => this.props.history.push("/"))
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <h1>Sign Up</h1>
        <p>{this.state.errors.status.message}</p>
        <fieldset>
          <label htmlFor='email'>
            Email:
          </label>
          <input
            type='text'
            name='email'
            id='email'
            onChange={this.handleChange}
            value={this.state.email}
          />
        </fieldset>
        <fieldset>
          <label htmlFor='password'>
            Password:
          </label>
          <input
            type='password'
            name='password'
            id='password'
            onChange={this.handleChange}
            value={this.state.password}
          />
        </fieldset>
        <input
          type='submit'
          value='Sign Up'
        />
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSignupUser: (credentials) => dispatch(signupUser(credentials))
  };
};

export default connect(null, mapDispatchToProps)(Signup);