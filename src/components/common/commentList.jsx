import React, { Component } from "react";
import auth from "../../services/authService";
import SmallCommentForm from "../common/smallCommentForm";

function getAdminModifier(isAdmin) {
  return isAdmin ? " commentList__comment--admin" : "";
}
function getEditedText(isEdited) {
  return isEdited ? " (Edited)" : "";
}

class CommentList extends Component {
  state = { formPosition: -1, curReplyList: null };
  count = 0;
  formLabel;
  currentCommentOperation;

  onClickEvent(label, func, pos, replyList) {
    const { formPosition, curReplyList } = this.state;
    this.formLabel = label;
    this.currentCommentOperation = async (params) => {
      const errors = await func(params);
      //Remove replyList once any form is successfully submitted
      if (!errors) this.setState({ curReplyList: null });
    };

    //pos must be different if there is already a pending post reply form
    //and the formPosition is lower than the new current request
    if (curReplyList && formPosition < pos) pos -= 1;

    //Undo Post reply request if it exists
    if (curReplyList) curReplyList.pop();

    this.setState({ formPosition: pos, curReplyList: replyList });
  }

  renderFormContent(c, params) {
    this.count += 1;
    return (
      <SmallCommentForm
        message={c.message}
        label={this.formLabel}
        OnSubmit={async (newMessage) => {
          params.message = newMessage;
          const errors = await this.currentCommentOperation(params);
          if (!errors) this.setState({ formPosition: -1 });
          return errors;
        }}
      />
    );
  }

  renderCommentContent(c, isReply, params) {
    const user = auth.getCurrentUser();
    this.count += 1;
    const count = this.count;
    return (
      <React.Fragment>
        <p className="commentList__comment__heading">{`${
          c.author
        }${getEditedText(c.isEdited)}`}</p>
        <p className="commentList__comment__message">{`/*${c.message}*/`}</p>
        {user && user.name === c.author && (
          <div
            className="commentList__comment__options"
            onClick={() => {
              isReply
                ? this.onClickEvent(
                    "Edit your reply",
                    this.props.editReply,
                    count - 1
                  )
                : this.onClickEvent(
                    "Edit your comment",
                    this.props.editComment,
                    count - 1
                  );
            }}
          >
            Edit
          </div>
        )}
        {user && !isReply && (
          <div
            className="commentList__comment__options"
            onClick={() => {
              c.replies.push({ _id: c.replies.length, message: "" });
              this.onClickEvent(
                "Reply to this comment",
                this.props.postReply,
                count + c.replies.length - 1,
                c.replies
              );
            }}
          >
            Reply
          </div>
        )}
        {user && user.isAdmin && (
          <div
            className="commentList__comment__options"
            onClick={() => {
              isReply
                ? this.props.deleteReply(params)
                : this.props.deleteComment(params);
            }}
          >
            Delete
          </div>
        )}
      </React.Fragment>
    );
  }

  renderComment(c, isReply, params) {
    const { formPosition } = this.state;
    return (
      <div
        key={c._id}
        className={"commentList__comment" + getAdminModifier(c.isAdmin)}
      >
        {formPosition === this.count
          ? this.renderFormContent(c, params)
          : this.renderCommentContent(c, isReply, params)}
        {c.replies &&
          c.replies.map((r, replyIndex) =>
            this.renderComment(r, true, { ...params, replyIndex })
          )}
      </div>
    );
  }

  renderEmpty() {
    return (
      <p className="u-center-text commentList__comment__heading">{`Be the first to make a comment!`}</p>
    );
  }

  render() {
    const { comments } = this.props;
    this.count = 0;
    return (
      <React.Fragment>
        <div className="commentList">
          <h1 className="u-center-text u-color-green">Comments</h1>
          {comments && comments.length > 0
            ? comments.map((c, commentIndex) =>
                this.renderComment(c, false, { commentIndex })
              )
            : this.renderEmpty()}
        </div>
      </React.Fragment>
    );
  }
}

export default CommentList;
