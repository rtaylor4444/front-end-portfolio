//import http from "./httpService";
import config from "../config.json";
//Installed for future use
//import jwtDecode from "jwt-decode";

//BUG - There is no service so just place the user
//in local storage (UNSAFE)
//http.setJwt(getJwt());

export /*async*/ function login(email, password) {
  /*const { data: jwt } = await http.post(config.authEndPoint, {
    email,
    password
  });*/
  loginWithJwt({ email, password });
}

export function loginWithJwt(jwt) {
  localStorage.setItem(config.tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(config.tokenKey);
}

export function getJwt() {
  return localStorage.getItem(config.tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = getJwt();
    return jwt; //jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
