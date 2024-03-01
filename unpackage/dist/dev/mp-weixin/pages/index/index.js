"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_category = require("../../api/category.js");
const api_product = require("../../api/product.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const indexImgs = common_vendor.ref([]);
    const indicatorColor = common_vendor.ref("#d1e5fb");
    const indicatorActiveColor = common_vendor.ref("#007aff");
    const autoplay = common_vendor.ref(true);
    const interval = common_vendor.ref(3e3);
    const duration = common_vendor.ref(1e3);
    const categoryList = common_vendor.ref([]);
    const productList = common_vendor.ref([]);
    const current = common_vendor.ref(1);
    const pages = common_vendor.ref(0);
    common_vendor.onLoad(async () => {
      await getCarouselList();
      await getCategoryList();
      await getProdList();
    });
    const getCarouselList = async () => {
      const res = await api_product.getCarouselListAPI();
      indexImgs.value = res.data;
    };
    const getCategoryList = async () => {
      const res = await api_category.getCategoryAPI(0);
      categoryList.value = res.data;
    };
    common_vendor.onReachBottom(() => {
      if (current.value < pages.value) {
        current.value = current.value + 1;
        getProdList();
      }
    });
    const getProdList = async () => {
      const res = await api_product.getProductListAPI({
        current: current.value,
        size: 10,
        sort: 0,
        order: "desc"
      });
      if (current.value == 1) {
        productList.value = res.data.records;
      } else {
        productList.value = productList.value.concat(res.data.records);
      }
      pages.value = res.data.pages;
      if (!productList.value.length) {
        productList.value = [];
      }
    };
    const toSearchPage = () => {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    };
    const toProdPage = (e) => {
      const prodId = e.currentTarget.dataset.prodid;
      common_vendor.index.navigateTo({
        url: `/pages/product/product?prodid=${prodId}`
      });
    };
    const toCategory = () => {
      common_vendor.index.navigateTo({
        url: "/pages/category/category"
      });
    };
    const toCategoryByParentId = (e) => {
      const parentId = e.currentTarget.dataset.parentid;
      common_vendor.index.navigateTo({
        url: `/pages/category/categoryShow?parentId=${parentId}&categoryId=${0}`
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0,
        b: common_vendor.o(toSearchPage),
        c: common_vendor.f(indexImgs.value, (item, index, i0) => {
          return {
            a: item.main_image,
            b: item.id,
            c: common_vendor.o(toProdPage, index),
            d: index
          };
        }),
        d: autoplay.value,
        e: indicatorColor.value,
        f: interval.value,
        g: duration.value,
        h: indicatorActiveColor.value + " ",
        i: common_vendor.o(toCategory),
        j: common_vendor.f(categoryList.value, (item, index, i0) => {
          return {
            a: item.icon,
            b: item.id,
            c: common_vendor.o(toCategoryByParentId, index),
            d: common_vendor.t(item.name),
            e: index
          };
        }),
        k: productList.value.length
      }, productList.value.length ? {
        l: common_vendor.f(productList.value, (prod, key, i0) => {
          return {
            a: prod.main_image,
            b: common_vendor.t(prod.name),
            c: common_vendor.t(prod.price),
            d: prod.id,
            e: common_vendor.o(toProdPage, key),
            f: key
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/HBuilderProjects/lease/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
