"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_address = require("../../api/address.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "address",
  setup(__props) {
    const addressList = common_vendor.ref([]);
    common_vendor.onShow(() => {
      onGetList();
    });
    const onGetList = async () => {
      common_vendor.index.showLoading();
      let res = await api_address.getAddressAPI();
      addressList.value = res.data;
      common_vendor.index.hideLoading();
    };
    const onAddAddr = () => {
      common_vendor.index.navigateTo({
        url: "/pages/address/editAddress"
      });
    };
    const onDefaultAddr = async (e) => {
      const addrId = e.currentTarget.dataset.addrid;
      common_vendor.index.showLoading();
      await api_address.setDefaultAddressAPI(addrId);
      common_vendor.index.hideLoading();
    };
    const toEditAddress = (e) => {
      const addrId = e.currentTarget.dataset.addrid;
      common_vendor.index.navigateTo({
        url: "/pages/address/editAddress?addrId=" + addrId
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
            c: item.id,
            d: common_vendor.o(toEditAddress, index),
            e: common_vendor.t(item.province),
            f: common_vendor.t(item.city),
            g: common_vendor.t(item.district),
            h: common_vendor.t(item.detail),
            i: item.prodId,
            j: item.is_default == 1,
            k: item.id,
            l: common_vendor.o(onDefaultAddr, index),
            m: item.id,
            n: index
          };
        }),
        c: common_assets._imports_0$3,
        d: common_vendor.o(onAddAddr)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-40ca010a"], ["__file", "D:/HBuilderProjects/lease/pages/address/address.vue"]]);
wx.createPage(MiniProgramPage);
