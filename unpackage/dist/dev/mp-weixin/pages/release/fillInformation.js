"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "fillInformation",
  setup(__props) {
    const categoryId = common_vendor.ref("");
    const addressId = common_vendor.ref("");
    const name = common_vendor.ref("");
    const details = common_vendor.ref("");
    const price = common_vendor.ref(0);
    const quantity = common_vendor.ref(0);
    const deliveryMethod = common_vendor.ref("");
    const condition = common_vendor.ref("");
    const usedYears = common_vendor.ref(0);
    const deliveryMethods = common_vendor.ref(["邮寄", "自提"]);
    const conditions = common_vendor.ref(["全新", "几乎全新", "轻微使用痕迹", "明显使用痕迹"]);
    const isDeliveryMethodSelected = common_vendor.ref(false);
    const isConditionSelected = common_vendor.ref(false);
    common_vendor.onLoad(async (options) => {
      categoryId.value = options.categoryId;
      addressId.value = options.addressId;
    });
    const onNameInput = (e) => {
      name.value = e.detail.value;
    };
    const onDetailsInput = (e) => {
      details.value = e.detail.value;
    };
    const onPriceInput = (e) => {
      price.value = Number(e.detail.value);
    };
    const onQuantityInput = (e) => {
      quantity.value = Number(e.detail.value);
    };
    const onDeliveryMethodChange = (e) => {
      deliveryMethod.value = e.detail.value;
      isDeliveryMethodSelected.value = true;
    };
    const onConditionChange = (e) => {
      condition.value = e.detail.value;
      isConditionSelected.value = true;
    };
    const onUsedYearsInput = (e) => {
      usedYears.value = Number(e.detail.value);
    };
    function submitForm() {
      console.log("categoryId:", categoryId.value);
      console.log("addressId:", addressId.value);
      console.log("name:", name.value);
      console.log("details:", details.value);
      console.log("price:", price.value);
      console.log("quantity:", quantity.value);
      console.log("deliveryMethod:", deliveryMethod.value);
      console.log("condition:", condition.value);
      console.log("usedYears:", usedYears.value);
      const nameParam = name.value;
      const detailsParam = details.value;
      const priceParam = price.value;
      const quantityParam = quantity.value;
      const deliveryMethodParam = deliveryMethod.value;
      const conditionParam = condition.value;
      const usedYearsParam = usedYears.value;
      if (!nameParam.trim()) {
        name.value = "";
        common_vendor.index.showToast({
          title: "请输入商品名称",
          icon: "none"
        });
        return;
      }
      if (!detailsParam.trim()) {
        details.value = "";
        common_vendor.index.showToast({
          title: "请输入商品详情",
          icon: "none"
        });
        return;
      }
      if (!priceParam) {
        price.value = 0;
        common_vendor.index.showToast({
          title: "请输入商品价格",
          icon: "none"
        });
        return;
      }
      if (!quantityParam) {
        quantity.value = 0;
        common_vendor.index.showToast({
          title: "请输入商品数量",
          icon: "none"
        });
        return;
      }
      if (!deliveryMethodParam) {
        common_vendor.index.showToast({
          title: "请选择配送方式",
          icon: "none"
        });
        return;
      }
      if (!conditionParam) {
        common_vendor.index.showToast({
          title: "请选择成色",
          icon: "none"
        });
        return;
      }
      if (!usedYearsParam) {
        usedYears.value = 0;
        common_vendor.index.showToast({
          title: "请输入已用年限",
          icon: "none"
        });
        return;
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(onNameInput),
        b: common_vendor.o(onDetailsInput),
        c: common_vendor.o(onPriceInput),
        d: common_vendor.o(onQuantityInput),
        e: !isDeliveryMethodSelected.value
      }, !isDeliveryMethodSelected.value ? {} : {}, {
        f: common_vendor.t(deliveryMethods.value[deliveryMethod.value]),
        g: deliveryMethods.value,
        h: common_vendor.o(onDeliveryMethodChange),
        i: !isConditionSelected.value
      }, !isConditionSelected.value ? {} : {}, {
        j: common_vendor.t(conditions.value[condition.value]),
        k: conditions.value,
        l: common_vendor.o(onConditionChange),
        m: common_vendor.o(onUsedYearsInput),
        n: common_vendor.o(submitForm)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b82f9fe9"], ["__file", "D:/HBuilderProjects/lease/pages/release/fillInformation.vue"]]);
wx.createPage(MiniProgramPage);
