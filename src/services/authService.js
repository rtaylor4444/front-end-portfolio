import http from "./httpService";
import config from "../config";
import jwtDecode from "jwt-decode";

const userEndPoint = config.userEndPoint;
let navbarUpdateUser;
let passwordRecIndex;
let enteredEmail;

//Gets called incase user is already logged in
http.setJwt(getJwt());

//BUG - function to be moved to its own module
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
  http.setJwt(jwt);
  navbarUpdateUser(getCurrentUser());
  goBackInSite(history);
}

export async function recoverPasswordReq(email) {
  enteredEmail = email;
  const { data } = await http.post(userEndPoint + "/recover", { email });
  passwordRecIndex = data.index;
}

export async function resetPassword(code, password) {
  await http.post(userEndPoint + "/reset", {
    email: enteredEmail,
    index: passwordRecIndex,
    code,
    password,
  });
}

export function logout() {
  localStorage.removeItem(config.tokenKey);
  http.setJwt(getJwt());
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
  recoverPasswordReq,
  resetPassword,
  getCurrentUser,
  getJwt,
  setNavBarUpdate,
  goBackInSite,
};
