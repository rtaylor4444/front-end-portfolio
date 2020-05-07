import React from "react";
import { Link } from "react-router-dom";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/authService";
import emailJS from "emailjs-com";

class ContactForm extends Form {
  state = {
    data: { name: "", email: "", subject: "", message: "" },
    errors: {},
    success: false,
  };

  schema = {
    name: Joi.string().required().label("Name").min(3),
    email: Joi.string().required().label("Email").email(),
    subject: Joi.string().required().label("Subject").min(5),
    message: Joi.string().required().label("Message").min(20).max(200),
  };

  constructor(props) {
    super(props);
    const user = auth.getCurrentUser();
    if (!user) return;
    this.state.data.email = user.email;
    console.log(this.state, user.email);
  }

  doSubmit = async (e) => {
    //Send to my email
    const { data, errors } = this.state;
    var templateParams = {
      from_name: data.name,
      from_email: data.email,
      to_name: "Rob Taylor",
      subject: data.subject,
      message_html: data.message,
    };

    //BUG - store the user id as a environment variable
    let submitError,
      success = false;
    await emailJS
      .send(
        "default_service",
        "template_XkPYGIns",
        templateParams,
        "user_4hMpRw6wV5fbG9zYnNrlZ"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          success = true;
        },
        function (error) {
          console.log("FAILED...", error);
          submitError = error;
        }
      );

    if (submitError) {
      let tempErrors = { ...errors };
      tempErrors["contact"] = submitError.text;
      this.setState({ errors: tempErrors });
      return;
    }

    //Clear the form
    this.setState({
      data: { name: "", email: "", subject: "", message: "" },
      success,
    });
  };

  render() {
    const { errors, success } = this.state;
    return (
      <div>
        <h1 className="u-center-text">Contact Me</h1>
        <p className="u-center-text">
          Feel free to reach out to me if you find a bug in one of my projects,
          want to hire me, or simply make a request.
        </p>
        {errors["contact"] && this.renderError(errors)}
        {this.renderSuccess(errors["contact"], success)}
        {!errors["contact"] && !success && this.renderForm()}
      </div>
    );
  }

  renderSuccess(error, success) {
    if (error || !success) return null;
    return (
      <React.Fragment>
        <h1 className="u-margin-top-big u-center-text">Message Sent!</h1>
        <Link onClick={() => this.props.history.goBack()} to="/">
          <h2 className="u-margin-bottom-big u-center-text">
            (Return to Previous Page)
          </h2>
        </Link>
      </React.Fragment>
    );
  }
  renderError(errors) {
    return (
      <div>
        <div className="form__label--invalid">{errors["contact"]}</div>
        <Link to="/projects">Return to Projects Page</Link>
      </div>
    );
  }
  renderForm() {
    const user = auth.getCurrentUser();
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="form__group">
          {this.renderInput("Name", "name")}
          {!user && this.renderInput("Email", "email", "email")}
          {this.renderInput("Subject", "subject")}
          {this.renderTextArea("Message", "message")}
          {this.renderButton("Submit")}
        </div>
      </form>
    );
  }
}

export default ContactForm;
