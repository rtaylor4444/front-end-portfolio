import config from "./config.json";

const getCurrentEndPoint = () => {
  if (process.env.NODE_ENV === `production`)
    return process.env.REACT_APP_PORTFOLIO_ENDPOINT;
  return `http://localhost:5000/`;
};

const getUserEndPoint = (apiEndpoint) => {
  return `${getCurrentEndPoint()}${apiEndpoint}`;
};

export default {
  userEndPoint: getUserEndPoint(config.userEndPoint),
  loginEndPoint: getUserEndPoint(config.loginEndPoint),
  commentEndPoint: getUserEndPoint(config.commentEndPoint),
  blogEndPoint: getUserEndPoint(config.blogEndPoint),
  blogImageEndPoint: getUserEndPoint(config.blogImageEndPoint),
  tokenKey: config.tokenKey,
  maxRecentBlogsDisplayed: config.maxRecentBlogsDisplayed,
};
