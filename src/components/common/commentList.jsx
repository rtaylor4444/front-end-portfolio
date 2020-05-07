import React from "react";

function renderComments(comments) {
  return (
    <React.Fragment>
      {comments.map((c) => (
        <div key={c._id} className="commentList__comment">
          <p className="commentList__comment__heading">{`${c.author}`}</p>
          <p>{`/*${c.message}*/`}</p>
        </div>
      ))}
    </React.Fragment>
  );
}

function renderEmpty() {
  return (
    <p className="u-center-text commentList__comment__heading">{`Be the first to make a comment!`}</p>
  );
}
const CommentList = (props) => {
  const { comments } = props;
  return (
    <div className="commentList">
      <h1 className="u-center-text u-color-green">Comments</h1>
      {comments.length > 0 ? renderComments(comments) : renderEmpty()}
    </div>
  );
};

export default CommentList;
