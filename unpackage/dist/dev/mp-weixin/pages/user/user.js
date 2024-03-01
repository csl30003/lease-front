"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_user = require("../../api/user.js");
const api_order = require("../../api/order.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const isAuthInfo = common_vendor.ref(false);
    const loginResult = common_vendor.ref("");
    const myOrderCount = common_vendor.ref({});
    const hisOrderCount = common_vendor.ref({});
    common_vendor.onShow(async () => {
      loginResult.value = common_vendor.index.getStorageSync("loginResult");
      isAuthInfo.value = !!loginResult.value;
      if (isAuthInfo.value) {
        const res = await api_order.getOrderCountAPI();
        myOrderCount.value = res.data.myOrderCount;
        hisOrderCount.value = res.data.hisOrderCount;
      }
    });
    const myProduct = () => {
      common_vendor.index.navigateTo({
        url: "/pages/user/myProduct"
      });
    };
    const myDelistedProduct = () => {
      common_vendor.index.navigateTo({
        url: "/pages/user/myDelistedProduct"
      });
    };
    const toAddressList = () => {
      common_vendor.index.navigateTo({
        url: "/pages/address/address"
      });
    };
    const toOrderListPage1 = (e) => {
      const sts = e.currentTarget.dataset.sts;
      common_vendor.index.navigateTo({
        url: "/pages/order/orderList?sts=" + sts
      });
    };
    const toOrderListPage2 = (e) => {
      const sts = e.currentTarget.dataset.sts;
      common_vendor.index.navigateTo({
        url: "/pages/order/releaseOrderList?sts=" + sts
      });
    };
    const myCollection = () => {
      common_vendor.index.navigateTo({
        url: "/pages/collection/collection"
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
    const toWallet = () => {
      common_vendor.index.navigateTo({
        url: "/pages/wallet/wallet"
      });
    };
    const toLogin = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    };
    const logout = async () => {
      await api_user.logoutAPI();
      common_vendor.index.removeStorageSync("loginResult");
      isAuthInfo.value = false;
      loginResult.value = "";
      myOrderCount.value = {};
      hisOrderCount.value = {};
      common_vendor.index.removeStorageSync("token");
      common_vendor.index.showToast({
        title: "退出成功",
        icon: "none"
      });
      setTimeout(() => {
        common_vendor.index.switchTab({
          url: "/pages/user/user"
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
        g: common_vendor.o(toLogin),
        h: common_vendor.o(toLogin)
      } : {}, {
        i: common_vendor.o(toOrderListPage1),
        j: common_assets._imports_0$1,
        k: myOrderCount.value.status1 > 0
      }, myOrderCount.value.status1 > 0 ? {
        l: common_vendor.t(myOrderCount.value.status1)
      } : {}, {
        m: common_vendor.o(toOrderListPage1),
        n: common_assets._imports_1,
        o: myOrderCount.value.status3 > 0
      }, myOrderCount.value.status3 > 0 ? {
        p: common_vendor.t(myOrderCount.value.status3)
      } : {}, {
        q: common_vendor.o(toOrderListPage1),
        r: common_assets._imports_2,
        s: myOrderCount.value.status4 > 0
      }, myOrderCount.value.status4 > 0 ? {
        t: common_vendor.t(myOrderCount.value.status4)
      } : {}, {
        v: common_vendor.o(toOrderListPage1),
        w: common_assets._imports_3,
        x: myOrderCount.value.status7 > 0
      }, myOrderCount.value.status7 > 0 ? {
        y: common_vendor.t(myOrderCount.value.status7)
      } : {}, {
        z: common_vendor.o(toOrderListPage1),
        A: common_vendor.o(toOrderListPage2),
        B: common_assets._imports_4,
        C: hisOrderCount.value.status2 > 0
      }, hisOrderCount.value.status2 > 0 ? {
        D: common_vendor.t(hisOrderCount.value.status2)
      } : {}, {
        E: common_vendor.o(toOrderListPage2),
        F: common_assets._imports_1,
        G: hisOrderCount.value.status5 > 0
      }, hisOrderCount.value.status5 > 0 ? {
        H: common_vendor.t(hisOrderCount.value.status5)
      } : {}, {
        I: common_vendor.o(toOrderListPage2),
        J: common_assets._imports_5,
        K: hisOrderCount.value.status6 > 0
      }, hisOrderCount.value.status6 > 0 ? {
        L: common_vendor.t(hisOrderCount.value.status6)
      } : {}, {
        M: common_vendor.o(toOrderListPage2),
        N: common_assets._imports_3,
        O: hisOrderCount.value.status7 > 0
      }, hisOrderCount.value.status7 > 0 ? {
        P: common_vendor.t(hisOrderCount.value.status7)
      } : {}, {
        Q: common_vendor.o(toOrderListPage2),
        R: loginResult.value
      }, loginResult.value ? {
        S: common_assets._imports_6
      } : {}, {
        T: common_vendor.o(myProduct),
        U: loginResult.value
      }, loginResult.value ? {
        V: common_assets._imports_7
      } : {}, {
        W: common_vendor.o(myDelistedProduct),
        X: loginResult.value
      }, loginResult.value ? {
        Y: common_assets._imports_8
      } : {}, {
        Z: common_vendor.o(myCollection),
        aa: loginResult.value
      }, loginResult.value ? {
        ab: common_assets._imports_9
      } : {}, {
        ac: common_vendor.o(toAddressList),
        ad: loginResult.value
      }, loginResult.value ? {
        ae: common_assets._imports_10
      } : {}, {
        af: common_vendor.o(toWallet),
        ag: isAuthInfo.value
      }, isAuthInfo.value ? {
        ah: common_vendor.o(logout)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"], ["__file", "D:/HBuilderProjects/lease/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
