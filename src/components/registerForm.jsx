import React from "react";
import { Redirect, Link } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";
import errorHandler from "../services/errorHandler";

class RegisterForm extends Form {
  state = { data: { email: "", password: "", name: "" }, errors: {} };

  schema = {
    email: Joi.string().required().label("Email").email(),
    password: Joi.string().required().label("Password").min(5),
    name: Joi.string().required().label("Name").min(3).max(50),
  };

  doSubmit = async () => {
    //Call the server
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"], this.props.history);
    } catch (exception) {
      const errors = { ...this.state.errors };
      errors.general = "Something unexpected happened try again later.";
      errorHandler.handleLoginError(exception, errors);
      this.setState({ errors });
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
            {this.renderFormError()}
            {this.renderInput("Email", "email")}
            {this.renderInput("Password", "password", "password")}
            {this.renderInput("Name", "name")}
            {this.renderButton("Register")}
            <p className="form__info">
              Already have an account? If so login{" "}
              <Link to="/login">here.</Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
