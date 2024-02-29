"use strict";
const utils_http = require("../utils/http.js");
const getTwoCommentAPI = (productId) => {
  return utils_http.http({
    url: "/comment/two/" + productId,
    method: "get"
  });
};
const getRootCommentAPI = (productId) => {
  return utils_http.http({
    url: "/comment/root/" + productId,
    method: "get"
  });
};
const getCommentListAPI = (commentId) => {
  return utils_http.http({
    url: "/comment/list/" + commentId,
    method: "get"
  });
};
const addCommentAPI = (data) => {
  return utils_http.http({
    url: "/index/comment",
    method: "post",
    data
  });
};
exports.addCommentAPI = addCommentAPI;
exports.getCommentListAPI = getCommentListAPI;
exports.getRootCommentAPI = getRootCommentAPI;
exports.getTwoCommentAPI = getTwoCommentAPI;
