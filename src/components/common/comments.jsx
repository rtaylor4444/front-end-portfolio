import React from "react";
import auth from "../../services/authService";

function renderUnavailable() {
  return <h1>You must be logged in to make a comment</h1>;
}

function renderContent() {
  return null;
}

const Comments = () => {
  const user = auth.getCurrentUser();
  if (!user) return renderUnavailable();
  return renderContent();
};

export default Comments;
