"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_order = require("../../api/order.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const toSearchPage = () => {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    };
    const toCategory = () => {
      common_vendor.index.navigateTo({
        url: "/pages/category/category"
      });
    };
    const toPay = async () => {
      const res = await api_order.alipayAPI();
      let url = res.data;
      common_vendor.index.navigateTo({
        url: "/pages/webView/webView?url=" + encodeURIComponent(JSON.stringify(url))
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.o(toSearchPage),
        c: common_vendor.o(toCategory),
        d: common_vendor.o(toPay)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/HBuilderProjects/lease/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
