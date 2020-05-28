import React from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import errorHandler from "../services/errorHandler";

class PasswordResetForm extends Form {
  state = {
    data: { code: "", password: "", passwordConfirm: "" },
    errors: {},
  };

  schema = {
    code: Joi.string().required().label("Confirmation Code").min(24).max(24),
    password: Joi.string().required().label("Enter Password").min(5),
    passwordConfirm: Joi.string().required().label("Re-enter Password").min(5),
  };

  //BUG - needs refactoring
  setErrors(ex) {
    const errors = { ...this.state.errors };
    errorHandler.handleLoginError(ex, errors);
    this.setState({ errors });
  }

  doSubmit = async () => {
    const { errors, data } = this.state;
    const { password, passwordConfirm, code } = data;
    if (password !== passwordConfirm) {
      errors.general = "The passwords must match";
      return this.setState({ errors });
    }

    try {
      await auth.resetPassword(code, password);
      this.setState({ submitted: true });
    } catch (exception) {
      this.setErrors(exception);
    }
  };

  renderSuccess() {
    return (
      <React.Fragment>
        <h1 className="u-margin-top-big u-center-text">Password Changed!</h1>
        <Link to="/login">
          <h2 className="u-margin-bottom-big u-center-text">
            (Return to Login)
          </h2>
        </Link>
      </React.Fragment>
    );
  }
  render() {
    if (this.state.submitted) return this.renderSuccess();
    return (
      <div>
        <h1 className="u-center-text">Recover Password</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form__group">
            {this.renderFormError()}
            {this.renderInput("Confirmation Code", "code")}
            {this.renderInput("Enter Password", "password", "password")}
            {this.renderInput(
              "Re-enter Password",
              "passwordConfirm",
              "password"
            )}
            {this.renderButton("Submit")}
          </div>
        </form>
      </div>
    );
  }
}

export default PasswordResetForm;
