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
const alipayAPI = (id) => {
  return utils_http.http({
    url: "/index/alipay/" + id,
    method: "get"
  });
};
const getMyOrderAPI = (data) => {
  return utils_http.http({
    url: "/index/order/my",
    method: "get",
    data
  });
};
const iReceiveOrderAPI = (id) => {
  return utils_http.http({
    url: "/index/order/receive/my/" + id,
    method: "put"
  });
};
const iReturnOrderAPI = (id) => {
  return utils_http.http({
    url: "/index/order/return/my/" + id,
    method: "put"
  });
};
exports.addOrderAPI = addOrderAPI;
exports.alipayAPI = alipayAPI;
exports.cancelOrderAPI = cancelOrderAPI;
exports.getMyOrderAPI = getMyOrderAPI;
exports.getOrderAPI = getOrderAPI;
exports.iReceiveOrderAPI = iReceiveOrderAPI;
exports.iReturnOrderAPI = iReturnOrderAPI;
