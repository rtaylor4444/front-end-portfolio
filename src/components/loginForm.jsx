import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import * as authService from "../services/authService";

class LoginForm extends Form {
  state = { data: { username: "", password: "" }, errors: {} };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  //Try to minimize ref usage it should be used to
  //1) Control focus of an element
  //2) Access 3rd party DOM libraries
  //3) Animations
  //username = React.createRef();

  //Bring focus to the the username element at the start
  //componentDidMount() {
  //  this.username.current.focus();
  //}

  doSubmit = async () => {
    //Call the server
    const { username: email, password } = this.state.data;
    try {
      await authService.login(email, password);
      //Use window.location for a full page refresh since
      //componentDidMount is only called once through the application lifecycle
      //this.props.history.push("/");
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (exception) {
      if (exception.response && exception.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = exception.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    //If we are logged in we should not be able to access this form
    if (authService.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1 className="u-center-text">Login</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form__group">
            {this.renderInput("Username", "username")}
            {this.renderInput("Password", "password", "password")}
            {this.renderButton("Login")}
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
