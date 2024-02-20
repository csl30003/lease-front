"use strict";
const common_vendor = require("../../common/vendor.js");
const api_product = require("../../api/product.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "myProduct",
  setup(__props) {
    let products = common_vendor.ref([]);
    common_vendor.onShow(async () => {
      const res = await api_product.getMyProductAPI(1);
      products.value = res.data;
    });
    const offsale = async (productId) => {
      await api_product.updateProductStatusAPI({
        id: productId,
        status: 2
      });
      const res = await api_product.getMyProductAPI(1);
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
            e: common_vendor.o(($event) => offsale(product.id), product.id),
            f: product.id
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1dc1a969"], ["__file", "D:/HBuilderProjects/lease/pages/user/myProduct.vue"]]);
wx.createPage(MiniProgramPage);
