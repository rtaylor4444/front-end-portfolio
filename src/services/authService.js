import http from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

http.setJwt(getJwt());
let navbarUpdateUser;

//BUG - function ot be moved to its own module
export function goBackInSite(history) {
  //If user was previously on this site go to the prev page
  //otherwise go home
  if (history.location.key) history.goBack();
  else history.push("/");
}

export async function login(email, password, history) {
  const { data: jwt } = await http.post(config.loginEndPoint, {
    email,
    password,
  });
  loginWithJwt(jwt, history);
}

export function loginWithJwt(jwt, history) {
  localStorage.setItem(config.tokenKey, jwt);
  navbarUpdateUser(getCurrentUser());
  goBackInSite(history);
}

export function logout() {
  localStorage.removeItem(config.tokenKey);
  navbarUpdateUser(undefined);
}

export function getJwt() {
  return localStorage.getItem(config.tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = getJwt();
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function setNavBarUpdate(func) {
  navbarUpdateUser = func;
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  setNavBarUpdate,
  goBackInSite,
};
