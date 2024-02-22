"use strict";
const common_vendor = require("../../common/vendor.js");
const api_product = require("../../api/product.js");
const api_address = require("../../api/address.js");
const api_order = require("../../api/order.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "order",
  setup(__props) {
    const productId = common_vendor.ref(0);
    const productName = common_vendor.ref("");
    const productPrice = common_vendor.ref(0);
    const productStock = common_vendor.ref(0);
    const productImage = common_vendor.ref("");
    const productQuantity = common_vendor.ref(0);
    const useDays = common_vendor.ref(0);
    const delivery = common_vendor.ref(0);
    const deliveryValue = common_vendor.ref("");
    const actualPayment = common_vendor.ref(0);
    const paymentType = common_vendor.ref(0);
    const paymentTypeValue = common_vendor.ref("支付宝支付");
    const userId = common_vendor.ref(0);
    const hisId = common_vendor.ref(0);
    const myAddressId = common_vendor.ref(0);
    const myAddressName = common_vendor.ref("");
    const myAddressPhone = common_vendor.ref("");
    const myAddressProvince = common_vendor.ref("");
    const myAddressCity = common_vendor.ref("");
    const myAddressDistrict = common_vendor.ref("");
    const myAddressDetail = common_vendor.ref("");
    const hisAddressId = common_vendor.ref(0);
    const hisAddressName = common_vendor.ref("");
    const hisAddressPhone = common_vendor.ref("");
    const hisAddressProvince = common_vendor.ref("");
    const hisAddressCity = common_vendor.ref("");
    const hisAddressDistrict = common_vendor.ref("");
    const hisAddressDetail = common_vendor.ref("");
    common_vendor.onLoad(async (options) => {
      productId.value = parseInt(options.productId);
      productQuantity.value = parseInt(options.quantity);
      useDays.value = parseInt(options.days);
      if (common_vendor.index.getStorageSync("loginResult")) {
        userId.value = common_vendor.index.getStorageSync("loginResult").id;
      } else {
        common_vendor.index.clearStorageSync();
        common_vendor.index.showModal({
          title: "提示",
          content: "请登录",
          showCancel: false,
          success(res3) {
            setTimeout(() => {
              common_vendor.index.navigateTo({
                url: "/pages/login/login"
              });
            }, 1e3);
          },
          fail: (fail) => {
            setTimeout(() => {
              common_vendor.index.navigateTo({
                url: "/pages/index/index"
              });
            }, 1e3);
          }
        });
      }
      myAddressId.value = parseInt(options.addressId);
      const res = await api_product.getProductAPI(productId.value);
      productName.value = res.data.name;
      productPrice.value = res.data.price;
      productStock.value = res.data.stock;
      productImage.value = res.data.main_image;
      delivery.value = res.data.delivery;
      deliveryValue.value = res.data.delivery === 0 ? "邮寄" : "自提";
      hisId.value = res.data.user_id;
      hisAddressId.value = res.data.address_id;
      hisAddressName.value = res.data.address_name;
      hisAddressPhone.value = res.data.address_phone;
      hisAddressProvince.value = res.data.address_province;
      hisAddressCity.value = res.data.address_city;
      hisAddressDistrict.value = res.data.address_district;
      hisAddressDetail.value = res.data.address_detail;
      const res2 = await api_address.getAddressByIdAPI(myAddressId.value);
      myAddressName.value = res2.data.name;
      myAddressPhone.value = res2.data.phone;
      myAddressProvince.value = res2.data.province;
      myAddressCity.value = res2.data.city;
      myAddressDistrict.value = res2.data.district;
      myAddressDetail.value = res2.data.detail;
      actualPayment.value = productPrice.value * productQuantity.value * useDays.value;
    });
    const toProdPage = (e) => {
      const prodid = e.currentTarget.dataset.prodid;
      common_vendor.index.navigateTo({
        url: "/pages/product/product?prodid=" + prodid
      });
    };
    const toPay = async () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定下单吗？",
        showCancel: true,
        success: async (res) => {
          if (res.confirm) {
            if (productStock.value < productQuantity.value) {
              common_vendor.index.showToast({
                title: "库存不足",
                icon: "none"
              });
              return;
            }
            const r = await api_order.addOrderAPI({
              status: 1,
              product_price: productPrice.value,
              use_days: useDays.value,
              product_quantity: productQuantity.value,
              actual_payment: actualPayment.value,
              payment_type: paymentType.value,
              user_id: userId.value,
              his_id: hisId.value,
              my_address_id: myAddressId.value,
              his_address_id: hisAddressId.value,
              product_id: productId.value
            });
            if (r.data) {
              common_vendor.index.showToast({
                title: "下单成功",
                icon: "none"
              });
              setTimeout(() => {
                common_vendor.index.reLaunch({
                  url: "/pages/order/pendingPaymentOrder?orderId=" + r.data
                });
              }, 1e3);
            }
          }
        }
      });
    };
    common_vendor.ref("");
    common_vendor.ref([]);
    common_vendor.ref("");
    common_vendor.ref("");
    common_vendor.ref(0);
    common_vendor.ref(0);
    common_vendor.ref(null);
    common_vendor.ref("");
    common_vendor.ref("");
    common_vendor.ref(0);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(myAddressName.value),
        b: common_vendor.t(myAddressPhone.value),
        c: common_vendor.t(myAddressProvince.value),
        d: common_vendor.t(myAddressCity.value),
        e: common_vendor.t(myAddressDistrict.value),
        f: common_vendor.t(myAddressDetail.value),
        g: common_vendor.t(hisAddressName.value),
        h: common_vendor.t(hisAddressPhone.value),
        i: common_vendor.t(hisAddressProvince.value),
        j: common_vendor.t(hisAddressCity.value),
        k: common_vendor.t(hisAddressDistrict.value),
        l: common_vendor.t(hisAddressDetail.value),
        m: productImage.value,
        n: common_vendor.t(productName.value),
        o: common_vendor.t(productQuantity.value),
        p: common_vendor.t(useDays.value),
        q: common_vendor.t(productPrice.value),
        r: productId.value,
        s: common_vendor.o(toProdPage),
        t: common_vendor.t(paymentTypeValue.value),
        v: common_vendor.t(deliveryValue.value),
        w: common_vendor.t(actualPayment.value),
        x: common_vendor.t(actualPayment.value),
        y: common_vendor.o(toPay)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-93207a4f"], ["__file", "D:/HBuilderProjects/lease/pages/order/order.vue"]]);
wx.createPage(MiniProgramPage);
