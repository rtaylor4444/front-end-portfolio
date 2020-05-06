import axios from "axios";

axios.interceptors.response.use(null, (error) => {
  const { response } = error;
  const expectedError =
    response && response.status >= 400 && response.status < 500;

  if (!expectedError) {
    console.log("An unexpected error occured.");
  }
  return Promise.reject(error);
});

export function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwt,
};
