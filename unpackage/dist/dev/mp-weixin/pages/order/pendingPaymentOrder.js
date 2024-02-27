"use strict";
const common_vendor = require("../../common/vendor.js");
const api_order = require("../../api/order.js");
const api_payment = require("../../api/payment.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "pendingPaymentOrder",
  setup(__props) {
    const orderId = common_vendor.ref(0);
    const order = common_vendor.ref({});
    const paymentTypeValue = common_vendor.ref("");
    const deliveryValue = common_vendor.ref("");
    common_vendor.onLoad(async (options) => {
      orderId.value = parseInt(options.orderId);
    });
    common_vendor.onShow(async () => {
      const res = await api_order.getOrderAPI(orderId.value);
      order.value = res.data;
      paymentTypeValue.value = res.data.payment_type === 0 ? "支付宝支付" : "微信支付";
      deliveryValue.value = res.data.delivery === 0 ? "邮寄" : "自提";
    });
    const toProdPage = (e) => {
      const prodid = e.currentTarget.dataset.prodid;
      common_vendor.index.navigateTo({
        url: "/pages/product/product?prodid=" + prodid
      });
    };
    const toCancel = async () => {
      const res = await common_vendor.index.showModal({
        title: "取消订单",
        content: "确定取消订单吗？",
        showCancel: true,
        cancelText: "取消",
        confirmText: "确定"
      });
      if (res.confirm) {
        const res2 = await api_order.cancelOrderAPI(orderId.value);
        common_vendor.index.showToast({
          title: res2.message,
          icon: "none",
          duration: 2e3
        });
        setTimeout(() => {
          common_vendor.index.reLaunch({
            url: "/pages/user/user"
          });
        }, 1e3);
      }
    };
    const toPay = async () => {
      const res = await api_payment.alipayAPI(orderId.value);
      let url = res.data;
      common_vendor.index.navigateTo({
        url: "/pages/webView/webView?url=" + encodeURIComponent(JSON.stringify(url))
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(order.value.my_address_name),
        b: common_vendor.t(order.value.my_address_phone),
        c: common_vendor.t(order.value.my_address_province),
        d: common_vendor.t(order.value.my_address_city),
        e: common_vendor.t(order.value.my_address_district),
        f: common_vendor.t(order.value.my_address_detail),
        g: common_vendor.t(order.value.his_address_name),
        h: common_vendor.t(order.value.his_address_phone),
        i: common_vendor.t(order.value.his_address_province),
        j: common_vendor.t(order.value.his_address_city),
        k: common_vendor.t(order.value.his_address_district),
        l: common_vendor.t(order.value.his_address_detail),
        m: order.value.product_image,
        n: common_vendor.t(order.value.product_name),
        o: common_vendor.t(order.value.product_quantity),
        p: common_vendor.t(order.value.use_days),
        q: common_vendor.t(order.value.product_price),
        r: order.value.product_id,
        s: common_vendor.o(toProdPage),
        t: common_vendor.t(order.value.identifier),
        v: common_vendor.t(order.value.created_at),
        w: common_vendor.t(paymentTypeValue.value),
        x: common_vendor.t(deliveryValue.value),
        y: common_vendor.t(order.value.actual_payment),
        z: common_vendor.t(order.value.actual_payment),
        A: order.value.status === 1
      }, order.value.status === 1 ? {
        B: common_vendor.o(toCancel),
        C: common_vendor.o(toPay)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-df4e43d9"], ["__file", "D:/HBuilderProjects/lease/pages/order/pendingPaymentOrder.vue"]]);
wx.createPage(MiniProgramPage);
