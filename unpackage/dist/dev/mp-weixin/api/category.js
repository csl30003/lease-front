"use strict";
const utils_http = require("../utils/http.js");
const getCategoryAPI = (parentId) => {
  return utils_http.http({
    url: "/category/" + parentId,
    method: "get"
  });
};
exports.getCategoryAPI = getCategoryAPI;
