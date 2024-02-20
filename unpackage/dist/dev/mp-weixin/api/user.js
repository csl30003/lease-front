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
const getOtherUserInfoAPI = (id) => {
  return utils_http.http({
    url: "/index/getUserInfo/" + id,
    method: "get"
  });
};
const updateUserInfoAPI = (params) => {
  return utils_http.http({
    url: "/index/updateUser",
    method: "put",
    data: {
      name: params.name,
      phone: params.phone,
      country: params.country,
      province: params.province,
      city: params.city,
      district: params.district
    }
  });
};
exports.getOtherUserInfoAPI = getOtherUserInfoAPI;
exports.getUserInfoAPI = getUserInfoAPI;
exports.loginAPI = loginAPI;
exports.logoutAPI = logoutAPI;
exports.registerAPI = registerAPI;
exports.updateUserInfoAPI = updateUserInfoAPI;
