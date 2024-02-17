"use strict";
const utils_http = require("../utils/http.js");
const helloWorld = (params) => {
  return utils_http.http({
    url: "/hello",
    method: "post",
    data: {
      name: "world",
      sex: params
    }
  });
};
exports.helloWorld = helloWorld;
