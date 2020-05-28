import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import errorHandler from "../services/errorHandler";

class PasswordRecoverForm extends Form {
  state = {
    data: { email: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().label("Email").email(),
  };

  //BUG - needs refactoring
  setErrors(ex) {
    const errors = { ...this.state.errors };
    errorHandler.handleLoginError(ex, errors);
    this.setState({ errors });
  }

  doSubmit = async () => {
    try {
      await auth.recoverPasswordReq(this.state.data.email);
      this.props.history.push("/reset");
    } catch (exception) {
      this.setErrors(exception);
    }
  };

  render() {
    return (
      <div>
        <h1 className="u-center-text">Recover Password</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form__group">
            {this.renderFormError()}
            <p className="form__info">
              Use this form to send a link to your email which can be used to
              reset your password.
            </p>
            {this.renderInput("Email", "email")}
            {this.renderButton("Send")}
          </div>
        </form>
      </div>
    );
  }
}

export default PasswordRecoverForm;
