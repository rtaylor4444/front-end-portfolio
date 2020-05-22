import http from "./httpService";
import config from "../config.json";

export async function register(user) {
  return await http.post(config.userEndPoint, {
    email: user.email,
    password: user.password,
    name: user.name,
  });
}

export async function postComment(itemName, comment) {
  return await http.post(config.commentEndPoint + itemName, {
    author: comment.author,
    isAdmin: comment.isAdmin,
    message: comment.message,
  });
}

export async function postReply(itemName, commentId, reply) {
  return await http.post(config.commentEndPoint + itemName + "/" + commentId, {
    author: reply.author,
    isAdmin: reply.isAdmin,
    message: reply.message,
  });
}

export async function editComment(itemName, comment) {
  return await http.put(config.commentEndPoint + itemName, {
    _id: comment._id,
    author: comment.author,
    isAdmin: comment.isAdmin,
    message: comment.message,
  });
}

export async function editReply(itemName, commentId, reply) {
  return await http.put(config.commentEndPoint + itemName + "/" + commentId, {
    _id: reply._id,
    author: reply.author,
    isAdmin: reply.isAdmin,
    message: reply.message,
  });
}

export async function deleteComment(itemName, comment) {
  return await http.delete(config.commentEndPoint + itemName, {
    data: comment,
  });
}

export async function deleteReply(itemName, commentId, reply) {
  return await http.delete(
    config.commentEndPoint + itemName + "/" + commentId,
    {
      data: reply,
    }
  );
}

export async function getComments(itemName) {
  return await http.get(config.commentEndPoint + itemName);
}
