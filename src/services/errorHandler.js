const generalError = "Something unexpected happened try again later.";
const UnavailableService = "Service is unavailable try again later.";

export function handleError(ex, errors) {
  errors.general = generalError;
  //Handle if user is already registered or incorrect credentials for login
  if (ex.response) errors.general = ex.response.data;
  //Handle server error
  else if (ex.response && ex.response.status === 500) {
    errors.general = UnavailableService;
  }
  return errors;
}
export function handleLoginError(ex, errors) {
  errors.general = generalError;
  //Handle if user is already registered or incorrect credentials for login
  if (ex.response && ex.response.status === 400) {
    errors.general = ex.response.data;
  }
  //Handle server error
  else if (ex.response && ex.response.status === 500) {
    errors.general = UnavailableService;
  }
  return errors;
}

export function handleCommentError(ex, errors) {
  errors.general = generalError;
  //Handle server error
  if (ex.response && ex.response.status === 500) {
    errors.general = UnavailableService;
  }
  return errors;
}
export function handleBlogError(ex, errors) {
  return handleError(ex, errors);
}

export default {
  handleLoginError,
  handleCommentError,
  handleBlogError,
};
