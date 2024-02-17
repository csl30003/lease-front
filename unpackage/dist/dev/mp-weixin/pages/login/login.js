"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_user = require("../../api/user.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    common_vendor.onShow(() => {
      common_vendor.index.setNavigationBarTitle({
        title: "用户登录"
      });
    });
    const principal = common_vendor.ref("");
    const errorTips = common_vendor.ref(0);
    common_vendor.watch(
      () => principal.value,
      () => {
        errorTips.value = 0;
      }
    );
    const credentials = common_vendor.ref("");
    const getInputVal = (e) => {
      const type = e.currentTarget.dataset.type;
      if (type == "account") {
        principal.value = e.detail.value;
      } else if (type == "password") {
        credentials.value = e.detail.value;
      }
    };
    const login = async () => {
      if (principal.value.length == 0) {
        errorTips.value = 1;
      } else if (credentials.value.length == 0) {
        errorTips.value = 2;
      } else {
        errorTips.value = 0;
        let res = await api_user.loginAPI({
          name: principal.value,
          password: credentials.value
        });
        console.log(res.data.token);
        common_vendor.index.setStorageSync("token", res.data.token);
        common_vendor.index.setStorageSync("loginResult", {
          name: res.data.name,
          avatar: res.data.avatar,
          gender: res.data.gender
        });
        common_vendor.index.showToast({
          title: "登录成功",
          icon: "none",
          complete: () => {
            setTimeout(() => {
              common_vendor.wx$1.switchTab({
                url: "/pages/index/index"
              });
            }, 500);
          }
        });
      }
    };
    const toRegitser = async () => {
      common_vendor.index.navigateTo({
        url: "/pages/register/register"
      });
    };
    const toIndex = () => {
      common_vendor.wx$1.switchTab({
        url: "/pages/index/index"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(getInputVal),
        c: errorTips.value == 1
      }, errorTips.value == 1 ? {} : {}, {
        d: common_vendor.n(errorTips.value == 1 ? "error" : ""),
        e: common_vendor.o(getInputVal),
        f: errorTips.value == 2
      }, errorTips.value == 2 ? {} : {}, {
        g: common_vendor.n(errorTips.value == 2 ? "error" : ""),
        h: common_vendor.o(toRegitser),
        i: common_vendor.o(login),
        j: common_vendor.o(toIndex)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"], ["__file", "D:/HBuilderProjects/lease/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
