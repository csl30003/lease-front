"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "search",
  setup(__props) {
    common_vendor.onShow(() => {
      getRecentSearch();
    });
    const prodName = common_vendor.ref("");
    common_vendor.onHide(() => {
      prodName.value = "";
    });
    const recentSearch = common_vendor.ref([]);
    const getRecentSearch = () => {
      recentSearch.value = common_vendor.index.getStorageSync("recentSearch");
    };
    const toSearchProdPage = () => {
      if (prodName.value.trim()) {
        let recentSearchStorage = common_vendor.index.getStorageSync("recentSearch") || [];
        recentSearchStorage = recentSearchStorage.filter((item) => item !== prodName.value);
        recentSearchStorage.unshift(prodName.value);
        if (recentSearchStorage.length > 10) {
          recentSearchStorage.pop();
        }
        common_vendor.index.setStorageSync("recentSearch", recentSearchStorage);
        common_vendor.index.navigateTo({
          url: "/pages/search/searchProductShow?prodName=" + prodName.value
        });
      }
    };
    const clearSearch = () => {
      common_vendor.index.removeStorageSync("recentSearch");
      getRecentSearch();
    };
    const goBackIndex = () => {
      common_vendor.index.navigateBack({
        url: "/pages/search/search"
      });
    };
    const getSearchContent = (e) => {
      prodName.value = e.detail.value;
    };
    const onHistSearch = (e) => {
      prodName.value = e.currentTarget.dataset.name;
      toSearchProdPage();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: prodName.value,
        b: common_vendor.o(toSearchProdPage),
        c: common_vendor.o(getSearchContent),
        d: common_assets._imports_0,
        e: common_vendor.o(goBackIndex),
        f: recentSearch.value && recentSearch.value.length
      }, recentSearch.value && recentSearch.value.length ? {
        g: common_assets._imports_1$1,
        h: common_vendor.o(clearSearch),
        i: common_vendor.f(recentSearch.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: item,
            c: common_vendor.o(onHistSearch, index),
            d: index
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"], ["__file", "D:/HBuilderProjects/lease/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
