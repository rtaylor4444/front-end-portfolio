import http from "./httpService";
import config from "../config.json";

export function register(user) {
  return http.post(config.userEndPoint, {
    email: user.email,
    password: user.password,
    name: user.name,
  });
}

export function postComment(user, message) {
  return http.post(config.commentEndPoint, {
    name: user.name,
    message: message,
  });
}
