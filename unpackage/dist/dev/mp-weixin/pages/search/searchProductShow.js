"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_product = require("../../api/product.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "searchProductShow",
  setup(__props) {
    const prodName = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      prodName.value = options.prodName;
    });
    common_vendor.onShow(async () => {
      await toLoadData();
    });
    const isLoaded = common_vendor.ref(false);
    const current = common_vendor.ref(1);
    const pages = common_vendor.ref(0);
    common_vendor.onReachBottom(async () => {
      if (current.value < pages.value) {
        current.value = current.value + 1;
        await toLoadData();
      }
    });
    const getSearchContent = (e) => {
      prodName.value = e.detail.value;
    };
    const sts = common_vendor.ref(0);
    const searchProdList = common_vendor.ref([]);
    const toLoadData = async () => {
      isLoaded.value = false;
      const res = await api_product.getProductListAPI({
        current: current.value,
        size: 10,
        name: prodName.value,
        sort: sts.value
      });
      isLoaded.value = true;
      if (current.value == 1) {
        searchProdList.value = res.data.records;
      } else {
        searchProdList.value = searchProdList.value.concat(res.data.records);
      }
      pages.value = res.data.pages;
    };
    const toSearchConfirm = (e) => {
      if (e.detail.value) {
        let recentSearch = common_vendor.index.getStorageSync("recentSearch") || [];
        recentSearch = recentSearch.filter((item) => item !== prodName.value);
        recentSearch.unshift(prodName.value);
        if (recentSearch.length > 10) {
          recentSearch.pop();
        }
        common_vendor.index.setStorageSync("recentSearch", recentSearch);
      }
      common_vendor.index.redirectTo({
        url: "/pages/search/searchProductShow?prodName=" + e.detail.value
      });
    };
    const onStsTap = async (e) => {
      sts.value = e.currentTarget.dataset.sts;
      current.value = 1;
      pages.value = 0;
      searchProdList.value = [];
      await toLoadData();
    };
    const toProdPage = (e) => {
      common_vendor.index.navigateTo({
        url: "/pages/product/product?prodid=" + e.currentTarget.dataset.prodid
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: prodName.value,
        b: common_vendor.o(getSearchContent),
        c: common_vendor.o(toSearchConfirm),
        d: common_assets._imports_0,
        e: common_vendor.n("tab-item complete " + (sts.value == 0 ? "on" : "")),
        f: common_vendor.o(onStsTap),
        g: common_vendor.n("tab-item " + (sts.value == 1 ? "on" : "")),
        h: common_vendor.o(onStsTap),
        i: common_vendor.n("tab-item " + (sts.value == 2 ? "on" : "")),
        j: common_vendor.o(onStsTap),
        k: common_vendor.f(searchProdList.value, (item, index, i0) => {
          return {
            a: item.main_image,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.price),
            d: common_vendor.t(item.detail),
            e: item.id,
            f: common_vendor.o(toProdPage, index),
            g: index
          };
        }),
        l: !searchProdList.value.length
      }, !searchProdList.value.length ? {
        m: common_vendor.n(_ctx.showType == 1 ? "empty-top" : "")
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7d4e76be"], ["__file", "D:/HBuilderProjects/lease/pages/search/searchProductShow.vue"]]);
wx.createPage(MiniProgramPage);
