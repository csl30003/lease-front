"use strict";
const common_vendor = require("../../common/vendor.js");
const api_address = require("../../api/address.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "editAddress",
  setup(__props) {
    const addrId = common_vendor.ref(0);
    const name = common_vendor.ref("");
    const phone = common_vendor.ref("");
    const province = common_vendor.ref("");
    const city = common_vendor.ref("");
    const district = common_vendor.ref("");
    const detail = common_vendor.ref("");
    const isDefault = common_vendor.ref(0);
    common_vendor.onLoad(async (options) => {
      if (options.addrId) {
        common_vendor.index.showLoading();
        let res = await api_address.getAddressByIdAPI(options.addrId);
        province.value = res.data.province;
        city.value = res.data.city;
        district.value = res.data.district;
        name.value = res.data.name;
        phone.value = res.data.phone;
        detail.value = res.data.detail;
        addrId.value = options.addrId;
        isDefault.value = res.data.is_default;
        common_vendor.index.hideLoading();
      }
    });
    const onSaveAddr = async () => {
      const nameParam = name.value;
      const phoneParam = phone.value;
      const provinceParam = province.value;
      const cityParam = city.value;
      const districtParam = district.value;
      const detailParam = detail.value;
      if (!nameParam.trim()) {
        name.value = "";
        common_vendor.index.showToast({
          title: "请输入收货人姓名",
          icon: "none"
        });
        return;
      }
      if (!phoneParam) {
        common_vendor.index.showToast({
          title: "请输入手机号码",
          icon: "none"
        });
        return;
      }
      if (phoneParam.length != 11) {
        common_vendor.index.showToast({
          title: "请输入正确的手机号码",
          icon: "none"
        });
        return;
      }
      if (!provinceParam.trim()) {
        receiver.value = "";
        common_vendor.index.showToast({
          title: "请输入省份",
          icon: "none"
        });
        return;
      }
      if (!cityParam.trim()) {
        receiver.value = "";
        common_vendor.index.showToast({
          title: "请输入城市",
          icon: "none"
        });
        return;
      }
      if (!districtParam.trim()) {
        receiver.value = "";
        common_vendor.index.showToast({
          title: "请输入区县",
          icon: "none"
        });
        return;
      }
      if (!detailParam.trim()) {
        receiver.value = "";
        common_vendor.index.showToast({
          title: "请输入详细地址",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showLoading();
      if (addrId.value != 0) {
        await api_address.updateAddressAPI(addrId.value, {
          name: name.value,
          phone: phone.value,
          province: province.value,
          city: city.value,
          district: district.value,
          detail: detail.value,
          is_default: isDefault.value
        });
      } else {
        await api_address.addAddressAPI({
          name: name.value,
          phone: phone.value,
          province: province.value,
          city: city.value,
          district: district.value,
          detail: detail.value
        });
      }
      common_vendor.index.hideLoading();
      common_vendor.index.navigateBack({
        delta: 1
      });
    };
    const onNameInput = (e) => {
      name.value = e.detail.value;
    };
    const onPhoneInput = (e) => {
      phone.value = e.detail.value;
    };
    const onProvinceInput = (e) => {
      province.value = e.detail.value;
    };
    const onCityInput = (e) => {
      city.value = e.detail.value;
    };
    const onDistrictInput = (e) => {
      district.value = e.detail.value;
    };
    const onDetailInput = (e) => {
      detail.value = e.detail.value;
    };
    const onDeleteAddr = () => {
      common_vendor.index.showModal({
        title: "",
        content: "确定要删除此收货地址吗？",
        confirmColor: "#eb2444",
        success(res) {
          if (res.confirm) {
            const addrIdParam = addrId.value;
            common_vendor.index.showLoading();
            http.request({
              url: "/p/address/deleteAddr/" + addrIdParam,
              method: "DELETE"
            }).then(() => {
              common_vendor.index.hideLoading();
              common_vendor.index.navigateBack({
                delta: 1
              });
            });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: name.value,
        b: common_vendor.o(onNameInput),
        c: phone.value,
        d: common_vendor.o(onPhoneInput),
        e: province.value,
        f: common_vendor.o(onProvinceInput),
        g: city.value,
        h: common_vendor.o(onCityInput),
        i: district.value,
        j: common_vendor.o(onDistrictInput),
        k: detail.value,
        l: common_vendor.o(onDetailInput),
        m: common_vendor.o(onSaveAddr),
        n: addrId.value != 0
      }, addrId.value != 0 ? {
        o: common_vendor.o(onDeleteAddr)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-037197cd"], ["__file", "D:/HBuilderProjects/lease/pages/address/editAddress.vue"]]);
wx.createPage(MiniProgramPage);
