"use strict";
const common_vendor = require("../../common/vendor.js");
const api_order = require("../../api/order.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "orderList",
  setup(__props) {
    const sts = common_vendor.ref(0);
    common_vendor.onLoad((options) => {
      if (options.sts) {
        sts.value = options.sts;
        loadOrderData(options.sts, 1);
      } else {
        loadOrderData(10, 1);
      }
    });
    const current = common_vendor.ref(1);
    const pages = common_vendor.ref(0);
    common_vendor.onReachBottom(() => {
      if (current.value < pages.value) {
        current.value = current.value + 1;
        loadOrderData(sts.value, current.value);
      }
    });
    const orderList = common_vendor.ref([]);
    const loadOrderData = async (sts2, currentParam) => {
      const res = await api_order.getMyOrderAPI({
        current: currentParam,
        size: 10,
        status: sts2
      });
      if (current.value === 1) {
        orderList.value = res.data.records;
        if (!orderList.value) {
          orderList.value = [];
        }
      } else {
        orderList.value = orderList.value.concat(res.data.records);
      }
      pages.value = res.data.pages;
    };
    const onStsTap = (e) => {
      sts.value = e.currentTarget.dataset.sts;
      current.value = 1;
      pages.value = 0;
      loadOrderData(sts.value, current.value);
    };
    const onCancelOrder = (e) => {
      common_vendor.index.navigateTo({
        url: "/pages/order/pendingPaymentOrder?orderId=" + e.currentTarget.dataset.id
      });
    };
    const normalPay = (e) => {
      common_vendor.index.navigateTo({
        url: "/pages/order/pendingPaymentOrder?orderId=" + e.currentTarget.dataset.id
      });
    };
    const toOrderDetailPage = (e) => {
      common_vendor.index.navigateTo({
        url: "/pages/order/orderDetail?orderId=" + e.currentTarget.dataset.id
      });
    };
    const onConfirmReceive = async (e) => {
      common_vendor.index.showModal({
        title: "",
        content: "我已收到货？",
        confirmColor: "#eb2444",
        async success(res) {
          if (res.confirm) {
            await api_order.iReceiveOrderAPI(e.currentTarget.dataset.id);
            loadOrderData(sts.value, 1);
          }
        }
      });
    };
    const toReturn = async (e) => {
      common_vendor.index.showModal({
        title: "",
        content: "我已归还商品？",
        confirmColor: "#eb2444",
        async success(res) {
          if (res.confirm) {
            await api_order.iReturnOrderAPI(e.currentTarget.dataset.id);
            loadOrderData(sts.value, 1);
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.n(sts.value == 10 ? "on" : ""),
        b: common_vendor.o(onStsTap),
        c: common_vendor.n(sts.value == 0 ? "on" : ""),
        d: common_vendor.o(onStsTap),
        e: common_vendor.n(sts.value == 1 ? "on" : ""),
        f: common_vendor.o(onStsTap),
        g: common_vendor.n(sts.value == 2 ? "on" : ""),
        h: common_vendor.o(onStsTap),
        i: common_vendor.n(sts.value == 3 ? "on" : ""),
        j: common_vendor.o(onStsTap),
        k: common_vendor.n(sts.value == 4 ? "on" : ""),
        l: common_vendor.o(onStsTap),
        m: common_vendor.n(sts.value == 5 ? "on" : ""),
        n: common_vendor.o(onStsTap),
        o: common_vendor.n(sts.value == 6 ? "on" : ""),
        p: common_vendor.o(onStsTap),
        q: common_vendor.n(sts.value == 7 ? "on" : ""),
        r: common_vendor.o(onStsTap),
        s: common_vendor.n(sts.value == 8 ? "on" : ""),
        t: common_vendor.o(onStsTap),
        v: orderList.value.length == 0
      }, orderList.value.length == 0 ? {} : {}, {
        w: common_vendor.f(orderList.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.identifier),
            b: common_vendor.t(item.status == 0 ? "已取消" : item.status == 1 ? "待支付" : item.status == 2 ? "待对方发货" : item.status == 3 ? "待我方收货" : item.status == 4 ? "待我方归还" : item.status == 5 ? "待对方收货" : item.status == 6 ? "待对方检查" : item.status == 7 ? "待共同解决" : "已完成"),
            c: common_vendor.n("order-sts  " + (item.status == 1 || item.status == 3 || item.status == 4 || item.status == 7 ? "red" : "") + "  " + (item.status == 8 ? "gray" : "")),
            d: item.product_image,
            e: common_vendor.t(item.product_name),
            f: common_vendor.t(item.product_price),
            g: common_vendor.t(item.product_quantity),
            h: common_vendor.t(item.use_days),
            i: item.id,
            j: common_vendor.o(toOrderDetailPage, index),
            k: common_vendor.t(item.actual_payment),
            l: item.status == 1
          }, item.status == 1 ? {
            m: item.id,
            n: common_vendor.o(onCancelOrder, index)
          } : {}, {
            o: item.status == 1
          }, item.status == 1 ? {
            p: item.id,
            q: common_vendor.o(normalPay, index)
          } : {}, {
            r: item.status == 3
          }, item.status == 3 ? {
            s: item.id,
            t: common_vendor.o(onConfirmReceive, index)
          } : {}, {
            v: item.status == 4
          }, item.status == 4 ? {
            w: item.id,
            x: common_vendor.o(toReturn, index)
          } : {}, {
            y: item.status == 7
          }, item.status == 7 ? {
            z: item.id,
            A: common_vendor.o((...args) => _ctx.toComplete && _ctx.toComplete(...args), index)
          } : {}, {
            B: index
          });
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f171fe20"], ["__file", "D:/HBuilderProjects/lease/pages/order/orderList.vue"]]);
wx.createPage(MiniProgramPage);
