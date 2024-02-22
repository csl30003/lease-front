"use strict";
const utils_http = require("../utils/http.js");
const addOrderAPI = (data) => {
  return utils_http.http({
    url: "/index/order",
    method: "post",
    data
  });
};
const getOrderAPI = (id) => {
  return utils_http.http({
    url: "/index/order/" + id,
    method: "get"
  });
};
const cancelOrderAPI = (id) => {
  return utils_http.http({
    url: "/index/order/" + id,
    method: "delete"
  });
};
exports.addOrderAPI = addOrderAPI;
exports.cancelOrderAPI = cancelOrderAPI;
exports.getOrderAPI = getOrderAPI;
