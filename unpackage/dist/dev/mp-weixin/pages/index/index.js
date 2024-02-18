"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const toCategory = () => {
      common_vendor.index.navigateTo({
        url: "/pages/category/category"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(toCategory)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/lease/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
