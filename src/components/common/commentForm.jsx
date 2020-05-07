import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import CommentList from "./commentList";

class CommentForm extends Form {
  state = { data: { message: "" }, errors: {} };

  schema = {
    message: Joi.string().required().label("Message"),
  };

  doSubmit = () => {
    //BUG - we need to call the server instead
    let comments = { ...this.props.comments };
    const { user } = this.props;
    this.props.setComments((comments) => [
      ...comments,
      {
        _id: comments.length,
        author: user.name,
        isAdmin: user.isAdmin,
        message: this.state.data.message,
        date: Date.now(),
        replies: [],
      },
    ]);
    this.setState({ data: { message: "" } });
  };

  renderUnavailable() {
    return <h1>You must be logged in to make a comment</h1>;
  }

  renderFormContent() {
    return (
      <React.Fragment>
        {this.renderFormError()}
        {this.renderTextArea("Message", "message")}
        {this.renderButton("Submit")}
      </React.Fragment>
    );
  }

  render() {
    //BUG - Prop drilling use context instead
    const { comments, user } = this.props;
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <h1 className="u-center-text">Make a comment</h1>
          <div className="form__group">
            {user ? this.renderFormContent() : this.renderUnavailable()}
            <CommentList comments={comments} />
          </div>
        </form>
      </div>
    );
  }
}

export default CommentForm;
