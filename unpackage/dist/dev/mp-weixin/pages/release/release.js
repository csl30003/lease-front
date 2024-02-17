"use strict";
const common_vendor = require("../../common/vendor.js");
const api_test = require("../../api/test.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "release",
  setup(__props) {
    const hello = async () => {
      let res = await api_test.helloWorld(1);
      console.log(res);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(hello)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/lease/pages/release/release.vue"]]);
wx.createPage(MiniProgramPage);
