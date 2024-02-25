"use strict";
const common_vendor = require("../../common/vendor.js");
const api_order = require("../../api/order.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "orderDetail",
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
    return (_ctx, _cache) => {
      return {
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
        z: common_vendor.t(order.value.actual_payment)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6d7bb016"], ["__file", "D:/HBuilderProjects/lease/pages/order/orderDetail.vue"]]);
wx.createPage(MiniProgramPage);
