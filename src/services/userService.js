//import http from "./httpService";
//import config from "../config.json";

//BUG - There is no service so just return a new mapped object

export function register(user) {
  /*return http.post(config.userEndPoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });*/
  return { email: user.username, password: user.password };
}
