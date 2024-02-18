"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "editUser",
  setup(__props) {
    const userId = common_vendor.ref(0);
    const name = common_vendor.ref("");
    const phone = common_vendor.ref("");
    const country = common_vendor.ref("");
    const province = common_vendor.ref("");
    const city = common_vendor.ref("");
    const district = common_vendor.ref("");
    common_vendor.onLoad(async () => {
      common_vendor.index.showLoading();
      let res = await api_user.getUserInfoAPI();
      name.value = res.data.name;
      phone.value = res.data.phone;
      country.value = res.data.country;
      province.value = res.data.province;
      city.value = res.data.city;
      district.value = res.data.district;
      userId.value = res.data.id;
      common_vendor.index.hideLoading();
    });
    const onSave = async () => {
      const nameParam = name.value;
      const phoneParam = phone.value;
      const countryParam = country.value;
      const provinceParam = province.value;
      const cityParam = city.value;
      const districtParam = district.value;
      if (!nameParam.trim()) {
        name.value = "";
        common_vendor.index.showToast({
          title: "请输入收货人姓名",
          icon: "none"
        });
        return;
      }
      if (!phoneParam.trim()) {
        phone.value = "";
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
      if (!countryParam.trim()) {
        country.value = "";
        common_vendor.index.showToast({
          title: "请输入国家",
          icon: "none"
        });
        return;
      }
      if (!provinceParam.trim()) {
        province.value = "";
        common_vendor.index.showToast({
          title: "请输入省份",
          icon: "none"
        });
        return;
      }
      if (!cityParam.trim()) {
        city.value = "";
        common_vendor.index.showToast({
          title: "请输入城市",
          icon: "none"
        });
        return;
      }
      if (!districtParam.trim()) {
        district.value = "";
        common_vendor.index.showToast({
          title: "请输入区县",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showLoading();
      await api_user.updateUserInfoAPI({
        name: name.value,
        phone: phone.value,
        country: country.value,
        province: province.value,
        city: city.value,
        district: district.value
      });
      let loginResult = common_vendor.index.getStorageSync("loginResult");
      loginResult.name = name.value;
      common_vendor.index.setStorageSync("loginResult", loginResult);
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
    const onCountryInput = (e) => {
      country.value = e.detail.value;
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
    return (_ctx, _cache) => {
      return {
        a: name.value,
        b: common_vendor.o(onNameInput),
        c: phone.value,
        d: common_vendor.o(onPhoneInput),
        e: country.value,
        f: common_vendor.o(onCountryInput),
        g: province.value,
        h: common_vendor.o(onProvinceInput),
        i: city.value,
        j: common_vendor.o(onCityInput),
        k: district.value,
        l: common_vendor.o(onDistrictInput),
        m: common_vendor.o(onSave)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c12c77c9"], ["__file", "D:/HBuilderProjects/lease/pages/user/editUser.vue"]]);
wx.createPage(MiniProgramPage);
