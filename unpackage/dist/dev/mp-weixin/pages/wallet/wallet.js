"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
const api_payment = require("../../api/payment.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "wallet",
  setup(__props) {
    common_vendor.onLoad(async () => {
      loadData();
    });
    const balance = common_vendor.ref(0);
    const paymentList = common_vendor.ref([]);
    const loadData = async () => {
      const res = await api_user.getUserInfoAPI();
      balance.value = res.data.wallet;
      const res2 = await api_payment.getPaymentAPI();
      paymentList.value = res2.data;
    };
    const withdraw = async () => {
      const res = await api_payment.withdrawAPI();
      common_vendor.index.showToast({
        title: res.message,
        icon: "none"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(balance.value),
        b: common_vendor.o(withdraw),
        c: common_vendor.f(paymentList.value, (payment, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(payment.money),
            b: common_vendor.t(payment.type === 1 ? "收入" : "提现"),
            c: common_vendor.n(payment.type === 1 ? "income" : "expense"),
            d: payment.order_id !== 0
          }, payment.order_id !== 0 ? {
            e: common_vendor.t(payment.order_identifier)
          } : {}, {
            f: common_vendor.t(payment.created_at),
            g: payment.id
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4c380209"], ["__file", "D:/HBuilderProjects/lease/pages/wallet/wallet.vue"]]);
wx.createPage(MiniProgramPage);
