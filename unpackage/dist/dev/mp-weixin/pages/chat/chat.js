"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "chat",
  setup(__props) {
    const toCategory = () => {
      common_vendor.index.navigateTo({
        url: "/pages/category/category"
      });
    };
    const toSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(toCategory),
        b: common_vendor.o(toSearch)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/lease/pages/chat/chat.vue"]]);
wx.createPage(MiniProgramPage);
