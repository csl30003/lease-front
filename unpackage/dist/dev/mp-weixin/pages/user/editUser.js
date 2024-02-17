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
    const avatar = common_vendor.ref("");
    const country = common_vendor.ref("");
    const province = common_vendor.ref("");
    const city = common_vendor.ref("");
    const district = common_vendor.ref("");
    common_vendor.onLoad(async () => {
      common_vendor.index.showLoading();
      let res = await api_user.getUserInfoAPI();
      console.log(res);
      country.value = res.data.country;
      province.value = res.data.province;
      city.value = res.data.city;
      district.value = res.data.district;
      name.value = res.data.name;
      phone.value = res.data.phone;
      avatar.value = res.data.avatar;
      userId.value = res.data.id;
      common_vendor.index.hideLoading();
    });
    const onSave = () => {
      name.value;
      phone.value;
      country.value;
      province.value;
      city.value;
      district.value;
    };
    return (_ctx, _cache) => {
      return {
        a: name.value,
        b: common_vendor.o((...args) => _ctx.onNameInput && _ctx.onNameInput(...args)),
        c: phone.value,
        d: common_vendor.o((...args) => _ctx.onPhoneInput && _ctx.onPhoneInput(...args)),
        e: country.value,
        f: common_vendor.o((...args) => _ctx.onCountryInput && _ctx.onCountryInput(...args)),
        g: province.value,
        h: common_vendor.o((...args) => _ctx.onProvinceInput && _ctx.onProvinceInput(...args)),
        i: city.value,
        j: common_vendor.o((...args) => _ctx.onCityInput && _ctx.onCityInput(...args)),
        k: district.value,
        l: common_vendor.o((...args) => _ctx.onDistrictInput && _ctx.onDistrictInput(...args)),
        m: common_vendor.o(onSave)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c12c77c9"], ["__file", "D:/HBuilderProjects/lease/pages/user/editUser.vue"]]);
wx.createPage(MiniProgramPage);
