import * as authService from "../services/authService";

const Logout = () => {
  authService.logout();
  window.location = "/";
  return null;
};

export default Logout;
