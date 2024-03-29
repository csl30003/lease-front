"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_product = require("../../api/product.js");
const api_collection = require("../../api/collection.js");
const api_comment = require("../../api/comment.js");
const utils_util = require("../../utils/util.js");
require("../../utils/http.js");
const _sfc_main = {
  __name: "product",
  setup(__props) {
    let prodId = 0;
    common_vendor.onLoad(async (options) => {
      prodId = options.prodid;
      await getProdInfo();
      await getComments();
      await getCollection();
    });
    const isCollection = common_vendor.ref(false);
    const getCollection = async () => {
      const res = await api_collection.isCollectionAPI(prodId);
      isCollection.value = res.data;
    };
    const addOrCannelCollection = async () => {
      await api_collection.collectionAPI({
        product_id: parseInt(prodId)
      });
      isCollection.value = !isCollection.value;
    };
    const name = common_vendor.ref("");
    const price = common_vendor.ref(0);
    const content = common_vendor.ref("");
    const mainImage = common_vendor.ref("");
    const prodNum = common_vendor.ref(1);
    const delivery = common_vendor.ref(0);
    const deliveryValue = common_vendor.ref("");
    const freight = common_vendor.ref(0);
    const fineness = common_vendor.ref(0);
    const finenessValue = common_vendor.ref("");
    const usedYears = common_vendor.ref(0);
    const status = common_vendor.ref(0);
    const categoryID = common_vendor.ref(0);
    const categoryName = common_vendor.ref("");
    const AddressID = common_vendor.ref(0);
    const addressProvince = common_vendor.ref("");
    const addressCity = common_vendor.ref("");
    const addressDistrict = common_vendor.ref("");
    const userID = common_vendor.ref(0);
    const userName = common_vendor.ref("");
    const userAvatar = common_vendor.ref("");
    const imageList = common_vendor.ref([]);
    const getProdInfo = async () => {
      const res = await api_product.getProductAPI(prodId);
      name.value = res.data.name;
      price.value = res.data.price;
      content.value = utils_util.util.formatHtml(res.data.detail);
      mainImage.value = res.data.main_image;
      prodNum.value = res.data.stock;
      delivery.value = res.data.delivery;
      freight.value = res.data.freight;
      fineness.value = res.data.fineness;
      usedYears.value = res.data.used_years;
      status.value = res.data.status;
      categoryID.value = res.data.category_id;
      categoryName.value = res.data.category_name;
      AddressID.value = res.data.address_id;
      addressProvince.value = res.data.address_province;
      addressCity.value = res.data.address_city;
      addressDistrict.value = res.data.address_district;
      userID.value = res.data.user_id;
      userName.value = res.data.user_name;
      userAvatar.value = res.data.user_avatar;
      imageList.value = res.data.image_list;
      if (fineness.value == 0) {
        finenessValue.value = "全新";
      } else if (fineness.value == 1) {
        finenessValue.value = "几乎全新";
      } else if (fineness.value == 2) {
        finenessValue.value = "轻微使用痕迹";
      } else {
        finenessValue.value = "明显使用痕迹";
      }
      if (delivery.value == 0) {
        deliveryValue.value = "邮寄";
      } else {
        deliveryValue.value = "自提";
      }
    };
    const toChat = async () => {
      if (!common_vendor.index.getStorageSync("loginResult")) {
        common_vendor.index.clearStorageSync();
        common_vendor.index.showModal({
          title: "提示",
          content: "请登录",
          showCancel: true,
          success(res) {
            if (res.confirm) {
              setTimeout(() => {
                common_vendor.index.navigateTo({
                  url: "/pages/login/login"
                });
              }, 1e3);
            }
          }
        });
        return;
      }
      const loginResult = common_vendor.index.getStorageSync("loginResult");
      if (parseInt(loginResult.id) === userID.value) {
        common_vendor.index.showToast({
          title: "不能和自己聊天",
          icon: "none"
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/chat/chatDetail?toId=" + userID.value
      });
    };
    const comments = common_vendor.ref([]);
    const getComments = async () => {
      const res = await api_comment.getTwoCommentAPI(prodId);
      if (res.data === null) {
        comments.value = [];
        return;
      }
      comments.value = res.data;
    };
    const goToAllComments = async () => {
      common_vendor.index.navigateTo({
        url: "/pages/comment/comment?prodid=" + prodId
      });
    };
    const goToCommentDetails = (commentId) => {
      common_vendor.index.navigateTo({
        url: "/pages/comment/commentDetail?commentId=" + commentId
      });
    };
    const toHomePage = () => {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    };
    const showSkuModal = common_vendor.ref(false);
    const quantity = common_vendor.ref(1);
    const days = common_vendor.ref(1);
    const showSku = () => {
      if (prodNum.value === 0) {
        common_vendor.index.showToast({
          title: "已缺货",
          icon: "none"
        });
        return;
      }
      showSkuModal.value = true;
    };
    const closeSkuModal = () => {
      showSkuModal.value = false;
    };
    const increaseQuantity = () => {
      if (quantity.value < prodNum.value) {
        quantity.value++;
      }
    };
    const decreaseQuantity = () => {
      if (quantity.value > 1) {
        quantity.value--;
      }
    };
    const increaseDays = () => {
      if (days.value < 30) {
        days.value++;
      }
    };
    const decreaseDays = () => {
      if (days.value > 1) {
        days.value--;
      }
    };
    const goToNextPage = () => {
      const loginResult = common_vendor.index.getStorageSync("loginResult");
      if (parseInt(loginResult.id) === userID.value) {
        common_vendor.index.showToast({
          title: "不能购买自己的商品",
          icon: "none"
        });
        return;
      }
      if (status.value === 2) {
        common_vendor.index.showToast({
          title: "商品已下架，无法购买",
          icon: "none"
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/product/productSelectAddress?productId=" + prodId + "&quantity=" + quantity.value + "&days=" + days.value
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: mainImage.value,
        b: common_vendor.t(name.value),
        c: !isCollection.value
      }, !isCollection.value ? {
        d: common_assets._imports_0$5
      } : {}, {
        e: isCollection.value
      }, isCollection.value ? {
        f: common_assets._imports_1$2
      } : {}, {
        g: common_vendor.o(addOrCannelCollection),
        h: common_vendor.t(finenessValue.value),
        i: common_vendor.t(usedYears.value),
        j: common_vendor.t(addressProvince.value),
        k: common_vendor.t(addressCity.value),
        l: common_vendor.t(addressDistrict.value),
        m: common_vendor.t(price.value),
        n: common_vendor.t(prodNum.value),
        o: common_vendor.t(deliveryValue.value),
        p: content.value,
        q: userAvatar.value,
        r: common_vendor.o(toChat),
        s: common_vendor.t(userName.value),
        t: common_vendor.o(toChat),
        v: common_vendor.o(toChat),
        w: comments.value.length === 0
      }, comments.value.length === 0 ? {
        x: common_vendor.o(goToAllComments)
      } : {
        y: common_vendor.o(goToAllComments),
        z: common_vendor.f(comments.value, (comment, k0, i0) => {
          return {
            a: comment.avatar,
            b: common_vendor.t(comment.name),
            c: common_vendor.t(comment.content),
            d: common_vendor.t(comment.created_at),
            e: common_vendor.o(($event) => goToCommentDetails(comment.id), comment.id),
            f: comment.id
          };
        })
      }, {
        A: common_vendor.f(imageList.value, (image, index, i0) => {
          return {
            a: image.url,
            b: index
          };
        }),
        B: common_assets._imports_2$1,
        C: common_vendor.o(toHomePage),
        D: common_vendor.o(showSku),
        E: showSkuModal.value
      }, showSkuModal.value ? {
        F: common_assets._imports_3$1,
        G: common_vendor.o(decreaseQuantity),
        H: common_vendor.t(quantity.value),
        I: common_assets._imports_4$1,
        J: common_vendor.o(increaseQuantity),
        K: common_assets._imports_3$1,
        L: common_vendor.o(decreaseDays),
        M: common_vendor.t(days.value),
        N: common_assets._imports_4$1,
        O: common_vendor.o(increaseDays),
        P: common_vendor.o(closeSkuModal),
        Q: common_vendor.o(goToNextPage)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-946a9793"], ["__file", "D:/HBuilderProjects/lease/pages/product/product.vue"]]);
wx.createPage(MiniProgramPage);
