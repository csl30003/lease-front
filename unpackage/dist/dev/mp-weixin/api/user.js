"use strict";
const utils_http = require("../utils/http.js");
const loginAPI = (params) => {
  return utils_http.http({
    url: "/login",
    method: "post",
    data: {
      name: params.name,
      password: params.password
    }
  });
};
const registerAPI = (params) => {
  return utils_http.http({
    url: "/register",
    method: "post",
    data: {
      name: params.name,
      password: params.password
    }
  });
};
const logoutAPI = () => {
  return utils_http.http({
    url: "/index/logout",
    method: "post"
  });
};
const getUserInfoAPI = () => {
  return utils_http.http({
    url: "/index/getUserInfo",
    method: "get"
  });
};
exports.getUserInfoAPI = getUserInfoAPI;
exports.loginAPI = loginAPI;
exports.logoutAPI = logoutAPI;
exports.registerAPI = registerAPI;
