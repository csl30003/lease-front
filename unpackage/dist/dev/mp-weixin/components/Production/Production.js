"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "Production",
  props: {
    item: {
      type: Object,
      default: () => {
        return null;
      }
    }
  },
  setup(__props) {
    const toProdPage = (e) => {
      const prodid = e.currentTarget.dataset.id;
      common_vendor.index.navigateTo({
        url: "/pages/product/product?prodid=" + prodid
      });
    };
    return (_ctx, _cache) => {
      return {
        a: __props.item.main_image,
        b: common_vendor.t(__props.item.name),
        c: common_vendor.t(__props.item.price),
        d: __props.item.product_id,
        e: common_vendor.o(toProdPage)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eb5e7749"], ["__file", "D:/HBuilderProjects/lease/components/Production/Production.vue"]]);
wx.createComponent(Component);
