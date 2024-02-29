"use strict";
const common_vendor = require("../../common/vendor.js");
const api_category = require("../../api/category.js");
const api_product = require("../../api/product.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "categoryShow",
  setup(__props) {
    const parentId = common_vendor.ref("");
    const categoryId = common_vendor.ref(0);
    common_vendor.onLoad(async (options) => {
      parentId.value = options.parentId;
      categoryId.value = options.categoryId;
      await getSubCategory();
      await getProdList();
    });
    const current = common_vendor.ref(1);
    const pages = common_vendor.ref(0);
    common_vendor.onReachBottom(() => {
      if (current.value < pages.value) {
        current.value = current.value + 1;
        getProdList();
      }
    });
    const intoView = common_vendor.ref("");
    const subCategoryList = common_vendor.ref([]);
    const getSubCategory = async () => {
      const res = await api_category.getCategoryAPI(parentId.value);
      subCategoryList.value = res.data;
      if (res.data.length === 0) {
        return;
      }
      if (categoryId.value === "0") {
        categoryId.value = subCategoryList.value[0].id;
      }
      common_vendor.nextTick$1(() => {
        intoView.value = "sw" + categoryId.value;
      });
    };
    const prodList = common_vendor.ref([]);
    const isLoaded = common_vendor.ref(false);
    const getProdList = async () => {
      isLoaded.value = false;
      const res = await api_product.getProductListAPI({
        category_id: categoryId.value,
        current: current.value,
        size: 10,
        sort: 0,
        order: "desc"
      });
      isLoaded.value = true;
      if (current.value == 1) {
        prodList.value = res.data.records;
      } else {
        prodList.value = prodList.value.concat(res.data.records);
      }
      pages.value = res.data.pages;
    };
    const onSubCategoryTap = (e) => {
      categoryId.value = e.currentTarget.dataset.id;
      current.value = 1;
      pages.value = 0;
      intoView.value = "sw" + e.currentTarget.dataset.id;
      getProdList();
    };
    const toProdPage = (e) => {
      const prodid = e.currentTarget.dataset.prodid;
      if (prodid) {
        common_vendor.index.navigateTo({
          url: "/pages/product/product?prodid=" + prodid
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(subCategoryList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: "sw" + item.id,
            c: common_vendor.n("category-item " + (item.id == categoryId.value ? "on" : "")),
            d: item.id,
            e: common_vendor.o(onSubCategoryTap, index),
            f: index
          };
        }),
        b: intoView.value,
        c: prodList.value.length
      }, prodList.value.length ? {
        d: common_vendor.f(prodList.value, (prod, key, i0) => {
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a26333d7"], ["__file", "D:/HBuilderProjects/lease/pages/category/categoryShow.vue"]]);
wx.createPage(MiniProgramPage);
