"use strict";
const utils_http = require("../utils/http.js");
const isCollectionAPI = (productID) => {
  return utils_http.http({
    url: "/index/collection/isCollection/" + productID,
    method: "get"
  });
};
const collectionAPI = (data) => {
  return utils_http.http({
    url: "/index/collection/addOrCancel",
    method: "post",
    data
  });
};
const getCollectionAPI = () => {
  return utils_http.http({
    url: "/index/collection",
    method: "get"
  });
};
exports.collectionAPI = collectionAPI;
exports.getCollectionAPI = getCollectionAPI;
exports.isCollectionAPI = isCollectionAPI;
