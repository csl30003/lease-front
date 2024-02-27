"use strict";
const common_vendor = require("../../common/vendor.js");
const api_collection = require("../../api/collection.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "collection",
  setup(__props) {
    common_vendor.onShow(() => {
      getCollection();
    });
    const collectionList = common_vendor.ref([]);
    const getCollection = async () => {
      const res = await api_collection.getCollectionAPI();
      collectionList.value = res.data;
      if (!collectionList.value) {
        collectionList.value = [];
      }
    };
    const toProdPage = (e) => {
      const prodid = e.currentTarget.dataset.id;
      common_vendor.index.navigateTo({
        url: "/pages/product/product?prodid=" + prodid
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(collectionList.value, (item, index, i0) => {
          return {
            a: item.main_image,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.price),
            d: item.product_id,
            e: common_vendor.o(toProdPage, index),
            f: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cd17183b"], ["__file", "D:/HBuilderProjects/lease/pages/collection/collection.vue"]]);
wx.createPage(MiniProgramPage);
