import React from "react";
import { Redirect, Link } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import * as authService from "../services/authService";
import errorHandler from "../services/errorHandler";

class LoginForm extends Form {
  state = { data: { email: "", password: "" }, errors: {} };

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  setErrors(ex) {
    const errors = { ...this.state.errors };
    errorHandler.handleLoginError(ex, errors);
    this.setState({ errors });
  }

  doSubmit = async () => {
    //Call the server
    const { email, password } = this.state.data;
    try {
      await authService.login(email, password, this.props.history);
    } catch (exception) {
      this.setErrors(exception);
    }
  };

  renderRecovery() {
    const { history } = this.props;
    return (
      <React.Fragment>
        <h1 className="u-margin-top-big u-center-text">Recovery Email Sent!</h1>
        <Link onClick={() => history.push("/")} to="/">
          <h2 className="u-margin-bottom-big u-center-text">(Return Home)</h2>
        </Link>
      </React.Fragment>
    );
  }

  render() {
    //If we are logged in we should not be able to access this form
    if (authService.getCurrentUser()) return <Redirect to="/" />;
    if (this.state.recovery) return this.renderRecovery();
    return (
      <div>
        <h1 className="u-center-text">Login</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form__group">
            {this.renderFormError()}
            {this.renderInput("Email", "email")}
            {this.renderInput("Password", "password", "password")}
            {this.renderButton("Login")}
            <p className="form__info">
              Do you have an account? If not you need to register{" "}
              <Link to="/register">here.</Link>
            </p>
            <p className="form__info">
              Did you forget your password? Click{" "}
              <Link to="/recover">here</Link> to have a link sent to your email.
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
