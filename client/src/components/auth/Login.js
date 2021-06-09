import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/auth";
import { clearErrorMessage } from "../../actions/errors"

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    error: false
  };

  handleChange = (event) => {
    this.props.clearErrorMessage();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props
      .dispatchLoginUser({ email, password })
      .then(() => this.props.history.push("/"))
      .catch(() => this.setState({ error: true }));
  };

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state,callback)=>{
        return;
    };
}
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Log In</h1>
        <p>{this.state.error && "Invalid email or password"}</p>
        <fieldset>
          <label htmlFor='email'>
            Email:
          </label>
          <input
            type='text'
            name='email'
            id='email'
            placeholder="name@domain.com"
            onChange={this.handleChange}
            value={this.state.email}
          /><br/>
          <label htmlFor='password'>
            Password:
          </label>
          <input
            type='password'
            name='password'
            id='password'
            onChange={this.handleChange}
            value={this.state.password}
          /><br/>
        </fieldset>            
        <input
          type='submit'
          value='Log In'
        />      
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLoginUser: (credentials) => dispatch(loginUser(credentials)),
    clearErrorMessage: () => dispatch(clearErrorMessage())
  };
};

export default connect(null, mapDispatchToProps)(Login);