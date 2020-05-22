const generalError = "Something unexpected happened try again later.";
const UnavailableService = "Service is unavailable try again later.";

export function handleLoginError(ex, errors) {
  errors.general = generalError;
  //Handle if user is already registered or incorrect credentials for login
  if (ex.response && ex.response.status === 400) {
    errors.email = ex.response.data;
    errors.general = "";
  }
  //Handle server error
  else if (ex.response && ex.response.status === 500) {
    errors.general = UnavailableService;
  }
  return errors;
}

export function handleCommentError(ex, errors) {
  errors.general = generalError;
  console.log(ex);
  //Handle server error
  if (ex.response && ex.response.status === 500) {
    errors.general = UnavailableService;
  }
  return errors;
}

export default {
  handleLoginError,
  handleCommentError,
};
