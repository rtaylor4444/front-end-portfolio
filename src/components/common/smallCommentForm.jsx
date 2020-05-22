import React from "react";
import Form from "./form";
import Joi from "joi-browser";

class SmallCommentForm extends Form {
  state = { data: { message: "" }, errors: {} };
  schema = {
    message: Joi.string().required().label("Message").max(255),
  };

  componentDidMount() {
    this.setState({ data: { message: this.props.message } });
  }

  doSubmit = async () => {
    const errors = await this.props.OnSubmit(this.state.data.message);
    if (errors) this.setState({ errors });
  };

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form__group">
            {this.renderFormError()}
            {this.renderTextArea(this.props.label, "message")}
            {this.renderButton("Submit")}
          </div>
        </form>
      </div>
    );
  }
}

export default SmallCommentForm;
