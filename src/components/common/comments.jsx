import React, { useState } from "react";
import auth from "../../services/authService";
import CommentForm from "./commentForm";

const Comments = () => {
  //BUG - Comments should be stored on the server
  const [comments, setComments] = useState([]);
  const user = auth.getCurrentUser();
  return (
    <React.Fragment>
      <CommentForm comments={comments} setComments={setComments} user={user} />
    </React.Fragment>
  );
};

export default Comments;
