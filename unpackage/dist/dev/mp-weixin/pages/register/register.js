"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_user = require("../../api/user.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "register",
  setup(__props) {
    common_vendor.onShow(() => {
      common_vendor.index.setNavigationBarTitle({
        title: "用户注册"
      });
    });
    const principal = common_vendor.ref("");
    const credentials = common_vendor.ref("");
    const confirmPassword = common_vendor.ref("");
    const getInputVal = (e) => {
      const type = e.currentTarget.dataset.type;
      if (type == "account") {
        principal.value = e.detail.value;
      } else if (type == "password") {
        credentials.value = e.detail.value;
      } else if (type == "confirmPassword") {
        confirmPassword.value = e.detail.value;
      }
    };
    const errorTips = common_vendor.ref(0);
    const toRegister = async () => {
      if (principal.value.length == 0) {
        errorTips.value = 1;
      } else if (credentials.value.length == 0) {
        errorTips.value = 2;
      } else if (confirmPassword.value.length == 0) {
        errorTips.value = 3;
      } else {
        errorTips.value = 0;
        if (credentials.value != confirmPassword.value) {
          common_vendor.index.showToast({
            title: "两次密码不一致",
            icon: "none",
            duration: 500
          });
          return;
        }
        common_vendor.index.showLoading();
        await api_user.registerAPI({
          name: principal.value,
          password: credentials.value
        });
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "注册成功，请登录",
          icon: "none",
          duration: 1500
        });
        setTimeout(() => {
          common_vendor.index.navigateTo({
            url: "/pages/login/login"
          });
        }, 500);
      }
    };
    const toLogin = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    };
    const toIndex = () => {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$3,
        b: common_vendor.o(getInputVal),
        c: errorTips.value == 1
      }, errorTips.value == 1 ? {} : {}, {
        d: common_vendor.n(errorTips.value == 1 ? "error" : ""),
        e: common_vendor.o(getInputVal),
        f: errorTips.value == 2
      }, errorTips.value == 2 ? {} : {}, {
        g: common_vendor.n(errorTips.value == 2 ? "error" : ""),
        h: common_vendor.o(getInputVal),
        i: errorTips.value == 3
      }, errorTips.value == 3 ? {} : {}, {
        j: common_vendor.n(errorTips.value == 3 ? "error" : ""),
        k: common_vendor.o(toLogin),
        l: common_vendor.o(toRegister),
        m: common_vendor.o(toIndex)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bac4a35d"], ["__file", "D:/HBuilderProjects/lease/pages/register/register.vue"]]);
wx.createPage(MiniProgramPage);
