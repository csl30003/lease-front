"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "release",
  setup(__props) {
    const details = common_vendor.ref("");
    const images = common_vendor.ref([]);
    const categories = ["分类1", "分类2", "分类3"];
    const selectedCategory = common_vendor.ref("");
    const price = common_vendor.ref("");
    const shippingOptions = ["快递", "自取"];
    const selectedShipping = common_vendor.ref("");
    const freight = common_vendor.ref("");
    const publish = () => {
    };
    const addImage = () => {
    };
    const deleteImage = (index) => {
    };
    const changeCategory = (event) => {
      selectedCategory.value = categories[event.detail.value];
    };
    const changeShipping = (event) => {
      selectedShipping.value = shippingOptions[event.detail.value];
      if (selectedShipping.value === "自取") {
        freight.value = "";
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(publish),
        b: details.value,
        c: common_vendor.o(($event) => details.value = $event.detail.value),
        d: common_vendor.f(images.value, (image, index, i0) => {
          return {
            a: image,
            b: common_vendor.o(($event) => deleteImage(), index),
            c: index
          };
        }),
        e: images.value.length < 9
      }, images.value.length < 9 ? {
        f: common_vendor.o(addImage)
      } : {}, {
        g: common_vendor.t(selectedCategory.value),
        h: categories,
        i: common_vendor.o(changeCategory),
        j: price.value,
        k: common_vendor.o(($event) => price.value = $event.detail.value),
        l: common_vendor.t(selectedShipping.value),
        m: shippingOptions,
        n: common_vendor.o(changeShipping),
        o: selectedShipping.value === "快递"
      }, selectedShipping.value === "快递" ? {
        p: freight.value,
        q: common_vendor.o(($event) => freight.value = $event.detail.value)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/lease/pages/release/release.vue"]]);
wx.createPage(MiniProgramPage);
