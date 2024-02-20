"use strict";
const utils_http = require("../utils/http.js");
const getChatUserAPI = () => {
  return utils_http.http({
    url: "/index/message/user",
    method: "get"
  });
};
const getChatListAPI = (toId) => {
  return utils_http.http({
    url: "/index/message/list/" + toId,
    method: "get"
  });
};
const addMessageAPI = (data) => {
  return utils_http.http({
    url: "/index/message",
    method: "post",
    data
  });
};
exports.addMessageAPI = addMessageAPI;
exports.getChatListAPI = getChatListAPI;
exports.getChatUserAPI = getChatUserAPI;
