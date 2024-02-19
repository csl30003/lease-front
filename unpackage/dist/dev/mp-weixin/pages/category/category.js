"use strict";
const common_vendor = require("../../common/vendor.js");
const api_category = require("../../api/category.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "category",
  setup(__props) {
    const categoryList = common_vendor.ref([]);
    const subCategoryList = common_vendor.ref([]);
    const parentId = common_vendor.ref("");
    common_vendor.onLoad(async () => {
      let res = await api_category.getCategoryAPI(0);
      categoryList.value = res.data;
      await getProdList(categoryList.value[0].id);
      parentId.value = categoryList.value[0].id;
    });
    const selIndex = common_vendor.ref(0);
    const onMenuTab = async (e) => {
      const index = e.currentTarget.dataset.index;
      await getProdList(categoryList.value[index].id);
      parentId.value = categoryList.value[index].id;
      selIndex.value = index;
    };
    const getProdList = async (categoryId) => {
      let res = await api_category.getCategoryAPI(categoryId);
      subCategoryList.value = res.data;
    };
    const toCatePage = (e) => {
      const { categoryid } = e.currentTarget.dataset;
      common_vendor.index.navigateTo({
        url: `/pages/category/categoryShow?parentId=${parentId.value}&categoryId=${categoryid}`
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(categoryList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.n("menu-item " + (selIndex.value == index ? "active" : "") + " "),
            c: index,
            d: item.id,
            e: common_vendor.o(onMenuTab, index),
            f: index
          };
        }),
        b: !categoryList.value || !categoryList.value.length
      }, !categoryList.value || !categoryList.value.length ? {
        c: common_vendor.t(categoryList.value && categoryList.value.length ? "该分类下暂无商品" : "暂无商品")
      } : {}, {
        d: subCategoryList.value.length
      }, subCategoryList.value.length ? {
        e: common_vendor.f(subCategoryList.value, (thCateItem, index, i0) => {
          return {
            a: common_vendor.t(thCateItem.name),
            b: thCateItem.id,
            c: thCateItem.parent_id,
            d: common_vendor.o(toCatePage, index),
            e: index
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8145b772"], ["__file", "D:/HBuilderProjects/lease/pages/category/category.vue"]]);
wx.createPage(MiniProgramPage);
