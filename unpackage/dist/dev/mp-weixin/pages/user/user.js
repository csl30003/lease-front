"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_user = require("../../api/user.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const isAuthInfo = common_vendor.ref(false);
    const loginResult = common_vendor.ref("");
    const orderAmount = common_vendor.ref("");
    common_vendor.onShow(() => {
      loginResult.value = common_vendor.index.getStorageSync("loginResult");
      isAuthInfo.value = !!loginResult.value;
    });
    const toAddressList = () => {
      common_vendor.index.navigateTo({
        url: "/pages/address/address"
      });
    };
    const toEditUserAvatar = () => {
      common_vendor.index.navigateTo({
        url: "/pages/user/editUserAvatar"
      });
    };
    const toEditUser = () => {
      common_vendor.index.navigateTo({
        url: "/pages/user/editUser"
      });
    };
    const toLogin = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "请登录",
        showCancel: false,
        success(res) {
          setTimeout(() => {
            common_vendor.index.navigateTo({
              url: "/pages/login/login"
            });
          }, 500);
        }
      });
    };
    const logout = async () => {
      await api_user.logoutAPI();
      common_vendor.index.removeStorageSync("loginResult");
      isAuthInfo.value = false;
      loginResult.value = "";
      common_vendor.index.removeStorageSync("token");
      common_vendor.index.showToast({
        title: "退出成功",
        icon: "none"
      });
      orderAmount.value = "";
      setTimeout(() => {
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
      }, 500);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isAuthInfo.value
      }, isAuthInfo.value ? {
        b: loginResult.value.avatar ? loginResult.value.avatar : "/static/images/icon/head04.png",
        c: common_vendor.o(toEditUserAvatar),
        d: common_vendor.t(loginResult.value.name ? loginResult.value.name : "用户昵称"),
        e: common_vendor.o(toEditUser)
      } : {}, {
        f: !isAuthInfo.value
      }, !isAuthInfo.value ? {
        g: common_assets._imports_0,
        h: common_vendor.o(toLogin),
        i: common_vendor.o(toLogin)
      } : {}, {
        j: common_vendor.o((...args) => _ctx.toOrderListPage && _ctx.toOrderListPage(...args)),
        k: common_assets._imports_1,
        l: orderAmount.value.unPay > 0
      }, orderAmount.value.unPay > 0 ? {
        m: common_vendor.t(orderAmount.value.unPay)
      } : {}, {
        n: common_vendor.o((...args) => _ctx.toOrderListPage && _ctx.toOrderListPage(...args)),
        o: common_assets._imports_2,
        p: orderAmount.value.payed > 0
      }, orderAmount.value.payed > 0 ? {
        q: common_vendor.t(orderAmount.value.payed)
      } : {}, {
        r: common_vendor.o((...args) => _ctx.toOrderListPage && _ctx.toOrderListPage(...args)),
        s: common_assets._imports_3,
        t: orderAmount.value.consignment > 0
      }, orderAmount.value.consignment > 0 ? {
        v: common_vendor.t(orderAmount.value.consignment)
      } : {}, {
        w: common_vendor.o((...args) => _ctx.toOrderListPage && _ctx.toOrderListPage(...args)),
        x: common_assets._imports_4,
        y: common_vendor.o((...args) => _ctx.toOrderListPage && _ctx.toOrderListPage(...args)),
        z: loginResult.value
      }, loginResult.value ? {} : {}, {
        A: common_vendor.o((...args) => _ctx.myCollection && _ctx.myCollection(...args)),
        B: loginResult.value
      }, loginResult.value ? {} : {}, {
        C: common_vendor.o((...args) => _ctx.handleTips && _ctx.handleTips(...args)),
        D: loginResult.value
      }, loginResult.value ? {} : {}, {
        E: common_vendor.o(toAddressList),
        F: isAuthInfo.value
      }, isAuthInfo.value ? {
        G: common_vendor.o(logout)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"], ["__file", "D:/HBuilderProjects/lease/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
