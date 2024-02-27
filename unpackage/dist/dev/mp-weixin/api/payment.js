"use strict";
const utils_http = require("../utils/http.js");
const alipayAPI = (id) => {
  return utils_http.http({
    url: "/index/alipay/" + id,
    method: "get"
  });
};
const getPaymentAPI = () => {
  return utils_http.http({
    url: "/index/payment",
    method: "get"
  });
};
const withdrawAPI = () => {
  return utils_http.http({
    url: "/index/withdraw",
    method: "post"
  });
};
exports.alipayAPI = alipayAPI;
exports.getPaymentAPI = getPaymentAPI;
exports.withdrawAPI = withdrawAPI;
