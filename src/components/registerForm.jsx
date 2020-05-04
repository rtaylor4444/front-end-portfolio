import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = { data: { username: "", password: "", name: "" }, errors: {} };

  schema = {
    username: Joi.string().required().label("Username").email(),
    password: Joi.string().required().label("Password").min(5),
    name: Joi.string().required().label("Name").min(3),
  };

  doSubmit = /*async*/ () => {
    //Call the server
    try {
      const response = /*await*/ userService.register(this.state.data);
      //auth.loginWithJwt(response.headers["x-auth-token"]);
      auth.loginWithJwt(response);
      //this.props.history.push("/");

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (exception) {
      //Handle if user is already registered
      if (exception.response && exception.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = exception.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    //If we are logged in we should not be able to access this form
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1 className="u-center-text">Register</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form__group">
            {this.renderInput("Username", "username")}
            {this.renderInput("Password", "password", "password")}
            {this.renderInput("Name", "name")}
            {this.renderButton("Register")}
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
