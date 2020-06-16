import config from "./config.json";

const getCurrentEndPoint = () => {
  if (process.env.NODE_ENV === `production`)
    return process.env.REACT_APP_PORTFOLIO_ENDPOINT;
  return `localhost:5000/`;
};

const getUserEndPoint = (apiEndpoint) => {
  return `${getCurrentEndPoint()}${apiEndpoint}`;
};

export default {
  userEndPoint: getUserEndPoint(config.userEndPoint),
  loginEndPoint: getUserEndPoint(config.loginEndPoint),
  commentEndPoint: getUserEndPoint(config.commentEndPoint),
  tokenKey: config.tokenKey,
};
