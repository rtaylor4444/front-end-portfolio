import React from "react";
import { Redirect, Link } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";
import errorHandler from "../services/errorHandler";

class ConfirmForm extends Form {
  state = { data: { code: "" }, errors: {} };

  schema = {
    code: Joi.string().required().label("Confirmation Code").min(24).max(24),
  };

  doResend = async () => {
    //Call the server
    try {
      await userService.resendCode();
    } catch (exception) {
      const errors = { ...this.state.errors };
      console.log(errors);
      errorHandler.handleLoginError(exception, errors);
      this.setState({ errors });
    }
  };

  doSubmit = async () => {
    //Call the server
    try {
      const response = await userService.confirm(this.state.data.code);
      auth.loginWithJwt(response.headers["x-auth-token"], this.props.history);
    } catch (exception) {
      const errors = { ...this.state.errors };
      errorHandler.handleLoginError(exception, errors);
      this.setState({ errors });
    }
  };

  render() {
    //If we are logged in we should not be able to access this form
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1 className="u-center-text">Confirm your email</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form__group">
            <p className="form__info">
              A confimation code has been sent to the email address that you
              have provided. Click
              <Link to="/confirm" onClick={this.doResend}>
                {" "}
                here
              </Link>{" "}
              to resend.
            </p>
            {this.renderFormError()}
            {this.renderInput("Confirmation Code", "code")}
            {this.renderButton("Submit")}
          </div>
        </form>
      </div>
    );
  }
}

export default ConfirmForm;
