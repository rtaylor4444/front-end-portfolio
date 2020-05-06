import http from "./httpService";
import config from "../config.json";

export function register(user) {
  return http.post(config.userEndPoint, {
    email: user.email,
    password: user.password,
    name: user.name,
  });
}
