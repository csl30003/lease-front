"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  Upload();
}
const Upload = () => "../../components/Upload/Upload.js";
const _sfc_main = {
  __name: "editUserAvatar",
  setup(__props) {
    const upLoad = common_vendor.ref(null);
    function Submit() {
      upLoad.value.UploadImg().then((res) => {
      });
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr(upLoad, "3f460e16-0", {
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3f460e16"], ["__file", "D:/HBuilderProjects/lease/pages/user/editUserAvatar.vue"]]);
wx.createPage(MiniProgramPage);
