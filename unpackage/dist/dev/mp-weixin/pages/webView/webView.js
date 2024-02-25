"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "webView",
  setup(__props) {
    const url = common_vendor.ref("");
    common_vendor.onLoad(async (options) => {
      url.value = JSON.parse(decodeURIComponent(options.url));
      console.log(url.value);
    });
    return (_ctx, _cache) => {
      return {
        a: url.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/lease/pages/webView/webView.vue"]]);
wx.createPage(MiniProgramPage);
