"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "chat",
  setup(__props) {
    const showUpload = common_vendor.ref(true);
    const files = common_vendor.ref([]);
    const gallery = common_vendor.ref(-1);
    common_vendor.watch(files, (newFiles) => {
      if (newFiles.length > 4) {
        showUpload.value = false;
      } else {
        showUpload.value = true;
      }
    });
    const uploadImages = () => {
      let header = {
        "Content-Type": "application/json"
      };
      if (common_vendor.index.getStorageSync("token")) {
        header["Cookie"] = "token=" + common_vendor.index.getStorageSync("token");
      }
      const tempFilePaths = files.value;
      for (let i = 0; i < tempFilePaths.length; i++) {
        const filePath = tempFilePaths[i];
        common_vendor.index.uploadFile({
          url: "http://localhost:8080/index/product/image",
          filePath,
          name: "productImage",
          method: "POST",
          header,
          formData: {},
          success: (res) => {
            const resTemp = JSON.parse(res.data);
            console.log(resTemp.code);
            if (resTemp.code == 200) {
              console.log("一个上传成功");
            } else {
              switch (resTemp.code) {
                case 401:
                  common_vendor.index.clearStorageSync();
                  common_vendor.index.showModal({
                    title: "提示",
                    content: "请登录",
                    showCancel: false,
                    success(res2) {
                      setTimeout(() => {
                        common_vendor.index.navigateTo({
                          url: "/pages/login/login"
                        });
                      }, 1e3);
                    }
                  });
                  break;
                case 404:
                  common_vendor.index.showToast({
                    title: "请求地址不存在...",
                    icon: "none",
                    duration: 1e3
                  });
                  break;
                default:
                  common_vendor.index.showModal({
                    title: "请重试...",
                    showCancel: false
                  });
                  break;
              }
            }
          }
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
      console.log(files.value);
    };
    const close = () => {
      gallery.value = -1;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(uploadImages),
        b: common_vendor.t(files.value.length),
        c: common_vendor.f(files.value, (item, index, i0) => {
          return {
            a: item,
            b: index,
            c: common_vendor.o(($event) => previewImage(index), index)
          };
        }),
        d: gallery.value !== -1
      }, gallery.value !== -1 ? {
        e: common_vendor.t(gallery.value + 1),
        f: common_vendor.t(files.value.length),
        g: files.value[gallery.value],
        h: common_vendor.o(($event) => deleteImg(gallery.value)),
        i: common_vendor.o(close)
      } : {}, {
        j: showUpload.value
      }, showUpload.value ? {
        k: common_vendor.o(chooseImage)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0a633310"], ["__file", "D:/HBuilderProjects/lease/pages/chat/chat.vue"]]);
wx.createPage(MiniProgramPage);
