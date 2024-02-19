"use strict";
const common_vendor = require("../../common/vendor.js");
const api_product = require("../../api/product.js");
require("../../utils/http.js");
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
    const fineness = common_vendor.ref("");
    const usedYears = common_vendor.ref(0);
    const deliveryMethods = common_vendor.ref(["邮寄", "自提"]);
    const finenesss = common_vendor.ref(["全新", "几乎全新", "轻微使用痕迹", "明显使用痕迹"]);
    const isDeliveryMethodSelected = common_vendor.ref(false);
    const isFinenessSelected = common_vendor.ref(false);
    const showUpload = common_vendor.ref(true);
    const files = common_vendor.ref([]);
    const gallery = common_vendor.ref(-1);
    common_vendor.watch(files, (newFiles) => {
      if (newFiles.length > 5) {
        showUpload.value = false;
      } else {
        showUpload.value = true;
      }
    });
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
    const onFinenessChange = (e) => {
      fineness.value = e.detail.value;
      isFinenessSelected.value = true;
    };
    const onUsedYearsInput = (e) => {
      usedYears.value = Number(e.detail.value);
    };
    const submitForm = async () => {
      const nameParam = name.value;
      const detailsParam = details.value;
      const priceParam = price.value;
      const quantityParam = quantity.value;
      const deliveryMethodParam = deliveryMethod.value;
      const finenessParam = fineness.value;
      const usedYearsParam = usedYears.value;
      const tempFilePaths = files.value;
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
      if (!finenessParam) {
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
      if (tempFilePaths.length === 0) {
        common_vendor.index.showToast({
          title: "请上传图片",
          icon: "none"
        });
        return;
      }
      let res = await api_product.addProductAPI({
        category_id: parseInt(categoryId.value),
        address_id: parseInt(addressId.value),
        name: name.value,
        detail: details.value,
        price: price.value,
        stock: quantity.value,
        delivery: parseInt(deliveryMethod.value),
        fineness: parseInt(fineness.value),
        used_years: usedYears.value,
        freight: 0,
        status: 0
        // 0表示未发布，等图片都上传完再改为1
      });
      if (res.code === 200) {
        const productId = res.data;
        let header = {
          "Content-Type": "application/json"
        };
        if (common_vendor.index.getStorageSync("token")) {
          header["Cookie"] = "token=" + common_vendor.index.getStorageSync("token");
        }
        const tempFilePaths2 = files.value;
        common_vendor.index.uploadFile({
          url: "http://localhost:8080/index/product/mainImage/" + productId,
          filePath: tempFilePaths2[0],
          name: "productMainImage",
          method: "POST",
          header,
          formData: {},
          success: async (res2) => {
            const resTemp = JSON.parse(res2.data);
            if (resTemp.code == 200) {
              if (tempFilePaths2.length > 1) {
                for (let i = 1; i < tempFilePaths2.length; i++) {
                  common_vendor.index.uploadFile({
                    url: "http://localhost:8080/index/product/image/" + productId,
                    filePath: tempFilePaths2[i],
                    name: "productImage",
                    method: "POST",
                    header,
                    formData: {},
                    success: async (res3) => {
                      const resTemp2 = JSON.parse(res3.data);
                      console.log(resTemp2.code);
                      if (resTemp2.code == 200) {
                        await api_product.updateProductStatusAPI({
                          id: productId,
                          status: 1
                        });
                        common_vendor.index.showToast({
                          title: "发布成功",
                          icon: "success",
                          duration: 1e3
                        });
                        setTimeout(() => {
                          common_vendor.wx$1.switchTab({
                            url: "/pages/user/user"
                          });
                        }, 500);
                      } else {
                        common_vendor.index.showToast({
                          title: "发布失败",
                          icon: "none",
                          duration: 1e3
                        });
                      }
                    }
                  });
                }
              } else {
                await api_product.updateProductStatusAPI({
                  id: productId,
                  status: 1
                });
                common_vendor.index.showToast({
                  title: "发布成功",
                  icon: "success",
                  duration: 1e3
                });
                setTimeout(() => {
                  common_vendor.wx$1.switchTab({
                    url: "/pages/user/user"
                  });
                }, 500);
              }
            } else {
              console.log("主图上传失败");
            }
          }
        });
      } else {
        common_vendor.index.showToast({
          title: "发布失败",
          icon: "none",
          duration: 1e3
        });
      }
    };
    const chooseImage = () => {
      common_vendor.index.chooseImage({
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          files.value = [...files.value, res.tempFilePaths[0]];
        }
      });
    };
    const previewImage = (index) => {
      gallery.value = index;
    };
    const deleteImg = (index) => {
      files.value.splice(index, 1);
      if (gallery.value === index) {
        gallery.value = -1;
      }
    };
    const close = () => {
      gallery.value = -1;
    };
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
        i: !isFinenessSelected.value
      }, !isFinenessSelected.value ? {} : {}, {
        j: common_vendor.t(finenesss.value[fineness.value]),
        k: finenesss.value,
        l: common_vendor.o(onFinenessChange),
        m: common_vendor.o(onUsedYearsInput),
        n: common_vendor.t(files.value.length),
        o: common_vendor.f(files.value, (item, index, i0) => {
          return {
            a: item,
            b: index,
            c: common_vendor.o(($event) => previewImage(index), index)
          };
        }),
        p: gallery.value !== -1
      }, gallery.value !== -1 ? {
        q: common_vendor.t(gallery.value + 1),
        r: common_vendor.t(files.value.length),
        s: files.value[gallery.value],
        t: common_vendor.o(($event) => deleteImg(gallery.value)),
        v: common_vendor.o(close)
      } : {}, {
        w: showUpload.value
      }, showUpload.value ? {
        x: common_vendor.o(chooseImage)
      } : {}, {
        y: common_vendor.o(submitForm)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b82f9fe9"], ["__file", "D:/HBuilderProjects/lease/pages/release/fillInformation.vue"]]);
wx.createPage(MiniProgramPage);
