"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "Upload",
  props: ["count"],
  setup(__props, { expose }) {
    const props = __props;
    const tempFilePaths = common_vendor.ref("/static/images/icon/add.png");
    const temp = common_vendor.ref(false);
    function chooseImage() {
      common_vendor.index.chooseImage({
        count: props.count,
        sourceType: ["album"],
        success: function(res) {
          tempFilePaths.value = res.tempFilePaths[0];
          temp.value = true;
        }
      });
    }
    function UploadImg() {
      return new Promise(function(resolve, reject) {
        if (!temp.value)
          ;
        else {
          let header = {
            "Content-Type": "application/json"
          };
          if (common_vendor.index.getStorageSync("token")) {
            header["Cookie"] = "token=" + common_vendor.index.getStorageSync("token");
          }
          common_vendor.index.uploadFile({
            url: `http://localhost:8080/index/upload`,
            //地址
            method: "POST",
            filePath: tempFilePaths.value,
            name: "avatar",
            header,
            formData: {}
          }).then((res) => {
            const path = JSON.parse(res.data).data;
            let loginResult = common_vendor.index.getStorageSync("loginResult");
            loginResult.avatar = path;
            common_vendor.index.setStorageSync("loginResult", loginResult);
            resolve(path);
          }).catch((err) => {
            reject(err);
          });
        }
      });
    }
    expose({
      UploadImg
    });
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: tempFilePaths.value,
        b: common_vendor.o(chooseImage)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-727cfd90"], ["__file", "D:/HBuilderProjects/lease/components/Upload/Upload.vue"]]);
wx.createComponent(Component);
