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
const iSolveOrderAPI = (id) => {
  return utils_http.http({
    url: "/index/order/solve/" + id,
    method: "put"
  });
};
const getMyReleaseOrderAPI = (data) => {
  return utils_http.http({
    url: "/index/order/his",
    method: "get",
    data
  });
};
const heDeliveryOrderAPI = (id) => {
  return utils_http.http({
    url: "/index/order/delivery/his/" + id,
    method: "put"
  });
};
const heReceiveOrderAPI = (id) => {
  return utils_http.http({
    url: "/index/order/receive/his/" + id,
    method: "put"
  });
};
const heInspectOrderHasProblemAPI = (id) => {
  return utils_http.http({
    url: "/index/order/inspect/problem/his/" + id,
    method: "put"
  });
};
const heInspectOrderWithoutProblemAPI = (id) => {
  return utils_http.http({
    url: "/index/order/inspect/ok/his/" + id,
    method: "put"
  });
};
const getOrderCountAPI = () => {
  return utils_http.http({
    url: "/index/order/count",
    method: "get"
  });
};
exports.addOrderAPI = addOrderAPI;
exports.cancelOrderAPI = cancelOrderAPI;
exports.getMyOrderAPI = getMyOrderAPI;
exports.getMyReleaseOrderAPI = getMyReleaseOrderAPI;
exports.getOrderAPI = getOrderAPI;
exports.getOrderCountAPI = getOrderCountAPI;
exports.heDeliveryOrderAPI = heDeliveryOrderAPI;
exports.heInspectOrderHasProblemAPI = heInspectOrderHasProblemAPI;
exports.heInspectOrderWithoutProblemAPI = heInspectOrderWithoutProblemAPI;
exports.heReceiveOrderAPI = heReceiveOrderAPI;
exports.iReceiveOrderAPI = iReceiveOrderAPI;
exports.iReturnOrderAPI = iReturnOrderAPI;
exports.iSolveOrderAPI = iSolveOrderAPI;
