"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  Upload();
}
const Upload = () => "../../components/Upload/Upload.js";
const _sfc_main = {
  __name: "chat",
  setup(__props) {
    const upLoad = common_vendor.ref(null);
    function Submit() {
      upLoad.value.UploadImg().then((res) => {
        console.log(res);
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr(upLoad, "8bd63070-0", {
          "k": "upLoad"
        }),
        b: common_vendor.p({
          count: 1
        }),
        c: common_vendor.o(Submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/lease/pages/chat/chat.vue"]]);
wx.createPage(MiniProgramPage);
