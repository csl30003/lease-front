"use strict";
const utils_http = require("../utils/http.js");
const getAddressAPI = () => {
  return utils_http.http({
    url: "/index/address",
    method: "get"
  });
};
const getAddressByIdAPI = (id) => {
  return utils_http.http({
    url: "/index/address/" + id,
    method: "get"
  });
};
const setDefaultAddressAPI = (id) => {
  return utils_http.http({
    url: "/index/address/" + id + "/default",
    method: "put"
  });
};
const addAddressAPI = (data) => {
  return utils_http.http({
    url: "/index/address",
    method: "post",
    data
  });
};
const updateAddressAPI = (id, data) => {
  return utils_http.http({
    url: "/index/address/" + id,
    method: "put",
    data
  });
};
exports.addAddressAPI = addAddressAPI;
exports.getAddressAPI = getAddressAPI;
exports.getAddressByIdAPI = getAddressByIdAPI;
exports.setDefaultAddressAPI = setDefaultAddressAPI;
exports.updateAddressAPI = updateAddressAPI;
