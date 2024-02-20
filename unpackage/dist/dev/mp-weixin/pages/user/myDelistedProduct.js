"use strict";
const common_vendor = require("../../common/vendor.js");
const api_product = require("../../api/product.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "myDelistedProduct",
  setup(__props) {
    let products = common_vendor.ref([]);
    common_vendor.onShow(async () => {
      const res = await api_product.getMyProductAPI(2);
      products.value = res.data;
    });
    const grounding = async (productId) => {
      await api_product.updateProductStatusAPI({
        id: productId,
        status: 1
      });
      const res = await api_product.getMyProductAPI(2);
      products.value = res.data;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(products), (product, k0, i0) => {
          return {
            a: product.main_image,
            b: common_vendor.t(product.name),
            c: common_vendor.t(product.price),
            d: common_vendor.t(product.stock),
            e: common_vendor.o(($event) => grounding(product.id), product.id),
            f: product.id
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-69e049ea"], ["__file", "D:/HBuilderProjects/lease/pages/user/myDelistedProduct.vue"]]);
wx.createPage(MiniProgramPage);
