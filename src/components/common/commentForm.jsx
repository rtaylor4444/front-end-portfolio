import React from "react";
import Form from "./form";
import Joi from "joi-browser";

class CommentForm extends Form {
  state = { data: { message: "" }, errors: {} };
  schema = {
    message: Joi.string().required().label("Message").max(255),
  };

  doSubmit = async () => {
    const errors = await this.props.OnSubmit({
      message: this.state.data.message,
    });
    if (errors) this.setState({ errors });
    this.setState({
      data: { message: "" },
    });
  };

  renderUnavailable() {
    return (
      <h1 className="u-center-text">You must be logged in to make a comment</h1>
    );
  }

  renderFormContent() {
    return (
      <React.Fragment>
        <h1 className="u-center-text">Make a comment</h1>
        {this.renderFormError()}
        {this.renderTextArea("Message", "message")}
        {this.renderButton("Submit")}
      </React.Fragment>
    );
  }

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form__group">
            {this.props.user
              ? this.renderFormContent()
              : this.renderUnavailable()}
          </div>
        </form>
      </div>
    );
  }
}

export default CommentForm;
