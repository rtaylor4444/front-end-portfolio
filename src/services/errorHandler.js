export function handleLoginError(ex, errors) {
  errors.general = "Something unexpected happened try again later.";
  //Handle if user is already registered or incorrect credentials for login
  if (ex.response && ex.response.status === 400) {
    errors.email = ex.response.data;
    errors.general = "";
  }
  //Handle server error
  else if (ex.response && ex.response.status === 500) {
    errors.general = "Service is unavailable try again later.";
  }
  return errors;
}

export default {
  handleLoginError,
};
