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
    const toOrderListPage = (e) => {
      const sts = e.currentTarget.dataset.sts;
      common_vendor.index.navigateTo({
        url: "/pages/orderList/orderList?sts=" + sts
      });
    };
    const myCollection = () => {
      let url = "/pages/prod-classify/prod-classify?sts=5";
      common_vendor.index.navigateTo({
        url
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
        c: common_vendor.o(toEditUser),
        d: common_vendor.t(loginResult.value.name ? loginResult.value.name : "用户昵称")
      } : {}, {
        e: !isAuthInfo.value
      }, !isAuthInfo.value ? {
        f: common_assets._imports_0,
        g: common_vendor.o(toLogin),
        h: common_vendor.o(toLogin)
      } : {}, {
        i: common_vendor.o(toOrderListPage),
        j: common_assets._imports_1,
        k: orderAmount.value.unPay > 0
      }, orderAmount.value.unPay > 0 ? {
        l: common_vendor.t(orderAmount.value.unPay)
      } : {}, {
        m: common_vendor.o(toOrderListPage),
        n: common_assets._imports_2,
        o: orderAmount.value.payed > 0
      }, orderAmount.value.payed > 0 ? {
        p: common_vendor.t(orderAmount.value.payed)
      } : {}, {
        q: common_vendor.o(toOrderListPage),
        r: common_assets._imports_3,
        s: orderAmount.value.consignment > 0
      }, orderAmount.value.consignment > 0 ? {
        t: common_vendor.t(orderAmount.value.consignment)
      } : {}, {
        v: common_vendor.o(toOrderListPage),
        w: common_assets._imports_4,
        x: common_vendor.o(toOrderListPage),
        y: loginResult.value
      }, loginResult.value ? {} : {}, {
        z: common_vendor.o(myCollection),
        A: loginResult.value
      }, loginResult.value ? {} : {}, {
        B: common_vendor.o((...args) => _ctx.handleTips && _ctx.handleTips(...args)),
        C: loginResult.value
      }, loginResult.value ? {} : {}, {
        D: common_vendor.o(toAddressList),
        E: isAuthInfo.value
      }, isAuthInfo.value ? {
        F: common_vendor.o(logout)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"], ["__file", "D:/HBuilderProjects/lease/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
