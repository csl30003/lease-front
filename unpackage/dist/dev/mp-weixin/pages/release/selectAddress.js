"use strict";
const common_vendor = require("../../common/vendor.js");
const api_address = require("../../api/address.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "selectAddress",
  setup(__props) {
    const addressList = common_vendor.ref([]);
    const categoryId = common_vendor.ref("");
    common_vendor.onShow(() => {
      onGetList();
    });
    common_vendor.onLoad(async (options) => {
      if (options.categoryId) {
        categoryId.value = options.categoryId;
      }
    });
    const onGetList = async () => {
      let res = await api_address.getAddressAPI();
      addressList.value = res.data;
    };
    const toFillInformation = (e) => {
      const addressId = e.currentTarget.dataset.addressid;
      common_vendor.index.navigateTo({
        url: "/pages/release/fillInformation?categoryId=" + categoryId.value + "&addressId=" + addressId
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: addressList.value.length === 0
      }, addressList.value.length === 0 ? {} : {}, {
        b: common_vendor.f(addressList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.phone),
            c: common_vendor.t(item.province),
            d: common_vendor.t(item.city),
            e: common_vendor.t(item.district),
            f: common_vendor.t(item.detail),
            g: item.id,
            h: common_vendor.o(toFillInformation, index),
            i: index
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-17f366d7"], ["__file", "D:/HBuilderProjects/lease/pages/release/selectAddress.vue"]]);
wx.createPage(MiniProgramPage);
