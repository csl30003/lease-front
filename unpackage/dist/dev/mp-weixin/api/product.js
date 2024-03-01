"use strict";
const utils_http = require("../utils/http.js");
const addProductAPI = (data) => {
  return utils_http.http({
    url: "/index/product",
    method: "post",
    data
  });
};
const updateProductStatusAPI = (data) => {
  return utils_http.http({
    url: "/index/product/status",
    method: "put",
    data
  });
};
const getMyProductAPI = (status) => {
  return utils_http.http({
    url: "/index/product/my/" + status,
    method: "get"
  });
};
const getProductListAPI = (data) => {
  return utils_http.http({
    url: "/product/list",
    method: "get",
    data
  });
};
const getProductAPI = (id) => {
  return utils_http.http({
    url: "/product/" + id,
    method: "get"
  });
};
const getCarouselListAPI = () => {
  return utils_http.http({
    url: "/product/carousel",
    method: "get"
  });
};
exports.addProductAPI = addProductAPI;
exports.getCarouselListAPI = getCarouselListAPI;
exports.getMyProductAPI = getMyProductAPI;
exports.getProductAPI = getProductAPI;
exports.getProductListAPI = getProductListAPI;
exports.updateProductStatusAPI = updateProductStatusAPI;
