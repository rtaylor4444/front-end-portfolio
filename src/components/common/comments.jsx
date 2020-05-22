import React, { Component } from "react";
import auth from "../../services/authService";
import * as userService from "../../services/userService";
import errorHandler from "../../services/errorHandler";
import CommentForm from "./commentForm";
import CommentList from "./commentList";

class Comments extends Component {
  state = { comments: [] };
  user = auth.getCurrentUser();

  async componentDidMount() {
    const comments = await userService.getComments(this.props.itemName);
    this.setState({ comments: comments.data });
  }

  async handleCommentErrors(previousCommentState, func) {
    let errors;
    try {
      await func();
    } catch (exception) {
      //Roll back changes if we get an error
      errors = errorHandler.handleCommentError(exception, { general: "" });
      this.setState({ comments: previousCommentState });
    }
    return errors;
  }

  createNewReply(id, message) {
    return {
      _id: id,
      author: this.user.name,
      isAdmin: this.user.isAdmin,
      message: message,
    };
  }

  createNewComment(id, message) {
    let comment = this.createNewReply(id, message);
    comment.replies = [];
    return comment;
  }

  postComment = async (params) => {
    //Optimistic Update
    const { comments } = this.state;
    const previousCommentState = comments;
    const newComment = this.createNewComment(comments.length, params.message);
    this.setState({
      comments: [...comments, newComment],
    });

    return await this.handleCommentErrors(previousCommentState, async () => {
      //Update our list based on the result
      const result = await userService.postComment(
        this.props.itemName,
        newComment
      );
      comments.push(result.data);
      this.setState({ comments });
    });
  };

  postReply = async (params) => {
    //Optimistic Update
    const { comments } = this.state;
    const previousCommentState = comments;
    const replyList = comments[params.commentIndex].replies;
    const newReply = this.createNewReply(replyList.length, params.message);
    replyList.pop();
    replyList.push(newReply);
    this.setState({ comments });

    return await this.handleCommentErrors(previousCommentState, async () => {
      //Update our list based on the result
      const result = await userService.postReply(
        this.props.itemName,
        comments[params.commentIndex]._id,
        newReply
      );
      replyList.pop();
      replyList.push(result.data);
      this.setState({ comments });
    });
  };

  editComment = async (params) => {
    //Optimistic Update
    const { comments } = this.state;
    const { commentIndex } = params;
    const previousCommentState = comments;

    //Deep copy
    const newComments = [...comments];
    newComments[commentIndex] = { ...newComments[commentIndex] };
    newComments[commentIndex].message = params.message;
    newComments[commentIndex].isEdited = true;

    this.setState({
      comments: newComments,
    });

    return await this.handleCommentErrors(previousCommentState, async () => {
      //Let server know we have updated the comment
      await userService.editComment(
        this.props.itemName,
        newComments[commentIndex]
      );
    });
  };

  editReply = async (params) => {
    //Optimistic Update
    const { comments } = this.state;
    const { commentIndex, replyIndex } = params;
    const previousCommentState = comments;

    //Deep copy
    const newComments = [...comments];
    const newReplyList = [...newComments[commentIndex].replies];
    newComments[commentIndex].replies = newReplyList;
    newReplyList[replyIndex].message = params.message;
    newReplyList[replyIndex].isEdited = true;

    this.setState({
      comments: newComments,
    });

    return await this.handleCommentErrors(previousCommentState, async () => {
      //Let server know we have updated the reply
      await userService.editReply(
        this.props.itemName,
        comments[commentIndex]._id,
        newReplyList[replyIndex]
      );
    });
  };

  deleteComment = async (params) => {
    //Optimistic Update
    const { comments } = this.state;
    const previousCommentState = [...comments];
    const commentToDelete = comments[params.commentIndex];
    comments.splice(params.commentIndex, 1);
    this.setState({
      comments,
    });

    return await this.handleCommentErrors(previousCommentState, async () => {
      await userService.deleteComment(this.props.itemName, commentToDelete);
    });
  };

  deleteReply = async (params) => {
    //Optimistic Update
    const { comments } = this.state;
    const { commentIndex, replyIndex } = params;
    const previousCommentState = [...comments];

    //Deep copy
    const currentComment = { ...comments[commentIndex] };
    const newReplyList = [...currentComment.replies];
    const replyToDelete = newReplyList[replyIndex];
    currentComment.replies = newReplyList;
    newReplyList.splice(replyIndex, 1);
    comments[commentIndex] = currentComment;
    this.setState({
      comments,
    });

    return await this.handleCommentErrors(previousCommentState, async () => {
      await userService.deleteReply(
        this.props.itemName,
        currentComment._id,
        replyToDelete
      );
    });
  };

  render() {
    const { comments } = this.state;
    return (
      <React.Fragment>
        <CommentForm user={this.user} OnSubmit={this.postComment} />
        <CommentList
          comments={comments}
          editComment={this.editComment}
          deleteComment={this.deleteComment}
          postReply={this.postReply}
          editReply={this.editReply}
          deleteReply={this.deleteReply}
        />
      </React.Fragment>
    );
  }
}

export default Comments;
