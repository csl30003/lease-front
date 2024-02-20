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
exports.collectionAPI = collectionAPI;
exports.isCollectionAPI = isCollectionAPI;
